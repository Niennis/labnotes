import React, { useState } from 'react';
// import { app } from '../services/firebase.js';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Form from '../components/Form';

const Register = ({ setUser }) => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        const user = userCredential.user;
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
          case 'auth/weak-password':
            setError('Contraseña debe tener al menos 6 caracteres')
            break;
          case 'auth/email-already-in-use':
            setError('Usuario ya registrado')
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
  
  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      return submit()
    }
  }

  return (
    <>
      <Form
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        submit={submit}
        error={error}
        innerText={'Registrar usuario'}
        handleKeyDown={handleKeyDown}
      />
    </>
  );
}

export { Register };