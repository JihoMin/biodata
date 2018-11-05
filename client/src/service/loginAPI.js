import axios from 'axios'

// //const BASE_URL = process.env.BACKEND_URL
const BASE_URL = 'http://localhost:3000/'

// const getUserInfo = (uid, password) => {
//   return axios.get('/userinfo', {
//     params: {
//       'uid': uid,
//       'password': password
//     }
//   })
// }

// const reqLogin = (uid, password) => {
//   return axios.post(`${BASE_URL}login`, {uid, password})
// }
// const isFinished = uid => {
//   return axios.get('/is-finished', {
//     params: {
//       'uid': uid
//     }
//   })
// }

export default {
  async login ({email, password}) {
    try {
      const loginResponse = await axios.post(`${BASE_URL}login`, {email, password})
      // const getLoginInfo = await reqLogin(uid, password)
      // const getUserInfoPromise = await getUserInfo(uid, password)
      // const isFinishedPromise = await isFinished(uid) // Promise.all의 예시를 위해 집어넣음
      // const [userInfoResponse, isFinishedResponse] = await Promise.all([getUserInfoPromise, isFinishedPromise])
      if (loginResponse.data.length === 0) return 'noAuth' // 로그인 결과에 따른 분기 처리를 해준다
      // if (isFinishedResponse.data[0].CNT > 0) return 'done'
      // axios.defaults.headers.common['Authorization'] = userInfoResponse.jwt
      // return userInfoResponse
      return loginResponse
    } catch (err) {
      console.error('login API:', err)
      return 'noAuth'
    }
  }
}
