import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Form from '../components/Form';

import './login.css';

const Login = ({ setUser }) => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('')
  let navigate = useNavigate();

  const submit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/home')
        setUser(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       
        switch (errorCode) {
          case 'auth/invalid-email':
            setError('Email inválido')
            break;
          case 'auth/wrong-password':
            setError('Contraseña incorrecta')
            break;
          case 'auth/user-not-found':
            setError('Usuario no encontrado')
            break;
          default:
            setError('Hubo algún problema')
            break;
        }
        console.log(`${errorCode}: ${errorMessage}`);
      });
  }

  const handleEmail = (e) => {
    setMail(e.target.value)
  }

  const handlePassword = (e) => {
    setPass(e.target.value)
  }

  return (
    <>
      <Form
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        submit={submit}
        error={error}
        innerText={'Iniciar sesión'}
      />
      <p>No tienes cuenta? Crea una <Link to="/register">aquí</Link></p>
    </>
  );
}

export { Login };