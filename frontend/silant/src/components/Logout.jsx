import React from 'react';
import Modal from 'react-modal';
import './css/Logout.css';


const Logout = ({ isOpen, onRequestClose, onLogoutSuccess }) => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        onLogoutSuccess();
        onRequestClose();
    };

    return (
        <Modal  className='logout-container' isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Вы действительно хотите выйти из аккаунта?</h2>
            <div className='button-cont'>
                <button onClick={handleLogout} className='button-logout'>Выйти</button>
                <button onClick={onRequestClose} className='button-logout'>Отмена</button>
            </div>
        </Modal>
    );
};

export default Logout;