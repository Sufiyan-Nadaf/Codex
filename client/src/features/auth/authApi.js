import http from '../../api/http';

export const loginApi = async (payload) => (await http.post('/auth/login', payload)).data;
export const registerApi = async (payload) => (await http.post('/auth/register', payload)).data;
