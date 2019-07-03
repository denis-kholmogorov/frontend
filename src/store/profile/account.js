import axios from 'axios'

export default {
  namespaced: true,
  state: {
    staticInfo: [{
        icon: 'comments',
        name: 'О новых комментариях к моим публикациям',
        type: 'POST_COMMENT'
      },
      {
        icon: 'reviews',
        name: 'О ответах на мои комментарии',
        type: 'COMMENT_COMMENT'
      },
      {
        icon: 'friends',
        name: 'О заявках в дузья',
        type: 'FRIEND_REQUEST'
      },
      {
        icon: 'messages',
        name: 'О новых личных сообщениях',
        type: 'MESSAGE'
      },
      {
        icon: 'birthdays',
        name: 'О дне рождения друга',
        type: 'FRIEND_BIRTHDAY'
      }
    ],
    notifications: []
  },
  getters: {
    getNotificationsSettings: s => s.staticInfo.map(item => Object.assign({}, item, s.notifications.find(el => el.type === item.type)))
  },
  mutations: {
    setNotificationsSettings: (s, notifications) => s.notifications = notifications
  },
  actions: {
    async passwordRecovery({}, email) {
      await axios({
        url: 'account/password/recovery',
        method: 'PUT',
        data: email
      }).then(response => {}).catch(error => {})
    },
    async passwordSet({
      rootState
    }, password) {
      let data = {
        token: rootState.auth.api.token,
        password
      }
      await axios({
        url: 'account/password/set',
        method: 'PUT',
        data
      }).then(response => {}).catch(error => {})
    },
    async changeEmail({}, email) {
      await axios({
        url: 'account/email',
        method: 'PUT',
        data: email
      }).then(response => {}).catch(error => {})
    },
    changeNotifications({
      dispatch
    }, data) {
      axios({
        url: 'account/notifications',
        method: 'PUT',
        data
      }).then(response => {
        dispatch('global/alert/setAlert', {
          status: 'success',
          text: 'Настройки уведомления изменены'
        }, {
          root: true
        })
        dispatch('apiNotificationsSettings')
      }).catch(error => {})
    },
    async apiNotificationsSettings({
      commit
    }) {
      await axios({
        url: 'account/notifications',
        method: 'GET'
      }).then(response => {
        commit('setNotificationsSettings', response.data.data)
      }).catch(error => {})
    }
  }
}
