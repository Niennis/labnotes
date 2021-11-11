import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase.js';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { Note } from '../components/Notes.jsx';
import { NoteForm } from './NoteForm.jsx';

const Home = () => {

  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState('')

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    const q = query(collection(db, "notes"));
    onSnapshot(q, (querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });
      setData(notes)
    });
  }

  const createNewNote = async (item) => {
    if (currentId === '') {
      try {
        const docRef = await addDoc(collection(db, "notes"), item);
        toast('Nueva nota agregada', {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      try {
        await setDoc(doc(db, "notes", currentId), item);
        editNote('')
      } catch(e){
        console.error('Error al editar: ', e);
      }
    }
  }

  const editNote = (id) => {
    console.log('home', id);
    setCurrentId(id)
  }

  const deleteNote = async (id) => {
    if (window.confirm('Estás seguro que deseas eliminar la nota?')) {
      await deleteDoc(doc(db, "notes", id));
      toast.error('Nota eliminada exitosamente', {
        position: "bottom-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark'
      })
    }
  }

  return (
    <>
      <h2>Mis notas</h2>

      <NoteForm
        createNewNote={{ createNewNote, currentId, data }}
      />

      <section className="notes-container">
        {data.length === 0 ? 'No has agregado notas...' :
          data.map((item) => {
            return <Note key={item.id}
            uid={item.uid}
              content={item.content}
              editNote={() => { editNote(item.id) }}
              deleteNote={() => { deleteNote(item.id) }} />
          })
        }
      </section>
    </>
  );
}

export default Home;