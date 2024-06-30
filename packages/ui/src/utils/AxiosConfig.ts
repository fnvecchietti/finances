import axios from 'axios';
import { API_BASE_URL } from '../environent/api-config';

const api = axios.create({
  baseURL: API_BASE_URL, //replace with your BaseURL
  headers: {
    'Content-Type': 'application/json', // change according header type accordingly
  },
});

api.interceptors.request.use(
    (config)=> {
        const token = localStorage.getItem('token')
        if(token){
             config.headers.Authorization = `Bearer ${token}`
         }
        return config;
    },
    (error)=> {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
  (response)=> {
    return response
  },
  (error)=> {
    if(error.response.status === 401){
        localStorage.removeItem('token')
     }
    return Promise.reject(error)
  }
)

export default api;