import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: innerWidth <= 700,
    marksList: [],
  },
  mutations: {
    updateMobile(state) {
      state.isMobile = innerWidth <= 700;
    },
    updateMarksList(state, newList) {
      state.marksList = newList;
    }
  },
  actions: {
  },
  modules: {
  }
})
