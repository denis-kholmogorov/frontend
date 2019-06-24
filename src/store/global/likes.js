import axios from 'axios'

export default {
  namespaced: true,
  actions: {
    async putLike({}, data) {
      await axios({
        url: 'likes',
        method: 'PUT',
        data
      }).then(response => {}).catch(error => {})
    },
    async deleteLike({}, data) {
      await axios({
        url: `likes?item_id=${data.item_id}&type=${data.type}`,
        method: 'DELETE',
        data
      }).then(response => {}).catch(error => {})
    }
  }
}
