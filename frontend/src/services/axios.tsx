import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.token}`
    config.headers['Content-Type'] = 'application/json';
    return config
})

export default axios