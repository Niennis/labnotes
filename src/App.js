import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getAuth, signOut } from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';

import { Login } from './views/Login.jsx';
import { Register } from './views/Register.jsx';
import Home from './views/Home.jsx';

import './App.css';

const App = () => {

  const [user, setUser] = useState('')

  useEffect(() => {
    // const auth = getAuth();
    // setUser(auth.currentUser.email);

  })


  /*   const logout = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    } */

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
                  <Link to="/register">Register</Link>
                </li>
                {user ?
                  <>
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      <Link to="/" >Logout</Link>
                    </li>
                  </>
                  : ''}
              </ul>
            </nav>
          </header>
          <main className="container main">
            <Switch>

              <Route path="/home">
                <Home />
              </Route>

              <Route path="/register">
                <Register />
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
