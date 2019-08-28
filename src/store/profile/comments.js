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
          comment_text: payload.text
        }
      }).then(() => {
        dispatch('commentsById', {
          post_id: payload.post_id
        })
      }).catch(() => {})
    },
    async editComment({
      dispatch
    }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments/${payload.id}`,
        method: 'PUT',
        data: {
          comment_text: payload.text
        }
      }).then(() => {
        dispatch('commentsById', {
          post_id: payload.post_id
        })
      }).catch(() => {})
    },
    async deleteComment({
      dispatch
    }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments/${payload.id}`,
        method: 'Delete'
      }).then(() => {
        dispatch('commentsById', {
          post_id: payload.post_id
        })
      }).catch(() => {})
    },
    async recoverComment({
      dispatch
    }, payload) {
      await axios({
        url: `post/${payload.post_id}/comments/${payload.id}/recover`,
        method: 'Delete'
      }).then(() => {
        dispatch('commentsById', {
          post_id: payload.post_id
        })
      }).catch(() => {})
    },
    async commentActions({
      dispatch
    }, payload) {
      payload.edit 
        ? await dispatch('editComment', payload) 
        : await dispatch('newComment', payload)
    }
  }
}
