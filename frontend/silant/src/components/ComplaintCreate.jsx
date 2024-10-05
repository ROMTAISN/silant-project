import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './css/ComplaintCreate.css';


const ComplaintCreate = () => {
    const [formData, setFormData] = useState({
        date_refusal: '',
        operating_time: '',
        failure_node: '',
        description_failure: '',
        recovery_method: '',
        spare_parts_used: '',
        date_restoration: '',
        car_complaints: '',
        service_company: ''
    });
    const [failureNodes, setFailureNodes] = useState([]);
    const [recoveryMethods, setRecoveryMethods] = useState([]);
    const [carComplaints, setCarComplaints] = useState([]);
    const [serviceCompanies, setServiceCompanies] = useState([]);

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/fail_node/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setFailureNodes(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/rec_method/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setRecoveryMethods(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/car/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setCarComplaints(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/company/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setServiceCompanies(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/complaints/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => console.log('Complaint added: ', response.data))
        .catch(error => console.log('Mistake: ', error));
        navigate('/complaints/')
    };

    return (
        <div className="create-container">
            <h3>Создание новой рекламации</h3>
            <form className='complaint-form' onSubmit={handleSubmit}>
                <label className='form-group'>
                    Дата отказа
                    <input type='date' className='input-text' name='date_refusal' value={formData.date_refusal} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Наработка, м/час
                    <input type='number' className='input-text' name='operating_time' value={formData.operating_time} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Узел отказа
                    <select name='failure_node' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {failureNodes.map(fail => <option key={fail.id} value={fail.id}>{fail.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Описание отказа
                    <input type='text' className='input-text' name='description_failure' value={formData.description_failure} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Способ восстановления
                    <select name='recovery_method' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {recoveryMethods.map(recovery => <option key={recovery.id} value={recovery.id}>{recovery.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Используемые запасные части
                    <input type='text' className='input-text' name='spare_parts_used' value={formData.spare_parts_used} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Дата восстановления
                    <input type='date' className='input-text' name='date_restoration' value={formData.date_restoration} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Машина
                    <select name='car_complaints' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {carComplaints.map(car => <option key={car.id} value={car.id}>{car.factory_number}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Сервисная компания
                    <select name='service_company' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {serviceCompanies.map(service => <option key={service.id} value={service.id}>{service.username}</option>)}
                    </select>
                </label>
                <Link className='back' to={`/complaints`}>Отменить</Link> 
                <button className='create' type="submit">Добавить</button>
            </form>
        </div>
    );
};

export default ComplaintCreate;