import axios from 'axios'

export default {
  namespaced: true,
  state: {
    feeds: []
  },
  getters: {
    getFeeds: s => s.feeds
  },
  mutations: {
    setFeeds: (s, feeds) => s.feeds = feeds,
    setCommentsById: (s, payload) => {
      console.log('set comments payload', payload)
    }
  },
  actions: {
    async apiFeeds({
      commit
    }, payload) {
      let query = []
      payload && Object.keys(payload).map(el => {
        payload[el] && query.push(`${el}=${payload[el]}`)
      })
      await axios({
        url: `feeds?${query.join('&')}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: apiFeeds -> response", response)
        commit('setFeeds', response.data.data)
      }).catch(() => {})
    },
    async newFeed({
      dispatch
    }, payload) {
      await axios({
        url: `users/${payload.id}/wall${payload.publish_date && '?publish_date='+payload.publish_date}`,
        method: 'POST',
        data: {
          title: payload.title,
          post_text: payload.text
        }
      }).then(response => {
        console.log("TCL: newFeed -> response", response)
        payload.route === 'News' ?
          dispatch('apiFeeds') :
          dispatch('users/info/apiWall', {
            id: payload.id
          }, {
            root: true
          })
      }).catch(() => {})
    }
  }
}
