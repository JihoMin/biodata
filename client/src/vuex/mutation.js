import * as types from './mutation_type'

export default {
  [types.UID] (state, uid) {
    state.uid = uid
  },
  [types.ERROR_STATE] (state, errorState) {
    state.errorState = errorState
  },
  [types.IS_AUTH] (state, isAuth) {
    state.isAuth = isAuth
  },
  [types.ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken
  }
}
