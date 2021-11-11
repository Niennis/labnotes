import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../utils/firebase.js';
import { doc, getDoc } from 'firebase/firestore';

export const NoteForm = ({ createNewNote }) => {

  const initialStateValues = {
    content: '',
    uid: '',
    date: ''
  }
  const [newNote, setNewNote] = useState(initialStateValues);
  const [user, setUser] = useState('');

  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser.uid)
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote({ ...newNote, [name]: value, uid: user, date: new Date() })
  }

  const handleSubmit = () => {
    createNewNote.createNewNote(newNote)
    setNewNote({ ...initialStateValues })
  }

  useEffect(() => {
    if (createNewNote.currentId === '') {
      setNewNote({
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


  return (
    <div className="create-note-container">
      <input
        type="text"
        id="content"
        name="content"
        onChange={handleInputChange}
        value={newNote.content} />

      <button onClick={handleSubmit}>
        {createNewNote.currentId === ''
          ? `Crear nota `
          : `Editar`}

      </button>
    </div>
  )
}