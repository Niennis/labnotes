import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';

// import { app } from './services/firebase.js';
// import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import { Login } from './views/login.jsx';
import Home from './views/home.jsx';

import './App.css';

const App = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      <Router>
        <div className="App">
          <header className="container header">
            <nav>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                {user ? <li>
                  <Link to="/" >Logout</Link>
                </li>
                : ''}
              </ul>
            </nav>
          </header>
          <main className="container main">
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </main>
        </div>

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
