import React, { useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../utils/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

import './modal.css';

export const NoteForm = ({ createNewNote, handleModal, isOpen }) => {

  const initialStateValues = {
    title: '',
    content: '',
    uid: '',
    date: ''
  }

  const [newNote, setNewNote] = useState(initialStateValues);
  const [user, setUser] = useState('');

  // PROBLEMA 1 CORREGIDO: onAuthStateChanged dentro de useEffect
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser === null) {
        setUser('')
      } else {
        setUser(currentUser.uid)
      }
    });

    // Cleanup function para evitar memory leaks
    return () => unsubscribe();
  }, []);

  // PROBLEMA 2 CORREGIDO: useCallback con dependencias correctas
  const onChangeHandler = useCallback(
    ({ target: { name, value } }) => {
      setNewNote(state =>
        ({ ...state, [name]: value, uid: user, date: new Date() })
      );
    }, [user] // user debe estar en las dependencias
  );

  // PROBLEMA 3 CORREGIDO: handleSubmit mejorado
  const handleSubmit = () => {
    createNewNote.createNewNote(newNote)
    setNewNote({ ...initialStateValues })
  }

  // PROBLEMA 5 CORREGIDO: useEffect con dependencia correcta
  useEffect(() => {
    if (!createNewNote.currentId || createNewNote.currentId === '') {
      setNewNote({
        title: '',
        content: '',
        uid: user, // Mantener el uid del usuario actual
        date: ''
      });
    } else {
      getNoteById(createNewNote.currentId);
    }
  }, [createNewNote.currentId, user]); // Agregar user como dependencia

  // PROBLEMA 6 CORREGIDO: Manejo de errores en getNoteById
  const getNoteById = async (id) => {
    try {
      const noteRef = await getDoc(doc(db, "notes", id));
      if (noteRef.exists()) {
        setNewNote({ ...noteRef.data() });
      } else {
        console.error('La nota no existe');
        setNewNote({ ...initialStateValues });
      }
    } catch (error) {
      console.error('Error al obtener la nota:', error);
      setNewNote({ ...initialStateValues });
    }
  }

  const handleClose = () => {
    setNewNote({ ...initialStateValues, uid: user }); // Mantener uid al cerrar
  }

  // PROBLEMA 7 CORREGIDO: Prevenir envío del formulario
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    handleSubmit();
  }

  // Función para cerrar modal al hacer clic SOLO en el backdrop
  const handleBackdropClick = (e) => {
    // Solo cerrar si el clic fue en el contenedor, no en el modal
    if (e.target.classList.contains('create-note-container') ||
      e.target.classList.contains('modal')) {
      handleClose();
      handleModal();
    }
  };

  return (
    <div
      className={`create-note-container ${isOpen ? 'modal-open' : ''}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isOpen}
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={handleBackdropClick}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                {createNewNote.currentId ? 'Editar nota' : 'Nueva nota'}
              </h2>
            </div>
            <div className="modal-body">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={onChangeHandler}
                    value={newNote.title}
                    name="title"
                    placeholder='Título'
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    id="message-text"
                    onChange={onChangeHandler}
                    value={newNote.content}
                    name="content"
                    placeholder='Contenido...'
                    rows="4"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-opacity"
                data-bs-dismiss="modal"
                onClick={() => { handleModal(); handleClose() }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-opacity"
                onClick={handleSubmit}
                disabled={!newNote.title.trim() || !newNote.content.trim()}
              >
                {createNewNote.currentId ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}