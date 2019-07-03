import axios from 'axios'

export default {
  namespaced: true,
  actions: {
    async putLike({}, data) {
      await axios({
        url: 'likes',
        method: 'PUT',
        data
      }).then(response => {
        data.type === 'Post' ? dispatch('users/info/apiWallById', data.item_id, {
          root: true
        }) : dispatch('users/info/apiCommentsById', data.post_id, {
          root: true
        })
      }).catch(error => {})
    },
    async deleteLike({
      dispatch
    }, data) {
      await axios({
        url: `likes?item_id=${data.item_id}&type=${data.type}`,
        method: 'DELETE',
        data
      }).then(response => {
        data.type === 'Post' ? dispatch('users/info/apiWallById', data.item_id, {
          root: true
        }) : dispatch('users/info/apiCommentsById', data.post_id, {
          root: true
        })
      }).catch(error => {})
    }
  }
}
