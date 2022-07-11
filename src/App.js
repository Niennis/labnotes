import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';

import { Login } from './views/Login.jsx';
import { Register } from './views/Register.jsx';
import Home from './views/Home.jsx';
import Navbar from './components/Navbar.jsx';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [user, setUser] = useState('')
  const [state, setState] = useState({})

  useEffect(() => {
    handleCurrentUser()
    return () => {
      setState({})
    }
  }, [])

  const handleCurrentUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log('isuser', user.email, uid);// ...
      } else {
        setUser('');
      }
    })
  }

  const logout = resp => {
    console.log('resp', resp)
    setUser(resp)
  }

  const handleUser = (obj) => {
    console.log('muaha', obj)
    setUser(obj)
  }

  return (
    <>
      <Router>
        <Navbar setUser={logout} isUser={user} />
        <div className="App">
          <main className="container main">
            <Routes>
              <Route
                path="/"
                element={
                  !user ? (
                    <Login setUser={handleUser} />
                  ) : (
                    <Navigate replace to="/home" />
                  )
                }
              />
              <Route path="register" element={<Register />} />
              <Route
                path="home"
                element={
                  user ? (
                    <Home user={user} />
                  ) : (
                    <Login setUser={handleUser} />

                  )} />
            </Routes>
          </main>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
