import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    info: null
  },
  getters: {
    getInfo(state) {
      if (!state.info) return
      let result = {
        ...state.info
      }
      result.fullName = result.first_name + ' ' + result.last_name
      result.ages = moment().diff(result.birth_date, 'years')
      return result
    }
  },
  mutations: {
    setInfo: (s, info) => s.info = info
  },
  actions: {
    async apiInfo({
      commit,
      dispatch
    }) {
      await axios({
        url: 'users/me',
        method: 'GET'
      }).then(async response => {
        console.log("TCL: profile apiInfo -> response", response.data.data)
        await dispatch('users/info/apiWall', {
          id: response.data.data.id
        }, {
          root: true
        })
        commit('setInfo', response.data.data)
      }).catch(error => {})
    },
    async apiChangeInfo({
      commit
    }, user) {
      await axios({
        url: 'users/me',
        method: 'PUT',
        data: user
      }).then(response => {
        console.log("TCL: apiChangeInfo -> response", response)
        commit('setInfo', response.data.data)
      }).catch(error => {})
    },
    async deleteInfo() {
      await axios({
        url: 'users/me',
        method: 'DELETE'
      }).then(response => {}).catch(error => {})
    },
    async apiAddPost({
      state
    }, date) {
      let dateUrl = date ? `?publish_date=${date}` : ''
      await axios({
        url: `users/${state.info.id}/wall${dateUrl}`,
        method: 'PUT'
      }).then(response => {
        console.log("TCL: apiAddToWall -> response", response)
      }).catch(error => {})
    }
  }
}
