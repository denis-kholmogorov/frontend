import axios from 'axios'
import store from '@/store'


axios.defaults.headers['content-type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://46.247.128.163:8084/api/v1/'

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
