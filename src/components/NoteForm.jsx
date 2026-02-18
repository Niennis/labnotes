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
    date: '',
    colour: 'default',
    isListMode: false,
  }

  const colourOptions = [
    { value: 'default', color: '#bdd3c0', label: 'Por defecto' },
    { value: 'nota',    color: '#b0b993', label: 'Nota' },
    { value: 'compras', color: '#b3c879', label: 'Compras' },
    { value: 'tareas',  color: '#7f9651', label: 'Tareas' },
  ]

  const [newNote, setNewNote] = useState(initialStateValues);
  const [user, setUser] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser === null) {
        setUser('')
      } else {
        setUser(currentUser.uid)
      }
    });
    return () => typeof unsubscribe === 'function' && unsubscribe();
  }, []);

  const onChangeHandler = useCallback(
    ({ target: { name, value } }) => {
      setNewNote(state =>
        ({ ...state, [name]: value, uid: user, date: new Date() })
      );
    }, [user]
  );

  const handleSubmit = () => {
    createNewNote.createNewNote(newNote);
    setNewNote({ ...initialStateValues });
  }

  useEffect(() => {
    if (!createNewNote.currentId || createNewNote.currentId === '') {
      setNewNote({
        title: '',
        content: '',
        uid: user,
        date: '',
        colour: 'default',
        isListMode: false,
      });
    } else {
      getNoteById(createNewNote.currentId);
    }
  }, [createNewNote.currentId, user]);

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

  const handleColourChange = (value) => {
    setNewNote(state => ({ ...state, colour: value, uid: user, date: new Date() }));
  }

  const handleClose = () => {
    setNewNote({ ...initialStateValues, uid: user });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  }

  const handleBackdropClick = (e) => {
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
                    placeholder={newNote.isListMode ? 'Un ítem por línea...' : 'Contenido...'}
                    rows="4"
                  />
                  <label className="list-mode-label">
                    <input
                      type="checkbox"
                      checked={newNote.isListMode || false}
                      onChange={() => setNewNote(s => ({ ...s, isListMode: !s.isListMode }))}
                    />
                    Mostrar como lista
                  </label>
                </div>
                <div className="colour-picker">
                  {colourOptions.map(({ value, color, label }) => (
                    <button
                      key={value}
                      type="button"
                      className={`colour-swatch ${newNote.colour === value ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColourChange(value)}
                      data-label={label}
                    />
                  ))}
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
