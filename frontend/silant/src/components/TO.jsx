import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import LinkItems from './LinkItems';
import './css/TO.css'


const TO = () => {
    const [toList, setToList] = useState([]);
    const [filter, setFilter] = useState({ field: '', value: '' });
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/to/', {
            headers: { Authorization: `Bearer ${authToken}` }
        }).then(response => {
            setToList(response.data);
        });
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
        axios.get(`http://127.0.0.1:8000/api/to/?${filter.field}=${filter.value}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        }).then(response => {
            setToList(response.data);
        });
    };

    return (
        <div className="TO">
            <LinkItems />
            <h3>Список проведённых ТО</h3>
            <Link to='/add-to/' className='add'>Добавить ТО</Link>
            <div>
                <select className='select-filter' onChange={handleFieldChange}>
                    <option value="">Выберите фильтр</option>
                    <option value="view_TO__name">Вид ТО</option>
                    <option value="car_TO__factory_number">Зав. № машины</option>
                    <option value="service_company__username">Сервисная компания</option>
                </select>
                <input type='text' name='value' value={filter.value} onChange={handleFilterChange} />
                <button className='filter-button' onClick={applyFilter}>Применить фильтр</button>
            </div>
            {(toList.length > 0) ? (
            <div className='table-container'>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                            <th>Вид ТО</th>
                            <th>Вид техники</th>
                            <th>Заводкой номер</th>
                            <th>Дата проведения</th>
                            <th>Сервисная компания</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toList.map(to => (
                            <tr key={to.id}>
                                <td>{to.view_TO.name}</td>
                                <td>{to.car_TO.model_technique.name}</td>
                                <td>{to.car_TO.factory_number}</td>
                                <td>{to.date_event}</td>
                                <td>{to.service_company.username}</td>
                                <td>
                                <Link to={`/to/${to.id}`}><Button>Подробнее</Button></Link>
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

export default TO;