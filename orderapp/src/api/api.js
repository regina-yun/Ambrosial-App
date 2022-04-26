import axios from 'axios';

const API = axios.create({
    baseURL:"https://my-json-server.typicode.com/Sarah-Specialist/menu-api",
});

export default API;