import * as axios from 'axios'

const BASE_URL = process.env.BACKEND_URL
console.log(BASE_URL)

function upload2 (formData) {
  const url = `${BASE_URL}single-file`
  return axios.post(url,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  ).then(function (res) {
    console.log('SUCCESS!!')
    console.log('res: ', res)
  }).catch(function (err) {
    console.log('FAILURE!!')
    console.log('post err: ', err)
  })
}

function getData () {
  const url = `${BASE_URL}HIGHBP`
  return axios.get(url)
}

export { upload2, getData }
