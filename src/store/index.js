import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { aaa: 123 },

  getters: {
    aaa: state => state.aaa
  },

  mutations: {
    setData (state, data) {
      state.aaa = data
    }
  }
})
