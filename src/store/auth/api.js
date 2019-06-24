import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    status: ''
  },
  getters: {
    apiToken: s => s.token,
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  },
  mutations: {
    setToken: (s, token) => s.token = token,
    setStatus: (s, status) => s.status = status
  },
  actions: {
    async register({
      dispatch
    }, user) {
      await axios({
        url: 'account/register',
        data: user,
        method: 'POST'
      }).then(async response => {
        await dispatch('login', {
          email: user.email,
          password: user.passwd1
        })
      }).catch(error => {})
    },
    async login({
      commit
    }, user) {
      commit('setStatus', 'loading')
      await axios({
        url: 'auth/login',
        data: user,
        method: 'POST'
      }).then(response => {
        const token = response.data.data.token
        localStorage.setItem('user-token', token)
        axios.defaults.headers.common['Authorization'] = token
        commit('setToken', token)
        commit('setStatus', 'success')
        commit('profile/info/setInfo', response.data.data, {
          root: true
        })
      }).catch(error => {
        commit('setStatus', 'error')
        localStorage.removeItem('user-token')
      })
    },
    async logout({
      commit
    }) {
      await axios({
        url: 'auth/logout',
        method: 'POST'
      }).then(() => {
        commit('setToken', '')
        commit('setStatus', 'logout')
        localStorage.removeItem('user-token')
        delete axios.defaults.headers.common['Authorization']
      }).catch(error => {})
    }
  }
}
