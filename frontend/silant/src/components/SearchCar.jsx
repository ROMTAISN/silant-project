import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, TextField, Typography } from '@mui/material';

import './css/SearchCar.css';



const SearchCar = () => {
    const [factoryNumber, setFactoryNumber] = useState('');
    const [carData, setCarData] = useState(null);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/cars/find/${factoryNumber}/`);
            setCarData(response.data);
            setError('');
        } catch (err) {
            setCarData(null)
            setError('Данных о машине с таким заводским номером нет в системе!')
        }
    };

    const handleModalOpen = (description) => {
        setModalContent(description);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className="SearchCar">
            <h3>Проверьте комплектацию и технические характеристики техники Силант</h3>
            <TextField
                label="Заводской номер"
                value={factoryNumber}
                onChange={(e) => setFactoryNumber(e.target.value)}
            />
            <button className='button-search'onClick={handleSearch}>Поиск</button>

            {error && <Typography color="error">{error}</Typography>}

            {carData && (
                <div>
                    <h2>Данные о машине</h2>
                    <table className='infoCar' border='1'>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Заводской номер машины</td>
                                <td>{carData.factory_number}`</td>
                            </tr>
                            <tr>
                                <td>Модель техники</td>
                                <td className='modal-open' onClick={() => handleModalOpen(carData.model_technique.description)}>{carData.model_technique.name}</td>
                            </tr>
                            <tr>
                                <td>Модель двигателя</td>
                                <td className='modal-open' onClick={() => handleModalOpen(carData.engine_model.description)}>{carData.engine_model.name}</td>
                            </tr>
                            <tr>
                                <td>Номер двигателя</td>
                                <td>{carData.engine_number}</td>
                            </tr>
                            <tr>
                                <td>Модель трансмиссии</td>
                                <td className='modal-open' onClick={() => handleModalOpen(carData.transmission_model.description)}>{carData.transmission_model.name}</td>
                            </tr>
                            <tr>
                                <td>Номер трансмиссии</td>
                                <td>{carData.transmission_number}</td>
                            </tr>
                            <tr>
                                <td>Модель ведущего моста</td>
                                <td className='modal-open' onClick={() => handleModalOpen(carData.model_drive_bridge.description)}>{carData.model_drive_bridge.name}</td>
                            </tr>
                            <tr>
                                <td>Номер ведущего моста</td>
                                <td>{carData.number_drive_bridge}</td>
                            </tr>
                            <tr>
                                <td>Модель управляемого моста</td>
                                <td className='modal-open' onClick={() => handleModalOpen(carData.controlled_bridge_model.description)}>{carData.controlled_bridge_model.name}</td>
                            </tr>
                            <tr>
                                <td>Номер управляемого моста</td>
                                <td>{carData.controlled_bridge_number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <Modal open={modalOpen} onClose={handleModalClose}>
                <div className='modal-window'>
                    <h2>Описание</h2>
                    <p>{modalContent}</p>
                    <Button onClick={handleModalClose}>Закрыть</Button>
                </div>
            </Modal>
        </div>
    );
};

export default SearchCar;