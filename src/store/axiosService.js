import axios from 'axios';

const serviceBaseUrl = 'https://jsonplaceholder.typicode.com/';

const axiosService = axios.create({
    baseURL: serviceBaseUrl,
});

export default axiosService;
