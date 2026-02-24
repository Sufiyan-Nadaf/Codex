import http from '../../api/http';

export const fetchBusinesses = async () => (await http.get('/businesses')).data;
