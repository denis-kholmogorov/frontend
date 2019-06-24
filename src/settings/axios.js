import axios from 'axios'
import store from '@/store'


axios.defaults.headers['content-type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://virtserver.swaggerhub.com/andrewleykin/social/1.0.0/api/v1/'

const token = localStorage.getItem('user-token')
if (token) axios.defaults.headers.common['Authorization'] = token

axios.interceptors.response.use(null, error => {
  // добавить проверку на законченный токен и сделать выход из приложения
  // store.dispatch('auth/api/logout')
  console.log(error)
  return Promise.reject(error)
});
