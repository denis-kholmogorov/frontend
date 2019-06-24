import axios from 'axios'

export default {
  namespaced: true,
  actions: {
    async apiBlockUser({}, id) {
      await axios({
        url: `users/block/${id}`,
        method: 'PUT'
      }).then(response => {
        console.log("TCL: apiBlockUser -> response", response)
      }).catch(error => {})
    },
    async apiUnblockUser({}, id) {
      await axios({
        url: `users/block/${id}`,
        method: 'DELETE'
      }).then(response => {
        console.log("TCL: apiUnblockUser -> response", response)
      }).catch(error => {})
    }
  }
}
