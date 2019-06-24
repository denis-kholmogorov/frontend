import axios from 'axios'

export default {
  namespaced: true,
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
    changeNotifications({}, data) {
      axios({
        url: 'account/notifications',
        method: 'PUT',
        data
      }).then(response => {
        console.log("TCL: changeNotifications -> response", response)
      }).catch(error => {})
    },
    changeStatus({}, status) {
      axios({
        url: 'account/status',
        method: 'PUT',
        data: status
      }).then(response => {
        console.log("TCL: changeNotifications -> response", response)
      }).catch(error => {})
    }
  }
}
