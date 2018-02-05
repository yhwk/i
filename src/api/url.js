import axios from 'axios'
import { Message } from 'element-ui'

const api = {
  baseUrl: '/api',
  // baseUrl: '/v1/',
  login: '/login',
  register: '/register',
  getVcode: 'http://test.zhifangw.cn:9990/vcode.img',
  getUserInfo: 'user/info',
  sendsms: '/sendsms',
  findPassword: '/findpassword',
  setPayPassword: '/user/setpaypassword',
  changePhoneOrEmailStep1: '/user/change/phoneoremail/step1',
  changePhoneOrEmailStep2: '/user/change/phoneoremail/step2',
  authentication: '/user/authentication'
}

const config = function () {
  axios.defaults.baseURL = api.baseUrl
  // token ? axios.defaults.headers.common['token'] = token : token = null
  axios.defaults.headers.common['module'] = 1
  axios.interceptors.response.use(function (response) {
    if (response.data.code === 0 || !response.data.code) {
      return response
    } else if (response.data.code === 10036) {
      window.location.href = '/login'
    } else {
      Message.error(response.data.errmsg)
      throw response.data.errmsg
    }
  })
  return axios
}

export { api, config }
