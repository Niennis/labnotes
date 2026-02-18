import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock('./utils/firebase.js', () => ({ db: {}, app: {} }));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null); // sin usuario autenticado
    return jest.fn(); // unsubscribe
  }),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(),
  onSnapshot: jest.fn(),
  deleteDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  orderBy: jest.fn(),
  query: jest.fn(),
}));

import App from './App';

describe('App', () => {
  test('renderiza sin errores', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('muestra la pantalla de login cuando no hay usuario autenticado', () => {
    render(<App />);
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
  });

  test('el navbar muestra los links de Login y Register cuando no hay sesión', () => {
    render(<App />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('no muestra links de Home ni Logout cuando no hay sesión', () => {
    render(<App />);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
