import * as $ from '@/api/common'

const valid = {
  validateType: (rule, value, callback) => {
    if (!value.match(/^[A-Za-z0-9]+$/)) {
      callback(new Error('请输入数字和字母的组合'))
    } else {
      callback()
    }
  },
  validatePhone: (rule, value, callback) => {
    if (!value.match(/^1(3|4|5|7|8)\d{9}$/)) {
      callback(new Error('请输入正确的手机号码'))
    } else {
      callback()
    }
  },
  validateEmail: (rule, value, callback) => {
    if (!value.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)) {
      callback(new Error('请输入正确的邮箱地址'))
    } else {
      callback()
    }
  },
  validateTaget: (rule, value, callback) => {
    if (!value.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/) && !value.match(/^1(3|4|5|7|8)\d{9}$/)) {
      callback(new Error('请输入正确的目标'))
    } else {
      callback()
    }
  },
  validateVcode: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('验证码不能为空'))
    } else if (value !== this.a.state.vcode) {
      callback(new Error('验证码错误'))
    } else {
      callback()
    }
  },
  validateCerd: (rule, value, callback) => {
    if (value === '') {
      callback(new Error('身份证号码不能为空'))
    } else if (!value.match(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/)) {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}

export default {
  name: 'common',
  state: {
    rules: {
      username: {required: true, message: '请输入用户名', trigger: 'blur'},
      password: [
        {required: true, message: '请输入登录密码', trigger: 'blur'},
        {min: 2, max: 16, message: '请输入6~16位数字和字母', trigger: 'change'},
        {validator: valid.validateType, trigger: 'change'},
        {validator: valid.validateType, trigger: 'blur'}
      ],
      newpassword: [
        {required: true, message: '请输入登录密码', trigger: 'blur'},
        {min: 2, max: 16, message: '请输入6~16位数字和字母', trigger: 'change'},
        {validator: valid.validateType, trigger: 'change'},
        {validator: valid.validateType, trigger: 'blur'}
      ],
      UserName: {required: true, message: '请输入用户名', trigger: 'blur'},
      Phone: [
        {required: true, message: '请输入手机号', trigger: 'blur'},
        {validator: valid.validatePhone, trigger: 'blur'}
      ],
      Password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 2, max: 16, message: '请输入6~16位数字和字母', trigger: 'change'},
        {validator: valid.validateType, trigger: 'change'},
        {validator: valid.validateType, trigger: 'blur'}
      ],
      SmsVCode: {validator: valid.validateVcode, trigger: 'blur'},
      smscode: {validator: valid.validateVcode, trigger: 'blur'},
      vcode: {validator: valid.validateVcode, trigger: 'blur'},
      name: {required: true, message: '请输入真实姓名', trigger: 'blur'},
      certid: [
        {required: true, message: '请输入身份证号', trigger: 'blur'},
        {validator: valid.validateCerd, trigger: 'blur'}
      ],
      taget: [
        {required: true, message: '请输入目标', trigger: 'blur'},
        {validator: valid.validateTaget, trigger: 'blur'}
      ]
    },
    vcode: '',
    context: this
  },
  getters: {
    clearVcode: state => {
      state.vcode = ''
    }
  },
  mutations: {
    clearVcode (state) {
      state.vcode = ''
    }
  },
  actions: {
    async sendsms (context, req) {
      await $.sendsms(req).then((response) => {
        context.state.vcode = response.data.data
      })
    }
  }
}
