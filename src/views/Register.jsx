import React, { useState, useEffect } from 'react';
// import { app } from '../services/firebase.js';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Register = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  // const [user, setUser] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    // setUser(user.email)
    // onAuthStateChanged(auth, (currentUser) => { })
  
  }, []);

  const submit = () => {
    console.log(mail, pass);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, mail, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
      <button type="button" onClick={submit}>Registrar usuario</button>
    </div>
  );
}

export { Register };