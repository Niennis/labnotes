import React, { useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../utils/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

import './modal.css';

export const NoteForm = ({ createNewNote, handleModal }) => {

  const initialStateValues = {
    title: '',
    content: '',
    uid: '',
    date: ''
  }
  const [newNote, setNewNote] = useState(initialStateValues);
  const [user, setUser] = useState('');

  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    if(currentUser === null ) {
      setUser('')
    } else {
      setUser(currentUser.uid)
    }
  })

  const onChangeHandler = useCallback(
    ({target:{name,value}}) => 
      setNewNote(state => 
        ({ ...state, [name]:value, uid: user, date: new Date() }), [])
  );

  const handleSubmit = () => {
    console.log(newNote)
    createNewNote.createNewNote(newNote)
    setNewNote({ ...initialStateValues })
  }

  useEffect(() => {
    if (createNewNote.currentId === '') {
      setNewNote({
        title: '',
        content: '',
        uid: '',
        date: ''
      })
    } else {
      getNoteById(createNewNote.currentId)
    }
  }, [createNewNote.currentId])
  // se especifica en el [] el currentId o no???

  const getNoteById = async (id) => {
    const noteRef = await getDoc(doc(db, "notes", id))
    setNewNote({ ...noteRef.data() })
  }

  const handleClose = () => {
    setNewNote({ ...initialStateValues })
  }

  return (
    <div className="create-note-container">
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">Nueva nota</h2>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control btn"
                    id="recipient-name"
                    onChange={onChangeHandler}
                    value={newNote.title}
                    name="title" 
                    placeholder='Título'
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control btn"
                    id="message-text"
                    onChange={onChangeHandler}
                    value={newNote.content}
                    name="content"
                    placeholder='Contenido...'
                    >
                  </textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal" 
                onClick={() => {handleModal(); handleClose()}}>Cancelar</button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}>
                  Guardar
              </button>
            </div>
          </div>
        </div>
      </div>









    </div>
  )
}