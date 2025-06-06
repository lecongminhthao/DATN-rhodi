import axios from 'axios';

// Tạo một instance axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
});

// Thêm interceptor để tự động gắn token vào header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;