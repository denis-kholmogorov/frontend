import axios from 'axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    info: null,
    wall: {
      published: [],
      queue: []
    }
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
      return result
    },
    getWall: s => s.wall
  },
  mutations: {
    setInfo: (s, info) => s.info = info,
    setWall: (s, value) => s.wall[value.queue ? 'queue' : 'published'] = value.wall,
    setCommentsById: (s, payload) => {
      console.log('set comments payload', payload)
    }
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
        url: `users/${payload.id}/wall?queue=${payload.queue}&offset=${payload.offset}&itemPerPage=${payload.itemPerPage}`,
        method: 'GET'
      }).then(response => {
        commit('setWall', {
          wall: response.data.data,
          queue: payload.queue
        })
      }).catch(error => {})
    }
  }
}
