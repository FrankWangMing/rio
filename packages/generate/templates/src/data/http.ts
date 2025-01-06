
import axios, { AxiosInstance } from 'axios'

const http:AxiosInstance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

http.interceptors.response.use(
    (response: any)=>{
        return response;
    },
    (error: any)=>{
        return Promise.reject(error);
    }
);

export default http;

