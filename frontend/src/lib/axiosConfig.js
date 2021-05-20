import axios from 'axios';

axios.interceptors.request.use(config => {
    config.params = {...config.params, auth: $cookies.get('auth')}
    return config;
})

export default axios;