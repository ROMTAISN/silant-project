import React, { useState, useEffect } from "react";
import Login from "./Login";
import Logout from "./Logout";
import './css/Header.css';
import MyImage from './images/logo.png';


const Header = ({ onAuthChange }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    onAuthChange(isLoggedIn);
  }, [isLoggedIn, onAuthChange]);

  const hadleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className='Header'>
      <div className='head'>
        <li>
          <img src={MyImage} alt='logo' className='logo' />
        </li>
        <li>
          <h3 className='contact-info'>+7-8352-20-12-09, t.me/cttexpo</h3>
        </li>
        <li>
          {isLoggedIn ? (
            <button className='in-out' onClick={() => setIsLogoutModalOpen(true)}>Выйти</button>
          ) : (
            <button className='in-out' onClick={() => setIsLoginModalOpen(true)}>Войти</button>
          )}

          <Login
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
            onLoginSuccess={hadleLoginSuccess}
          />

          <Logout
            isOpen={isLogoutModalOpen}
            onRequestClose={() => setIsLogoutModalOpen(false)}
            onLogoutSuccess={handleLogoutSuccess}
          />
        </li>
      </div>
      <h1 className='title'>Электронная сервисная книжка "Мой Силант"</h1>
    </header>
  );
};


export default Header;