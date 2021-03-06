import axios from 'axios';
import configs from './config';
/* token */
import { getToken } from '../utility/storage'
// Add a request interceptor 
export default axiosInstance = axios.create({
    baseURL: configs.AUTH_CONFIG.domain,
});

axiosInstance.interceptors.request.use(async config => {

    // config.headers['Content-Type'] = 'application/json';
    let auth = await getToken();
    // auth = JSON.parse(auth);
    // console.log(auth);
    if (auth) {
        config.headers.authorization = `Bearer ${auth}`;
        return config;
    }
    return config;
}, error => {
    
    return Promise.reject(error);
});