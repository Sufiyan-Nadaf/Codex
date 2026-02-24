import http from '../../api/http';

export const fetchInvoices = async () => (await http.get('/invoices')).data;
export const createInvoiceApi = async (payload) => (await http.post('/invoices', payload)).data;
