import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import LinkItems from './LinkItems';
import './css/Cars.css';


const Cars = () => {
    const [cars, setCars] = useState([]);
    const [canAddCar, setCanAddCar] = useState(false)
    const [filter, setFilter] = useState({ field: '', value: '' });
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/car/`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
            setCars(response.data)
            
        })
        axios.get(`http://127.0.0.1:8000/user/`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
            const userGroups = response.data.groups;
            setCanAddCar(userGroups.includes('Manager'));
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
        axios.get(`http://127.0.0.1:8000/api/car/?${filter.field}=${filter.value}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        }).then(response => {
            setCars(response.data);
            if (setCars.length == 0) {
                console.log('Pusto blyat')
            }
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
        <div className="Cars">
            <LinkItems />
            <h3>Список техники Силант</h3>
            {canAddCar && <Link to='/add-car/' className='add'>Добавить технику</Link>}
            <div>
                <select className='select-filter' onChange={handleFieldChange}>
                    <option value="">Выберите фильтр</option>
                    <option value="model_technique__name">Модель техники</option>
                    <option value="engine_model__name">Модель двигателя</option>
                    <option value="transmission_model__name">Модель трансмиссии</option>
                    <option value="model_drive_bridge__name">Модель ведущего моста</option>
                    <option value="controlled_bridge_model__name">Модель управляемого моста</option>
                </select>
                <input type='text' name='value' value={filter.value} onChange={handleFilterChange} />
                <button className='filter-button' onClick={applyFilter}>Применить фильтр</button>
            </div>
            {(cars.length > 0) ? (
            <div className='table-container'>
                <table className='responsive-table'>
                    <thead>
                        <tr>
                            <th>Заводской номер</th>
                            <th>Вид техники</th>
                            <th>Модель двигателя</th>
                            <th>Номер двигателя</th>
                            <th>Сервисная компания</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.factory_number}</td>
                                <td>{car.model_technique.name}</td>
                                <td>{car.engine_model.name}</td>
                                <td>{car.engine_number}</td>
                                <td>{car.service_company.username}</td>
                                <td>
                                <Link to={`/cars/${car.id}`}><Button>Подробнее</Button></Link>
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

export default Cars;
