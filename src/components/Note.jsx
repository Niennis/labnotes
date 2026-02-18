import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import MoreTwoToneIcon from '@mui/icons-material/MoreTwoTone';

const DropdownMenu = ({ targetRef, isOpen, onClose, children }) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
  }, [isOpen, targetRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (targetRef.current && !targetRef.current.contains(event.target) &&
          menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, targetRef, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <ul ref={menuRef} style={{
      position: "absolute",
      top: coords.top,
      left: coords.left,
      zIndex: 9999,
      background: "white",
      border: "1px solid #E6E8BA",
      borderRadius: "5px",
      padding: "0",
      margin: "0",
      listStyle: "none",
      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      minWidth: "140px"
    }}>
      {children}
    </ul>,
    document.body
  );
};

export const Note = ({ title, content, editNote, deleteNote, id, colour, changeTheColor }) => {
  const buttonRef = useRef(null);
  const [isSelect, setIsSelect] = useState(false);

  const handleEdit = () => editNote(id);
  const handleDelete = () => deleteNote(id);
  const handleSelect = () => setIsSelect(!isSelect);

  const handleChangeColor = (colorName) => {
    // Pasar tanto el ID como el color a la función changeTheColor
    changeTheColor({ id: id, color: colorName });
    setIsSelect(false);
  };

  return (
    <div className="notes" style={{ backgroundColor: colour }}>
      <article>
        <h3>{title}</h3>
        {(() => {
          const lines = content ? content.split('\n').filter(Boolean) : [];
          return lines.length > 1
            ? <ul className="note-list">{lines.map((item, i) => <li key={i}>{item}</li>)}</ul>
            : <p>{content}</p>;
        })()}
      </article>
      <span>
        <div className="dropdown">
          <button
            className="btn-secondary dropdown-toggle"
            type="button"
            id={`dropdownMenuButton${id}`}
            aria-expanded="false"
            ref={buttonRef}
            onClick={handleSelect}
          >
            <MoreTwoToneIcon />
          </button>
          <DropdownMenu targetRef={buttonRef} isOpen={isSelect} onClose={() => setIsSelect(false)}>
            <li style={{ backgroundColor: '#bdd3c0' }}>
              <button className="dropdown-item" onClick={() => handleChangeColor('default')}>Por defecto</button>
            </li>
            <li style={{ backgroundColor: '#b0b993' }}>
              <button className="dropdown-item" onClick={() => handleChangeColor('nota')}>Nota</button>
            </li>
            <li style={{ backgroundColor: '#b3c879' }}>
              <button className="dropdown-item" onClick={() => handleChangeColor('compras')}>Compras</button>
            </li>
            <li style={{ backgroundColor: '#7f9651' }}>
              <button className="dropdown-item" onClick={() => handleChangeColor('tareas')}>Tareas</button>
            </li>
          </DropdownMenu>
        </div>
        <EditTwoToneIcon onClick={handleEdit} />
        <CancelTwoToneIcon onClick={handleDelete} />
      </span>
    </div>
  )
}