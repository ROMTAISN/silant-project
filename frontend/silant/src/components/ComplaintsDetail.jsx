import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "@mui/material";
import axios from "axios";
import "./css/ComplaintDetail.css"



const ComplaintsDetail = ({ authToken }) => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/complaints/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        }).then(response => {
                if (authToken) {
                    setComplaint(response.data);
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
        <div className="ComplaintDetail">
            <Link to={`/complaints/`}><button className='back'>Назад</button></Link>
            <h2>Данные о зарегистрированной рекламации</h2>
            {complaint ? (
                <div>
                    <table className='infoComplaint' border='1'>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Дата отказа</td>
                                <td>{complaint.date_refusal}</td>
                            </tr>
                            <tr>
                                <td>Наработка, м/час</td>
                                <td>{complaint.operating_time}</td>
                            </tr>
                            <tr>
                                <td>Узел отказа</td>
                                <td className='open-modal' onClick={() => handleModalOpen(complaint.failure_node.description)}>{complaint.failure_node.name}</td>
                            </tr>
                            <tr>
                                <td>Описание отказа</td>
                                <td>{complaint.description_failure}</td>
                            </tr>
                            <tr>
                                <td>Способ восстановления</td>
                                <td className='open-modal' onClick={() => handleModalOpen(complaint.recovery_method.description)}>{complaint.recovery_method.name}</td>
                            </tr>
                            <tr>
                                <td>Используемые запасные части</td>
                                <td>{complaint.spare_parts_used}</td>
                            </tr>
                            <tr>
                                <td>Дата восстановления</td>
                                <td>{complaint.date_restoration}</td>
                            </tr>
                            <tr>
                                <td>Время простоя техники(в днях)</td>
                                <td>{complaint.duration}</td>
                            </tr>
                            <tr>
                                <td>Машина</td>
                                <td className='open-modal' onClick={() => handleModalOpen(complaint.car_complaints.model_technique.description)}>{complaint.car_complaints.factory_number}</td>
                            </tr>
                            <tr>
                                <td>Сервисная компания</td>
                                <td>{complaint.service_company.username}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Рекламация не найдена.</p>
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

export default ComplaintsDetail;