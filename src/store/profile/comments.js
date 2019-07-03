import axios from 'axios'
import router from '@/router'

export default {
  namespaced: true,
  actions: {
    async commentsById({
      commit
    }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments`,
        method: 'GET'
      }).then(response => {
        let dataComments = {
          post_id: payload.post_id,
          value: response.data.data
        }
        router.history.current.name === 'News' ?
          commit('profile/feeds/setCommentsById', dataComments, {
            root: true
          }) :
          commit('users/info/setCommentsById', dataComments, {
            root: true
          })
      }).catch(() => {})
    },
    async newComment({
      dispatch
    }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments`,
        method: 'POST',
        data: {
          parent_id: payload.parent_id || null,
          comment_text: payload.comment_text
        }
      }).then(() => {
        dispatch('commentsById', {
          post_id: payload.post_id
        })
      }).catch(() => {})
    }
  }
}
