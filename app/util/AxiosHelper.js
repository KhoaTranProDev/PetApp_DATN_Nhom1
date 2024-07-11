import axios from "axios";


// const API_URL = 'https://apipetapp.onrender.com';
const API_URL = 'http://192.168.2.209:3000/';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  });

const AxiosHelper = {
    get: (endpoint, config = {}) => instance.get(endpoint, config),
    post: (endpoint, data, config = {}) => instance.post(endpoint, data, config),
    put: (endpoint, data, config = {}) => instance.put(endpoint, data, config),
    delete: (endpoint, config = {}) => instance.delete(endpoint, config),
}

export default AxiosHelper