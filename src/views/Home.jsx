import React, { useState, useEffect } from 'react';
import { db } from '../utils/firebase.js';
import { collection, addDoc, onSnapshot, query, doc, deleteDoc, setDoc, updateDoc, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { Note } from '../components/Note.jsx';
import { NoteForm } from './NoteForm.jsx';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';

const Home = ({ user }) => {

  const [data, setData] = useState([]);
  const [currentId, setCurrentId] = useState('')
  const [modal, setModal] = useState(false);

  useEffect(() => {

    const fetchData = () => {
      const q = query(collection(db, "notes"), orderBy('date', 'asc'));
      onSnapshot(q, (querySnapshot) => {
        const notes = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === user.uid) {
            notes.push({ ...doc.data(), id: doc.id });
          }
        });

        if (notes.length > 0) {
          setData(notes)
        } else {
          setData([])
        }
      });
    }

    fetchData();
  }, [user.uid])

  const createNewNote = async (item) => {

    if (currentId === '') {
      try {
        await addDoc(collection(db, "notes"), item);
        toast('Nueva nota agregada', {
          position: "bottom-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        handleCloseModal()
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      try {
        await setDoc(doc(db, "notes", currentId), item);
        editNote('')
        handleCloseModal()
      } catch (e) {
        console.error('Error al editar: ', e);
      }
    }
  }

  const editNote = (id) => {
    setCurrentId(id)
    handleOpenModal()
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

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
    setCurrentId('')
  }

  const handleId = (id) => {
    setCurrentId(id)
  }

  const changeColor = async (data) => {
    // data debe contener { id: "abc123", color: "default" }
    const { id, color } = data;

    await updateDoc(doc(db, "notes", id), {
      colour: color // Actualiza solo el campo colour
    });
  }

  const handleColor = (item) => {
    if (item.color === 'nota') {
      return '#b0b993'
    } else if (item.color === 'tareas') {
      return '#7f9651'
    } else if (item.color === 'compras') {
      return '#b3c879'
    } else {
      return '#bdd3c0'
    }
  }

  return (
    <>
      <section className='main-notes'>
        <div className='add-container btn'>
          <h2 className=''>Mis notas</h2>
          <AddCircleTwoToneIcon
            sx={{ color: '#7B9676', fontSize: '30px', margin: '5px' }}
            onClick={handleOpenModal}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
        </div>

        <div className="notes-container">
          {data.length === 0 ? 'No has agregado notas...' :
            data.map((item) => {
              return (
                <Note
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  content={item.content}
                  colour={handleColor({ color: item.colour || 'default' })}
                  editNote={editNote}
                  deleteNote={deleteNote}
                  changeTheColor={changeColor} // ← Pasa la función corregida
                />)
            })
          }
        </div>
      </section>

      {/* MODAL FUERA DEL CONTENEDOR PRINCIPAL */}
      <NoteForm
        createNewNote={{ createNewNote, currentId, data }}
        handleModal={handleCloseModal}
        isOpen={modal}
      />
    </>
  );
}

export default Home;