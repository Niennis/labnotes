import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { app } from '../services/firebase.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  // const [user, setUser] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    // setUser(user.email)
    // onAuthStateChanged(auth, (currentUser) => { })
    if (user) {
      window.location.href = 'http://localhost:3000/home'
    }
  }, []);

  const submit = () => {
    console.log(mail, pass);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'http://localhost:3000/home'

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`);
      });
  }

  return (
    <div>

      <label htmlFor="email">Mail </label>
      <input type="email" name='email' id="email" onChange={(e) => setMail(e.target.value)} /> <br />
      <label htmlFor="pass">Pass </label>
      <input type="password" name="pass" id="pass" onChange={(e) => setPass(e.target.value)} /> <br />
      <button type="button" onClick={submit}>Iniciar sesión</button>
      <p>No tienes cuenta? Crea una <Link to="/register">aquí</Link></p>
    </div>
  );
}

export { Login };