import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export const Note = ({ content, editNote, deleteNote, id, uid }) => {

  const [user, setUser] = useState('');

  const auth = getAuth();
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser.uid)
  })

  const handleEdit = (id) => {
    editNote(id)
  }

  const handleDelete = (id) => {
    deleteNote(id)
  }

  return (
    <div className="notes">
      <p> {content}</p>
      <span>
        {uid === user 
        ? <><ModeEditOutlineOutlinedIcon onClick={() => { handleEdit(id) }} />
        <CloseOutlinedIcon onClick={() => { handleDelete(id) }} /></>
        : ''
      }
        
      </span>
    </div>
  )
}
