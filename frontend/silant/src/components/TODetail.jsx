import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "@mui/material";
import axios from "axios";
import "./css/TODetail.css"



const TODetail = ({ authToken }) => {
    const { id } = useParams();
    const [to, setTO] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/to/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
                if (authToken) {
                    setTO(response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the TO details!', error)
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
        <div className="TODetail">
            <Link to={`/to/`}><button className='back'>Назад</button></Link>
            <h2>Данные о проведённом ТО</h2>
            {to ? (
                <div>
                    <table className='infoTO' border='1'>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Вид ТО</td>
                                <td className='open-modal' onClick={() => handleModalOpen(to.view_TO.description)}>{to.view_TO.name}</td>
                            </tr>
                            <tr>
                                <td>Дата проведения ТО</td>
                                <td>{to.date_event}</td>
                            </tr>
                            <tr>
                                <td>Наработка, м/час</td>
                                <td>{to.operating_time}</td>
                            </tr>
                            <tr>
                                <td>№ заказ-наряда</td>
                                <td>{to.order}</td>
                            </tr>
                            <tr>
                                <td>Дата заказ-наряда</td>
                                <td>{to.date_order}</td>
                            </tr>
                            <tr>
                                <td>Организация, проводившая ТО</td>
                                <td className='open-modal' onClick={() => handleModalOpen(to.organization_that_conducted.description)}>{to.organization_that_conducted.name}</td>
                            </tr>
                            <tr>
                                <td>Машина</td>
                                <td className='open-modal' onClick={() => handleModalOpen(to.car_TO.model_technique.description)}>{to.car_TO.factory_number}</td>
                            </tr>
                            <tr>
                                <td>Сервисная компания</td>
                                <td>{to.service_company.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>ТО не найдено.</p>
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

export default TODetail;
