import axios from 'axios'
import store from '@/store'

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const IS_DEV = NODE_ENV === 'development';

axios.defaults.headers['content-type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL =  IS_DEV
  ? 'http://localhost:8086/api/v1/'
  : 'https://virtserver.swaggerhub.com/andrewleykin/social/1.0.4/api/v1/';

const token = localStorage.getItem('user-token')
if (token) axios.defaults.headers.common['Authorization'] = token

axios.interceptors.response.use(null, error => {
  // добавить проверку на законченный токен и сделать выход из приложения
  // store.dispatch('auth/api/logout')
  store.dispatch('global/alert/setAlert', {
    status: 'error',
    text: error.response.statusText
  })
  console.error(error)
  return Promise.reject(error)
});
