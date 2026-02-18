import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// ── Firebase mocks ────────────────────────────────────────────────────────────
jest.mock('../utils/firebase.js', () => ({ db: {} }));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  // No llamar callback sincrónicamente: evita re-renders en cadena durante el efecto en React 18
  onAuthStateChanged: jest.fn(() => () => {}),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => false })),
}));

// ── Componentes ───────────────────────────────────────────────────────────────
import { Note } from '../components/Note';
import ConfirmDialog from '../components/Confirm';
import { NoteForm } from '../components/NoteForm';

// ─────────────────────────────────────────────────────────────────────────────
// Note
// ─────────────────────────────────────────────────────────────────────────────
describe('Note', () => {
  const defaultProps = {
    id: 'abc123',
    title: 'Título de prueba',
    content: 'Contenido de prueba',
    colour: '#bdd3c0',
    editNote: jest.fn(),
    deleteNote: jest.fn(),
    changeTheColor: jest.fn(),
  };

  test('muestra el título y el contenido', () => {
    render(<Note {...defaultProps} />);
    expect(screen.getByText('Título de prueba')).toBeInTheDocument();
    expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
  });

  test('aplica el color de fondo recibido por prop', () => {
    const { container } = render(<Note {...defaultProps} />);
    expect(container.querySelector('.notes')).toHaveStyle({ backgroundColor: '#bdd3c0' });
  });

  test('llama a editNote con el id al hacer clic en el ícono de editar', () => {
    const editNote = jest.fn();
    const { container } = render(<Note {...defaultProps} editNote={editNote} />);
    // Orden de iconos: [0] MoreTwoTone (dropdown), [1] EditTwoTone, [2] CancelTwoTone
    const svgs = container.querySelectorAll('svg');
    fireEvent.click(svgs[1]);
    expect(editNote).toHaveBeenCalledWith('abc123');
  });

  test('llama a deleteNote con el id al hacer clic en el ícono de eliminar', () => {
    const deleteNote = jest.fn();
    const { container } = render(<Note {...defaultProps} deleteNote={deleteNote} />);
    const svgs = container.querySelectorAll('svg');
    fireEvent.click(svgs[2]);
    expect(deleteNote).toHaveBeenCalledWith('abc123');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// ConfirmDialog
// ─────────────────────────────────────────────────────────────────────────────
describe('ConfirmDialog', () => {
  test('no muestra contenido cuando open es false', () => {
    render(<ConfirmDialog open={false} onclick={jest.fn()} onclose={jest.fn()} />);
    expect(screen.queryByText('¿Desea confirmar esta acción?')).not.toBeInTheDocument();
  });

  test('muestra el diálogo cuando open es true', () => {
    render(<ConfirmDialog open={true} onclick={jest.fn()} onclose={jest.fn()} />);
    expect(screen.getByText('¿Desea confirmar esta acción?')).toBeInTheDocument();
  });

  test('llama a onclose al hacer clic en Cancelar', () => {
    const onclose = jest.fn();
    render(<ConfirmDialog open={true} onclick={jest.fn()} onclose={onclose} />);
    fireEvent.click(screen.getByText('Cancelar'));
    expect(onclose).toHaveBeenCalledTimes(1);
  });

  test('llama a onclick al hacer clic en Aceptar', () => {
    const onclick = jest.fn();
    render(<ConfirmDialog open={true} onclick={onclick} onclose={jest.fn()} />);
    fireEvent.click(screen.getByText('Aceptar'));
    expect(onclick).toHaveBeenCalledTimes(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// NoteForm
// ─────────────────────────────────────────────────────────────────────────────
describe('NoteForm', () => {
  const baseProps = {
    createNewNote: { createNewNote: jest.fn(), currentId: '', data: [] },
    handleModal: jest.fn(),
    isOpen: true,
  };

  test('muestra "Nueva nota" cuando no hay currentId', () => {
    render(<NoteForm {...baseProps} />);
    expect(screen.getByText('Nueva nota')).toBeInTheDocument();
  });

  test('muestra "Editar nota" cuando hay currentId', () => {
    render(
      <NoteForm
        {...baseProps}
        createNewNote={{ ...baseProps.createNewNote, currentId: 'xyz' }}
      />
    );
    expect(screen.getByText('Editar nota')).toBeInTheDocument();
  });

  test('el botón Guardar está deshabilitado si los campos están vacíos', () => {
    render(<NoteForm {...baseProps} />);
    expect(screen.getByText('Guardar')).toBeDisabled();
  });

  test('el botón Guardar se habilita al completar título y contenido', () => {
    render(<NoteForm {...baseProps} />);
    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { name: 'title', value: 'Mi nota' },
    });
    fireEvent.change(screen.getByPlaceholderText('Contenido...'), {
      target: { name: 'content', value: 'Mi contenido' },
    });
    expect(screen.getByText('Guardar')).not.toBeDisabled();
  });

  test('renderiza 4 opciones de color', () => {
    const { container } = render(<NoteForm {...baseProps} />);
    expect(container.querySelectorAll('.colour-swatch')).toHaveLength(4);
  });

  test('el primer swatch (Por defecto) está seleccionado inicialmente', () => {
    const { container } = render(<NoteForm {...baseProps} />);
    const swatches = container.querySelectorAll('.colour-swatch');
    expect(swatches[0]).toHaveClass('selected');
    expect(swatches[1]).not.toHaveClass('selected');
  });

  test('al hacer clic en un swatch cambia la selección', () => {
    const { container } = render(<NoteForm {...baseProps} />);
    const swatches = container.querySelectorAll('.colour-swatch');
    fireEvent.click(swatches[2]); // Compras
    expect(swatches[2]).toHaveClass('selected');
    expect(swatches[0]).not.toHaveClass('selected');
  });
});
