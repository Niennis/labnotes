import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';

import { Login } from './views/Login.jsx';
import { Register } from './views/Register.jsx';
import Home from './views/Home.jsx';

import './App.css';

const App = () => {

  const [user, setUser] = useState(false)

  useEffect(() => {
    isUser()
    console.log('useeffect', user);
  }, [])

  const isUser = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(true);
        console.log('isuser', user.email, uid);// ...
      } else {
        setUser(false);
      }
    })
  }

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(false);
        console.log('Salió exitosamente');
        window.location.href = 'http://localhost:3000'
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

                {user ?
                  <>
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={logout}>Logout</Link>
                    </li>
                  </>
                  : <><li>
                    <Link to="/">Login</Link>
                  </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>}
              </ul>
            </nav>
          </header>
          <main className="container main">
            <Switch>
              {/* {user ?
                <> */}
              <Route exact path="/home">
                <Home />
              </Route>
              {/*     <Route exact path="/">
                    <Login />
                  </Route> */}
              {/*    </>
                :
                <> */}
              <Route exact path="/register">
                <Register />
              </Route>

              <Route exact path="/">
                <Login />
              </Route>
              {/*   </>
              } */}
            </Switch>
          </main>
        </div>

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
