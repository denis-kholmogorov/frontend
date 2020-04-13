import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    result: {
      dialogs: [],
      unreadedMessages: 0,
      messages: []
    },
    dialogsLoaded: false,
    activeId: null,
    isSubscribed: false
  },
  getters: {
    getResult: s => s.result,
    getResultById: s => id => s.result[id],
    dialogs: s => s.result.dialogs,
    activeDialog: s => s.result.dialogs.find(el => el.id == s.activeId),
    activeDialogId: s => s.activeId,
    dialogsLoaded: s => s.dialogsLoaded,
    hasOpenedDialog: s => dialogId => !!s.result.dialogs.find(el => el.id == dialogId),
    getMessages(state) {
      const groups = state.result.messages.reduce((groups, mes) => {
        const date = moment(mes.time).format().split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(mes)
        return groups
      }, {})

      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date: moment(date).valueOf(),
          messages: groups[date]
        }
      });

      return groupArrays
    }
  },
  mutations: {
    setResult: (s, result) => s.result[result.id] = result.value,
    selectDialog: (state, dialogId) => state.activeId = dialogId,
  },
  actions: {
    closeDialog({ commit }) {
      commit('selectDialog', null);
    },

    async switchDialog({ state, getters, commit, dispatch }, dialogId) {
        if (!state.dialogsLoaded) {
          await dispatch('apiDialogs')
        }
        if (getters.hasOpenedDialog(dialogId)) {
          commit('selectDialog', dialogId)
          await dispatch('dialogsMessages', dialogId)
        } else {
          await dispatch('apiNewDialog')
        }
    },

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
        commit('setResult', {
          id: 'messages',
          value: response.data.data
        })
      }).catch(error => {})
    },
    async postMessage({
      dispatch
    }, payload) {
      await axios({
        url: `dialogs/${payload.id}/messages`,
        method: 'POST',
        data: {
          message_text: payload.message_text
        }
      }).then(response => {
        dispatch('dialogsMessages', payload.id)
      }).catch(error => {})
    },
    async apiUnreadedMessages({
      commit
    }) {
      await axios({
        url: 'dialogs/unreaded',
        method: 'GET'
      }).then(response => {
        commit('setResult', {
          id: 'unreadedMessages',
          value: response.data.data.count
        })
      }).catch(error => {})
    }
  }
}
