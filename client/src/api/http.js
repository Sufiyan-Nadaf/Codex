import axios from 'axios';
import { useAuthStore } from '../app/store';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

http.interceptors.request.use((config) => {
  const { accessToken, businessId } = useAuthStore.getState();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  if (businessId) config.headers['x-business-id'] = businessId;
  return config;
});

export default http;
