import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const fetchCars = async () => {
    const response = await api.get('/car');
    return response.data
};

export const fetchCarById = async (id) => {
    const response = await api.get(`/car/${id}`);
    return response.data;
};

export const fetchTOId = async (id) => {
    const response = await api.get(`/to/${id}`);
    return response.data;
};

export const fetchComplaintId = async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
};

export const technique = () => api.get(`/technique/`)

export const createCar = (carData) => api.post('/car/', carData);
export const updateCar = (carId, carData) => api.put(`/car/${carId}/`, carData);

export default api;