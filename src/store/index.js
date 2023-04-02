import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    time_range: [1672416053, 1680058253]
  },
  mutations: {
    setTimeRange (state, payload) {
      state.time_range = payload.ranges
    }
  },
  actions: {
  },
  modules: {
  }
})
