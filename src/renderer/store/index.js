import Vue from 'vue'
import Vuex from 'vuex'

import types from './types'

const state = {
  activeValue: '',
  activeKey: ''
}

const mutations = {
  [types.SET_ACTIVE_KEY] (state, key) {
    state.activeKey = key
  },
  [types.SET_ACTIVE_VALUE] (state, value) {
    state.activeValue = value
  }
}

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
