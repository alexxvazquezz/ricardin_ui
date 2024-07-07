import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true // Include cookies with every request
});

export default instance;