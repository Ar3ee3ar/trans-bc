import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
})

export const getHistory = () => api.get(`/history`)
export const getHistoryByID = std_id => api.get(`/history/${std_id}`)

const apis = {
    getHistory,
    getHistoryByID,
}

export default apis