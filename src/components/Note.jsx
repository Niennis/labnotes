import React, { useState } from 'react';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import MoreTwoToneIcon from '@mui/icons-material/MoreTwoTone';

export const Note = ({ title, content, editNote, deleteNote, id, colour, handleId, changeTheColor }) => {
  const [isSelect, setIsSelect] = useState(false)
  const [changeColor, setChangeColor] = useState('whitesmoke')

  const handleEdit = () => {
    editNote(id)
  }

  const handleDelete = () => {
    deleteNote(id)
  }

  const handleSelect = (e) => {
    setIsSelect(!isSelect)
    handleId(id)
  }

  const handleChangeColor = (e) => {
    changeTheColor({ color: e.target.name })
    setIsSelect(!isSelect)

  }

  return (
    <div className="notes" style={{ backgroundColor: colour }}>
      <h3>{title}</h3>
      <p> {content}</p>
      <span>
        <div className="dropdown">
          <button className="btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <MoreTwoToneIcon onClick={() => { handleSelect(id) }} />
          </button>
          {isSelect &&
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li style={{ backgroundColor: '#bdd3c0' }}>
                <button className="dropdown-item" onClick={handleChangeColor} name='default' > Por defect</button>
              </li>
              <li style={{ backgroundColor: '#b0b993' }}>
                <button className="dropdown-item" onClick={handleChangeColor} name='nota'> Nota</button>
              </li>
              <li style={{ backgroundColor: '#b3c879' }}>
                <button className="dropdown-item" onClick={handleChangeColor} name='compras' > Compras</button>
              </li>
              <li style={{ backgroundColor: '#7f9651' }}>
                <button className="dropdown-item" onClick={handleChangeColor} name='tareas' > Tareas</button>
              </li>
            </ul>
          }
        </div>
        <EditTwoToneIcon onClick={() => { handleEdit() }} />
        <CancelTwoToneIcon onClick={() => { handleDelete() }} />
      </span>
    </div>
  )
}
