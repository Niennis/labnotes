import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';


const Navbar = ({ isUser, setUser}) => {
  const [state, setState] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setState({})
    }
  }, [])

  const logout = () => {
    const auth = getAuth();
    console.log('estamos en el navbar')
    signOut(auth)
      .then(() => {
        setUser(false);
        console.log('Salió exitosamente');
        navigate('/')
      }).catch((error) => {
        // An error happened.
      });
  }


  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-light container header">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isUser ?
                <>
                  <li className="nav-item btn">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="nav-item btn">
                    <Link to="/" onClick={logout}>Logout</Link>
                  </li>
                </> :
                <>
                  <li className="nav-item btn">
                    <Link to="/">Login</Link>
                  </li>
                  <li className="nav-item btn">
                    <Link to="/register">Register</Link>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>

    </header>
  )
}

export default Navbar;