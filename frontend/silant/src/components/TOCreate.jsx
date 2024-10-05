import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './css/TOCreate.css';


const TOCreate = () => {
    const [formData, setFormData] = useState({
        view_TO: '',
        date_event: '',
        operating_time: '',
        order: '',
        date_order: '',
        organization_that_conducted: '',
        car_TO: '',
        service_company: ''
    });
    const [viewTO, setViewTO] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [carTO, setCarTO] = useState([]);
    const [serviceCompanies, setServiceCompanies] = useState([]);

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/view_to/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setViewTO(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/servicecomp/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setOrganizations(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/car/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setCarTO(response.data))
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

        axios.post('http://127.0.0.1:8000/to/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => console.log('TO added: ', response.data))
        .catch(error => console.log('Mistake: ', error));
        navigate('/to/')
    };

    return (
        <div className="create-container">
            <h3>Добавление информации о техническом обслуживании техники</h3>
            <form className='to-form' onSubmit={handleSubmit}>
                <label className='form-group'>
                    Вид ТО:
                    <select name='view_TO' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {viewTO.map(view => <option key={view.id} value={view.id}>{view.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Дата проведения ТО:
                    <input type='date' className='input-text' name='date_event' value={formData.date_event} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Наработка, м/час:
                    <input type='number' className='input-text' name='operating_time' value={formData.operating_time} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    № заказ-наряда:
                    <input type='text' className='input-text' name='order' value={formData.order} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Дата заказ-наряда:
                    <input type='date' className='input-text' name='date_order' value={formData.date_order} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Организация, проводившая ТО:
                    <select name='organization_that_conducted' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {organizations.map(organization => <option key={organization.id} value={organization.id}>{organization.name}</option>)}
                    </select>     
                </label>
                <label className='form-group'>
                    Машина:
                    <select name='car_TO' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {carTO.map(car => <option key={car.id} value={car.id}>{car.factory_number}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Сервисная компания:
                    <select name='service_company' className='select-items' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {serviceCompanies.map(service => <option key={service.id} value={service.id}>{service.username}</option>)}
                    </select>
                </label>
                <Link className='back' to={`/to`}>Отменить</Link> 
                <button className='create' type="submit">Добавить</button>
            </form> 
        </div>
    );
};

export default TOCreate;