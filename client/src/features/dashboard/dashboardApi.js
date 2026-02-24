import http from '../../api/http';

export const fetchDashboard = async () => (await http.get('/dashboard')).data;
