import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:5050/api/'
});

export default Api