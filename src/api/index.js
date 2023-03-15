import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
})

export const getAllExam = () => api.get(`/history`)
export const getExamByMethod = std_id => api.get(`/history/${std_id}`)

const apis = {
    getAllExam,
    getExamByMethod,
}

export default apis