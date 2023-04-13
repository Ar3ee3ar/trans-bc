import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
})

export const getHistory = () => api.get(`/history`);
export const getHistoryByID = std_id => api.get(`/history/${std_id}`);
export const updateHistory = (std_id,body) => api.put(`/update_history/${std_id}`,body);

export const getAccountByID = std_id => api.get(`/acc/${std_id}`);

export const getProofByID = std_id => api.get(`/proof/${std_id}`);
export const updateProof = (std_id,body) => api.put(`/proof/${std_id}`,body);
export const createProof = body => api.post(`/proof`,body);

const apis = {
    getHistory,
    getHistoryByID,
    updateHistory,
    getAccountByID,
    getProofByID,
    updateProof,
    createProof
}

export default apis