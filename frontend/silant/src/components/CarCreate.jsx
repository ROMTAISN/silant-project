import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './css/CarCreate.css';


const CarCreate = () => {
    const [formData, setFormData] = useState({
        factory_number: '',
        model_technique: '',
        engine_model: '',
        engine_number: '',
        transmission_model: '',
        transmission_number: '',
        model_drive_bridge: '',
        number_drive_bridge: '',
        controlled_bridge_model: '',
        controlled_bridge_number: '',
        delivery_agreement: '',
        date_of_shipment: '',
        consignee: '',
        delivery_address: '',
        package_contents: '',
        client: '',
        service_company: ''

    });
    const [techniques, setTechniques] = useState([]);
    const [engines, setEngines] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [driveBridges, setDriveBridges] = useState([]);
    const [controlledBridges, setControlledBridges] = useState([]);
    const [clients, setClients] = useState([]);
    const [serviceCompanies, setServiceCompanies] = useState([]);

    const navigate = useNavigate();

    const [authToken, setAuthToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/technique/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setTechniques(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/engine/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setEngines(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/trasmission/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setTransmissions(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/drive_bridge/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setDriveBridges(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/api/cont_bridge/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setControlledBridges(response.data))
        .catch(error => console.log(error));

        axios.get('http://127.0.0.1:8000/client/', {
            headers: { Authorization: `Bearer ${authToken}` },
        })
        .then(response => setClients(response.data))
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

        axios.post('http://127.0.0.1:8000/cars/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        })
        .then(response => console.log('Car added: ', response.data))
        .catch(error => console.log('Mistake: ', error));
        navigate('/cars/')
    };

    return (
        <div className='create-container'>
            <h3>Добавить новую технику</h3>
            <form className='car-form' onSubmit={handleSubmit}>
                <label className='form-group'>
                    Заводской номер машины:
                    <input type='text' className='input-text' name='factory_number' value={formData.factory_number} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Модель техники:
                    <select className='select-items' name='model_technique' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {techniques.map(tech => <option key={tech.id} value={tech.id}>{tech.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Модель двигателя:
                    <select className='select-items' name='engine_model' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {engines.map(eng => <option key={eng.id} value={eng.id}>{eng.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Заводской номер двигателя:
                    <input type='text' className='input-text' name='engine_number' value={formData.engine_number} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Модель трансмиссии:
                    <select className='select-items' name='transmission_model' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {transmissions.map(trans => <option key={trans.id} value={trans.id}>{trans.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Заводской номер трансмиссии:
                    <input type='text' className='input-text' name='transmission_number' value={formData.transmission_number} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Модель ведущего моста:
                    <select className='select-items' name='model_drive_bridge' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {driveBridges.map(drive => <option key={drive.id} value={drive.id}>{drive.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Заводской номер ведущего моста:
                    <input type='text' className='input-text' name='number_drive_bridge' value={formData.number_drive_bridge} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Модель управляемого моста:
                    <select className='select-items' name='controlled_bridge_model' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {controlledBridges.map(control => <option key={control.id} value={control.id}>{control.name}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Заводской номер управляемого моста:
                    <input type='text' className='input-text' name='controlled_bridge_number' value={formData.controlled_bridge_number} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Договор поставки №, дата:
                    <input type='text' className='input-text' name='delivery_agreement' value={formData.delivery_agreement} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Дата отгрузки с завода:
                    <input type='date' className='input-text' name='date_of_shipment' value={formData.date_of_shipment} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Грузополучатель:
                    <input type='text' className='input-text' name='consignee' value={formData.consignee} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Адрес поставки, эксплуатации:
                    <input type='text' className='input-text' name='delivery_address' value={formData.delivery_address} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Комплектация:
                    <input type='text' className='input-text' name='package_contents' value={formData.package_contents} onChange={handleInputChange} required />
                </label>
                <label className='form-group'>
                    Клиент:
                    <select className='select-items' name='client' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {clients.map(cli => <option key={cli.id} value={cli.id}>{cli.username}</option>)}
                    </select>
                </label>
                <label className='form-group'>
                    Сервисная компания:
                    <select className='select-items' name='service_company' onChange={handleInputChange} required>
                        <option value="">---------</option>
                        {serviceCompanies.map(service => <option key={service.id} value={service.id}>{service.username}</option>)}
                    </select>
                </label>
                <Link className='back' to={`/cars`}>Отменить</Link> 
                <button className='create' type="submit">Добавить</button>
            </form>
                  
        </div>
    );
};

export default CarCreate;




/*<table className='infoCar' border='1'>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Описание</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Заводской номер машины</td>
                        <td>
                            <input type='text' name='factory_number' value={formData.factory_number} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель техники</td>
                        <td>
                            <select name='model_technique' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {techniques.map(tech => <option key={tech.id} value={tech.id}>{tech.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Модель двигателя</td>
                        <td>
                            <select name='engine_model' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {engines.map(eng => <option key={eng.id} value={eng.id}>{eng.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Номер двигателя</td>
                        <td>
                            <input type='text' name='engine_number' value={formData.engine_number} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель трансмиссии</td>
                        <td>
                            <select name='transmission_model' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {transmissions.map(trans => <option key={trans.id} value={trans.id}>{trans.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Номер трансмиссии</td>
                        <td>
                            <input type='text' name='transmission_number' value={formData.transmission_number} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель ведущего моста</td>
                        <td>
                            <select name='model_drive_bridge' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {driveBridges.map(drive => <option key={drive.id} value={drive.id}>{drive.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Номер ведущего моста</td>
                        <td>
                            <input type='text' name='number_drive_bridge' value={formData.number_drive_bridge} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Модель управляемого моста</td>
                        <td>
                            <select name='controlled_bridge_model' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {controlledBridges.map(control => <option key={control.id} value={control.id}>{control.name}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Номер управляемого моста</td>
                        <td>
                            <input type='text' name='controlled_bridge_number' value={formData.controlled_bridge_number} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Договор поставки: №, дата</td>
                        <td>
                            <input type='text' name='delivery_agreement' value={formData.delivery_agreement} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Дата отгрузки с завода</td>
                        <td>
                            <input type='date' name='date_of_shipment' value={formData.date_of_shipment} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Грузополучатель(конечный потребитель)</td>
                        <td>
                            <input type='text' name='consignee' value={formData.consignee} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Адрес поставки(зксплуатации)</td>
                        <td>
                            <input type='text' name='delivery_address' value={formData.delivery_address} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Комплектация(доп.опции)</td>
                        <td>
                            <input type='text' name='package_contents' value={formData.package_contents} onChange={handleInputChange} required />
                        </td>
                    </tr>
                    <tr>
                        <td>Клиент</td>
                        <td>
                            <select name='client' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {clients.map(cli => <option key={cli.id} value={cli.id}>{cli.username}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Сервисная компания</td>
                        <td>
                            <select name='service_company' onChange={handleInputChange} required>
                                <option value="">---------</option>
                                {serviceCompanies.map(service => <option key={service.id} value={service.id}>{service.username}</option>)}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>*/