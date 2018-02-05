import * as $ from '@/api/user'
import { Message } from 'element-ui'
import util from '@/util/util'

export default {
  state: {
    token: util.getCookie('token') || '',
    username: '',
    userInfo: '',
    gt: ''
  },
  mutations: {
    logout (state) {
      state.userInfo = ''
      state.token = ''
      util.delCookie('token')
    },
    changePhone (state, payload) {
      state.userInfo.Phone = payload
    },
    changeEmail (state, payload) {
      state.userInfo.Email = payload
    },
    changeState (state, payload) {
      state.userInfo.State = payload
    }
  },

  actions: {
    async login (context, req) {
      const response = await $.login(req).catch((error) => {
        console.log(error)
      })
      let token
      response ? token = response.data.data : token = ''
      req.checked && token ? util.setCookie('token', token, 7) : util.setCookie('token', token)
      context.state.token = token
      await context.dispatch('getUserInfo')
      return response
    },

    async register (context, req) {
      const response = await $.register(JSON.stringify(req)).catch((error) => {
        console.log(error)
      })
      response ? Message.success('注册成功') : context.commit('clearVcode')
      return response
    },

    async getVcode (context) {
      await $.getVcode({t: (new Date()).getTime()}).then((response) => {
        context.state.gt = response.data
      }).catch((error) => {
        console.log(error)
      })
    },

    async getUserInfo (context) {
      await $.getUserInfo({token: context.state.token}).then((response) => {
        context.state.userInfo = response.data.data
        util.setCookie('username', response.data.data.UserName, 7)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
