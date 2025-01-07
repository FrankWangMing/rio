
import axios, { AxiosInstance } from 'axios'

const http:AxiosInstance = axios.create({
    baseURL: ' http://localhost:3000/',
    timeout: 1000,

});

http.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        // return Promise.reject(error);
    }
);

export default http;

