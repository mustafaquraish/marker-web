import Vue from 'vue'
import Vuex from 'vuex'

import API from '@/lib/marker/API';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMobile: innerWidth <= 700,
    markerState: {
      loaded: false,
      valid: false,
      path: null,
      config: undefined,
      error: false,
    }
  },
  mutations: {
    updateMobile(state) {
      state.isMobile = innerWidth <= 700;
    },
    updateMarkerState(state, { data, error }) {
      state.markerState = data;
      console.log("Setting error to be", error);
      state.markerState['error'] = error;
      state.markerState['loaded'] = true;
    },
  },
  actions: {
    async fetchMarkerState({ commit }, func) {
      try {
        let data = await func();
        commit('updateMarkerState', {
          data, 
          'error': false
        });
      } catch (err) {
        console.log("caught error", err);
        commit('updateMarkerState', {
          'data': {}, 
          'error': true
        });
      } 
    }
  },
  modules: {
  }
})
