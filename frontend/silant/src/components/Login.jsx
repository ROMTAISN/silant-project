import React, { useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import './css/Header.css';
import './css/Login.css';

Modal.setAppElement('#root');

const Login = ({ isOpen, onRequestClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/token/', { username, password });
            localStorage.setItem('token', response.data.access);
            setError('');
            onLoginSuccess();
            onRequestClose();
        } catch (error) {
            setError('Неверный логин или пароль!');
        }
    };

    return (
        <Modal className='login-container' isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2>Войти на сайт</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="form-group">
                    Логин:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label className="form-group">
                    Пароль:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button className="button-login" type="submit">Войти</button>
            </form>
        </Modal>
    );
};


export default Login;