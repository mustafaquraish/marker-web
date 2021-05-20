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
    },

    needAuth: false,

    tokenDialog: false,

    errorDialog: false,
    errorMessage: "Unknown error occurred.",
    errorTitle: "Error",

    snackBar: false,
    snackMessage: "Unknown Error",
  },

  mutations: {
    updateMobile(state) {
      state.isMobile = innerWidth <= 700;
    },
    setNeedAuth(state, bool) {
      state.needAuth = bool;
    },
    setMarkerStateLoaded(state, bool) {
      state.markerState['loaded'] = bool;
    },
    updateMarkerState(state, { data, error }) {
      state.markerState = data;
      state.markerState['error'] = error;
      state.markerState['loaded'] = true;
    },
    setTokenDialog(state, bool) { state.tokenDialog = bool;},

    setErrorDialog(state, bool) { state.errorDialog = bool;},
    setErrorMessage(state, text) { state.errorMessage = text;},
    setErrorTitle(state, text) { state.errorTitle = text;},

    setSnackBar(state, bool) { state.snackBar = bool; },
    setSnackMessage(state, text) { state.snackMessage = text;},
  },
  actions: {
    async showSnackBar({ commit }, text="Unknown Error") {
      let timeout = 0
      if (this.state.snackBar) {
        commit('setSnackBar', false)
        timeout = 100;
      }
      commit('setSnackMessage', text)
      setTimeout(() => {
        commit('setSnackBar', true)
      }, timeout)
    },
    async showErrorDialog({ commit }, info) {
      let message = info.message;
      let title = info.title || "Error";
      commit('setErrorMessage', message)
      commit('setErrorTitle', title)
      commit('setErrorDialog', true)
    },
    async fetchMarkerState({ commit }, func) {
      console.log("fetching.....")
      try {
        let data = await func();
        console.log("Git...", data)
        commit('updateMarkerState', {
            data, 
            'error': false
          });
      } catch (err) {
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
