import React, { useState, useEffect } from 'react';
import LoginPopup from "./LoginPopup";
import SignupPopup from './SignupPopup';

const Header = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    let role = '';
    let email;
    let accessToken;
    cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'accessToken') {
        accessToken = value;
      }
      if (name === 'email') {
        email = value;
      }
      if (name === 'role') {
        role = value;
      }
    });
    email && setUser({email, accessToken, role});
    !email &&setUser(null);
  }, []);

  function handleShowLoginPopup() {
    setShowLoginPopup(true);
  }
  function handleShowSignupPopup() {
    setShowSignupPopup(true);
  }

  function handleCloseLoginPopup() {
    setShowLoginPopup(false);
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    let role = '';
    let email;
    let accessToken;
    cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'accessToken') {
        accessToken = value;
      }
      if (name === 'email') {
        email = value;
      }
      if (name === 'role') {
        role = value;
      }
    });
    email && setUser({email, accessToken, role});
    !email &&setUser(null);
  }
  function handleCloseSignupPopup() {
    setShowSignupPopup(false);
  }

  const removeAllCookies = () => {
    window.location.pathname = '/';
    setUser(null)
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const equalsIndex = cookie.indexOf('=');
      const name = equalsIndex > -1 ? cookie.substr(0, equalsIndex) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center col-md-9 mb-2 mb-md-0 text-dark text-decoration-none">
            <h1 className="display-5 fw-bold">Plant Shop</h1>
          </a>

          {!user && <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-success me-2" onClick={handleShowLoginPopup}>Login</button>
            <button type="button" className="btn btn-success" onClick={handleShowSignupPopup}>Sign-up</button>
            <LoginPopup show={showLoginPopup} onClose={handleCloseLoginPopup} />
            <SignupPopup show={showSignupPopup} onClose={handleCloseSignupPopup} />
          </div>}

          {user && <div className="col-md-3 text-end">
            <a role="button" className="btn btn-outline-success me-2" href='/profile'>Profile</a>
            <button type="button" className="btn btn-success" onClick={removeAllCookies}>Logout</button>
          </div>}
        </div>
      </div>
    </header>
  );
};

export default Header;
