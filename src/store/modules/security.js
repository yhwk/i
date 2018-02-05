import * as $ from '@/api/security'

export default {
  name: 'security',
  state: {
    step1: ''
  },
  getters: {

  },
  actions: {
    async findPassword (context, req) {
      const response = await $.findPassword(req, {token: context.rootState.user.token})
      return response
    },
    async setPayPassword (context, req) {
      const response = await $.setPayPassword(req, {token: context.rootState.user.token}).catch((error) => {
        console.log(error)
      })
      response ? context.rootState.userInfo.PayPassword = req.newpassword : context.rootState.userInfo.PayPassword = ''
      return response
    },
    async changePhoneOrEmailStep1 (context, req) {
      await $.changePhoneOrEmailStep1(req, {token: context.rootState.user.token}).then((response) => {
        context.state.step1 = response.data.data
      }).catch((error) => {
        console.log(error)
      })
    },
    async changePhoneOrEmailStep2 (context, req) {
      const response = await $.changePhoneOrEmailStep2({ ...req, step1: context.state.step1 }, {token: context.rootState.user.token}).catch((error) => {
        console.log(error)
      })
      return response
    },
    async authentication (context, req) {
      const response = await $.authentication(req, {token: context.rootState.user.token}).catch((error) => {
        console.log(error)
      })
      return response
    }
  }
}
