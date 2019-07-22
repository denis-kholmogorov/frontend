import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    info: null,
    wall: []
  },
  getters: {
    getInfo(state) {
      if (!state.info) return
      let result = {
        ...state.info
      }
      // если понадобиться то добавить склонение (для публикаций, но нужен или пол или отчество)
      // библиотека - petrovich
      result.fullName = result.first_name + ' ' + result.last_name
      result.ages = moment().diff(result.birth_date, 'years')
      result.is_onlined = moment().diff(moment(result.last_online_time), 'seconds') <= 60
      return result
    },
    getWall: s => s.wall,
    getWallPostedLength: s => s.wall.filter(el => el.type === 'POSTED').length,
    getWallQueuedLength: s => s.wall.filter(el => el.type === 'QUEUED').length,
  },
  mutations: {
    setInfo: (s, info) => s.info = info,
    setWall: (s, wall) => s.wall = wall,
    setWallById: (s, payload) => s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.id))] = payload.value,
    setCommentsById: (s, payload) => s.wall[s.wall.indexOf(s.wall.find(el => el.id === payload.id))].comments = payload.value
  },
  actions: {
    async apiInfo({
      commit
    }, id) {
      await axios({
        url: `users/${id}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: profile response", response)
        commit('setInfo', response.data.data)
      }).catch(error => {})
    },
    async apiWall({
      commit
    }, payload) {
      await axios({
        url: `users/${payload.id}/wall${payload.offset ? '?offset='+payload.offset : ''}${payload.itemPerPage ? '&itemPerPage='+payload.itemPerPage : ''}`,
        method: 'GET'
      }).then(response => {
        console.log("TCL: apiWall response", response.data.data)
        commit('setWall', response.data.data)
      }).catch(error => {})
    },
    async apiWallById({
      commit
    }, id) {
      await axios({
        url: `post/${id}`,
        method: 'GET'
      }).then(response => {
        commit('setWallById', {
          id,
          value: response.data.data
        })
      }).catch(error => {})
    },
    async apiCommentsById({
      commit
    }, id) {
      await axios({
        url: `post/${id}/comments`,
        method: 'GET'
      }).then(response => {
        commit('setCommentsById', response.data.data)
      }).catch(error => {})
    }
  }
}
