import {UID, IS_AUTH, ERROR_STATE, ACCESS_TOKEN} from './mutation_type'
import axios from 'axios'
// import api from '../service'
// const BASE_URL = 'http://localhost:80/'
const BASE_URL = process.env.BACKEND_URL

let setUID = ({commit}, data) => {
  console.log('ff')
  commit(UID, data)
  localStorage.UID = data
}

let setErrorState = ({commit}, data) => {
  commit(ERROR_STATE, data)
}

let setIsAuth = ({commit}, data) => {
  console.log('d', UID)
  commit(IS_AUTH, data)
  localStorage.isAuth = data
}

let setAccessToken = ({commit}, data) => {
  commit(ACCESS_TOKEN, data)
  localStorage.accessToken = data
}

// let processResponse = (store, loginResponse, email) => {
//   let accessToken = loginResponse.data.accessToken
//   setUID(store, email)
//   setErrorState(store, '')
//   setIsAuth(store, true)
//   setAccessToken(store, accessToken)
//   axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
//   // localStorage.accessToken = accessToken
//   // localStorage.isAuth = true
//   // localStorage.UID = email
//   console.log(accessToken)
// }

export default {
  async login (store, {email, password}) {
    console.log('action: ', {email, password})
    console.log(email)
    try {
      const loginResponse = await axios.post(`${BASE_URL}login`, {email, password})
      console.log(loginResponse)
      console.log(email)
      // await processResponse(store, loginResponse, email)
      let accessToken = loginResponse.data.accessToken
      await setUID(store, email)
      await setErrorState(store, '')
      await setIsAuth(store, true)
      await setAccessToken(store, accessToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      return store.getters.getIsAuth
    } catch (err) {
      setErrorState(store, 'Wrong ID or Password')
      console.log('action login: ', err)
      console.log(store.getters.getErrorState)
      return store.getters.getIsAuth
    }
  },
  async logout (store) {
    await setAccessToken(store, '')
    await setUID(store, '')
    await setIsAuth(store, false)
    console.log('logout, isAuth: ', localStorage.isAuth)
  }
}
