import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/view/Dashboard'
import Index from '@/view/index/Index'
import Account from '@/view/index/Account'
import store from '@/store/index'

const Login = () => import('@/view/user/Login')
const RegisterChoice = () => import('@/view/user/Register_choice')
const Register = () => import('@/view/user/Register')

const ChangePhoneByPhone = () => import('@/view/security/changePhone/phone')
const ChangePhoneByEmail = () => import('@/view/security/changePhone/email')
const ChangeEmailByPhone = () => import('@/view/security/changeEmail/phone')
const SetEmail = () => import('@/view/security/changeEmail/set')
const ChangePasswordByPhone = () => import('@/view/security/changePassword/phone')
const ChangePasswordByEmail = () => import('@/view/security/changePassword/email')
const SetPayPassword = () => import('@/view/security/changePayPassword/set')
const ChangePayPasswordByPhone = () => import('@/view/security/changePayPassword/phone')
const ChangePayPasswordByEmail = () => import('@/view/security/changePayPassword/email')
const Auth = () => import('@/view/security/authentication/auth')
const AuthPerson = () => import('@/view/security/authentication/person')
const AuthEnterprise = () => import('@/view/security/authentication/enterprise')
const AuthCheck = () => import('@/view/security/authentication/check')
const ForgetPassword = () => import('@/view/security/forgetPassword/phone')

const Widget = () => import('@/view/index/Widget')

Vue.use(Router)

const router = new Router({
  base: __dirname,
  routes: [
    {
      path: '',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: '/',
          name: 'i',
          redirect: '/index',
          component: Index,
          beforeEnter: (to, from, next) => {
            if (store.state.user.token) {
              store.state.user.userInfo ? next() : store.dispatch('getUserInfo').then(() => next())
            } else {
              next('/login')
            }
          },
          children: [
            {
              path: 'index',
              name: 'index',
              component: Account
            }, {
              path: '/security/changePhone/phone',
              name: 'changePhoneByPhone',
              component: ChangePhoneByPhone
            }, {
              path: '/security/changePhone/email',
              name: 'changePhoneByEmail',
              component: ChangePhoneByEmail
            }, {
              path: '/security/changeEmail',
              name: 'changeEmailByPhone',
              component: ChangeEmailByPhone
            }, {
              path: '/security/changeEmail/set',
              name: 'setEmail',
              component: SetEmail
            }, {
              path: '/security/changePassword/phone',
              name: 'changePasswordByPhone',
              component: ChangePasswordByPhone
            }, {
              path: '/security/changePassword/email',
              name: 'changePasswordByEmail',
              component: ChangePasswordByEmail
            }, {
              path: '/security/paypassword/set',
              name: 'setPayPassword',
              component: SetPayPassword
            }, {
              path: '/security/paypassword/phone',
              name: 'changePayPasswordByPhone',
              component: ChangePayPasswordByPhone
            }, {
              path: '/security/paypassword/email',
              name: 'changePayPasswordByEmail',
              component: ChangePayPasswordByEmail
            }, {
              path: '/security/authentication',
              name: 'authentication',
              component: Auth
            }, {
              path: '/security/authentication/person',
              name: 'authPerson',
              component: AuthPerson
            }, {
              path: '/security/authentication/enterprise',
              name: 'authEnterprise',
              component: AuthEnterprise
            }, {
              path: '/security/authentication/check',
              name: 'authCheck',
              component: AuthCheck
            }
          ]
        }, {
          path: 'login',
          name: 'login',
          component: Login
        }, {
          path: 'register',
          name: 'register_choice',
          component: RegisterChoice
        }, {
          path: 'register/:type',
          name: 'register',
          component: Register
        }, {
          path: 'widget',
          name: 'widget',
          component: Widget
        }, {
          path: 'forget',
          name: 'forgetPassword',
          component: ForgetPassword
        }
      ]
    }
  ]
})

export default router
