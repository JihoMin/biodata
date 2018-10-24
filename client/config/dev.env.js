'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const APP_URL = 'http://localhost:8080/'

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: '"http://ubuntu@ec2-13-209-66-210.ap-northeast-2.compute.amazonaws.com:80/"',
})
