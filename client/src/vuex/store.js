// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutation'

import axios from 'axios'

Vue.use(Vuex)

const enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  console.log({accessToken})
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  console.log(localStorage.UID)
  this.uid = localStorage.UID
  console.log(this.uid)
  this.isAuth = localStorage.isAuth
  this.accessToken = localStorage.accessToken
}

enhanceAccessToeken()

const state = {
  uid: localStorage.UID,
  errorState: '',
  isAuth: localStorage.isAuth,
  accessToken: localStorage.accessToken
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
