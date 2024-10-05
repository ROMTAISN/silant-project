import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "@mui/material";
import axios from "axios";
import './css/CarDetail.css';



const CarDetail = ({ authToken }) => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/car/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
            if (authToken) {
                setCar(response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the Car details!', error)
        });
    }, [authToken, id]);

    const handleModalOpen = (description) => {
        setModalContent(description);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className="car-detail">
            <Link to={`/`}><button className='back'>Назад</button></Link>
            <h2>Данные о машине</h2>
            {car ? (
                <div>
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
                                <td>{car.factory_number}`</td>
                            </tr>
                            <tr>
                                <td>Модель техники</td>
                                <td className='open-modal' onClick={() => handleModalOpen(car.model_technique.description)}>{car.model_technique.name}</td>
                            </tr>
                            <tr>
                                <td>Модель двигателя</td>
                                <td className='open-modal' onClick={() => handleModalOpen(car.engine_model.description)}>{car.engine_model.name}</td>
                            </tr>
                            <tr>
                                <td>Номер двигателя</td>
                                <td>{car.engine_number}</td>
                            </tr>
                            <tr>
                                <td>Модель трансмиссии</td>
                                <td className='open-modal' onClick={() => handleModalOpen(car.transmission_model.description)}>{car.transmission_model.name}</td>
                            </tr>
                            <tr>
                                <td>Номер трансмиссии</td>
                                <td>{car.transmission_number}</td>
                            </tr>
                            <tr>
                                <td>Модель ведущего моста</td>
                                <td className='open-modal' onClick={() => handleModalOpen(car.model_drive_bridge.description)}>{car.model_drive_bridge.name}</td>
                            </tr>
                            <tr>
                                <td>Номер ведущего моста</td>
                                <td>{car.number_drive_bridge}</td>
                            </tr>
                            <tr>
                                <td>Модель управляемого моста</td>
                                <td className='open-modal' onClick={() => handleModalOpen(car.controlled_bridge_model.description)}>{car.controlled_bridge_model.name}</td>
                            </tr>
                            <tr>
                                <td>Номер управляемого моста</td>
                                <td>{car.controlled_bridge_number}</td>
                            </tr>
                            <tr>
                                <td>Договор поставки: №, дата</td>
                                <td>{car.delivery_agreement}</td>
                            </tr>
                            <tr>
                                <td>Дата отгрузки с завода</td>
                                <td>{car.date_of_shipment}</td>
                            </tr>
                            <tr>
                                <td>Грузополучатель(конечный потребитель)</td>
                                <td>{car.consignee}</td>
                            </tr>
                            <tr>
                                <td>Адрес поставки(зксплуатации)</td>
                                <td>{car.delivery_address}</td>
                            </tr>
                            <tr>
                                <td>Комплектация(доп.опции)</td>
                                <td>{car.package_contents}</td>
                            </tr>
                            <tr>
                                <td>Клиент</td>
                                <td>{car.client.username}</td>
                            </tr>
                            <tr>
                                <td>Сервисная компания</td>
                                <td>{car.service_company.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Машина не найдена.</p>
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

export default CarDetail;
