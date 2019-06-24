import axios from 'axios'

export default {
  namespaced: true,
  state: {
    result: {
      dialogs: [],
      unreadedMessages: 0,
      messages: []
    }
  },
  getters: {
    getResult: s => s.result,
    getResultById: s => id => s.result[id],
  },
  mutations: {
    setResult: (s, result) => s.result[result.id] = result.value
  },
  actions: {
    async apiDialogs({
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `dialogs?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: apiDialogs -> response", response)
        commit('setResult', {
          id: 'dialogs',
          value: response.data.data
        })
      }).catch(error => {})
    },
    async apiNewDialog({
      dispatch
    }, id) {
      await axios({
        url: 'dialogs',
        method: 'POST',
        data: {
          users_ids: [id]
        }
      }).then(response => {
        console.log("TCL: apiNewDialog -> response", response)
        dispatch('apiDialogs')
      }).catch(error => {})
    },
    async dialogsMessages({
      commit
    }, id) {
      await axios({
        url: `dialogs/${id}/messages`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: dialogsMessages -> response", response)
        commit('setResult', {
          id: 'messages',
          value: response.data.data
        })
      }).catch(error => {})
    },
    async postMessages({
      dispatch
    }, payload) {
      await axios({
        url: `dialogs/${payload.id}/messages`,
        method: 'POST',
        data: {
          message_text: payload.text
        }
      }).then(response => {
        console.log("TCL: dialogsMessages -> response", response)
        dispatch('dialogsMessages', id)
      }).catch(error => {})
    },
    async apiUnreadedMessages({
      commit
    }) {
      await axios({
        url: 'dialogs/unreaded',
        method: 'GET'
      }).then(response => {
        console.log("TCL: apiUnreadedMessages -> response", response)
        commit('setResult', {
          id: 'unreadedMessages',
          value: response.data.data.count
        })
      }).catch(error => {})
    }
  }
}
