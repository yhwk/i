import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import security from './modules/security'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    common: common,
    security: security
  }
})

export default store
