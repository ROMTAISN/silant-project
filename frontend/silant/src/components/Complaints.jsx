import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './css/Complaints.css';
import LinkItems from './LinkItems';


const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [canAddComplaint, setCanAddComplaint] = useState(false)
    const [canAddComplaint1, setCanAddComplaint1] = useState(false)
    const [filter, setFilter] = useState({ field: '', value: '' });
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/complaints/`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
            setComplaints(response.data);
        });

        axios.get(`http://127.0.0.1:8000/user/`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
            const userGroups = response.data.groups;
            setCanAddComplaint(userGroups.includes('Manager'));
            setCanAddComplaint1(userGroups.includes('Company'));
        })
    }, [filter]);

    const handleFilterChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    };

    const handleFieldChange = (e) => {
        setFilter({ field: e.target.value, value: '' });
    };

    const applyFilter = () => {
        axios.get(`http://127.0.0.1:8000/api/complaints/?${filter.field}=${filter.value}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        }).then(response => {
            setComplaints(response.data);
        });
    };

    let activeButton = null;

    function changeButtonColor(event) {
    if (activeButton) {
        activeButton.style.backgroundColor = '#4CAF50';
    }

    activeButton = event.target;
    activeButton.style.backgroundColor = '#FF6347'; // Цвет при нажатии (например, томатный цвет)
    }

    return (
        <div className="Complaints">
            <LinkItems />
            <h3>Список зарегистрированных рекламаций</h3>
            {canAddComplaint && <Link to='/add-complaint/' className='add'>Добавить рекламацию</Link>}
            {canAddComplaint1 && <Link to='/add-complaint/' className='add'>Добавить рекламацию</Link>}
            
            <div>
                <select className='select-filter' onChange={handleFieldChange}>
                    <option value=''>Выберите фильтр</option>
                    <option value="failure_node__name">Узел отказа</option>
                    <option value="recovery_method__name">Метод восстановления</option>
                    <option value="service_company__username">Сервисная компания</option>
                </select>
                <input type='text' name='value' value={filter.value} onChange={handleFilterChange} />
                <button className='filter-button' onClick={applyFilter}>Применить фильтр</button>
            </div>
            {(complaints.length > 0) ? (
            <div className='table-container'>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                            <th>Дата отказа</th>
                            <th>Вид техники</th>
                            <th>Заводкой номер</th>
                            <th>Узел отказа</th>
                            <th>Способ восстановления</th>
                            <th>Сервисная компания</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map(complaint => (
                            <tr key={complaint.id}>
                                <td>{complaint.date_refusal}</td>
                                <td>{complaint.car_complaints.model_technique.name}</td>
                                <td>{complaint.car_complaints.factory_number}</td>
                                <td>{complaint.failure_node.name}</td>
                                <td>{complaint.recovery_method.name}</td>
                                <td>{complaint.service_company.username}</td>
                                <td>
                                <Link to={`/complaints/${complaint.id}`}><Button>Подробнее</Button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (
            <p>Список пуст!</p>
            )}
        </div>
    );
};

export default Complaints;