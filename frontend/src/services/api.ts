import axios from 'axios';
import { storageKeys, storageService } from './storage.service';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = storageService.get(storageKeys.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storageService.remove(storageKeys.token);
      storageService.remove(storageKeys.user);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
