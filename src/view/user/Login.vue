<template>
  <el-container>
    <div class="panel panel-login" >
      <div class="panel-header">
        欢迎登录智纺网络平台
      </div>
      <el-form :model="form" :rules="rules" ref="form" :status-icon="true">
        <el-form-item prop="username">
          <el-input v-model="form.username"></el-input>
          <label>用户名</label>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password"></el-input>
          <label>登录密码</label>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item>
              <el-checkbox v-model="form.checked">七天内免登陆</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <router-link to="/forget">忘记密码&nbsp;?</router-link>
          </el-col>
        </el-row>
        <el-form-item>
          <button type="button" @click="submit">立即登录</button>
        </el-form-item>
      </el-form>
      <div id="popup-captcha"></div>
      <div class="prompt">
        <span>还没有账号 ?&nbsp;</span>
        <router-link to="/register">立即注册</router-link>
      </div>
    </div>
  </el-container>
</template>

<script>
import './login.less'

export default {
  name: 'login',
  components: {
  },
  data () {
    return {
      form: {
        username: '',
        password: '',
        isApp: false,
        device: '122.226.124.206',
        checked: false
      },
      captchaObj: ''
    }
  },
  created () {
    this.$store.dispatch('getVcode').then((response) => {
      // eslint-disable-next-line
      initGeetest({
        gt: this.gt.gt,
        challenge: this.gt.challenge,
        product: 'popup',
        offline: !this.gt.success
      }, (captchaObj) => {
        this.captchaObj = captchaObj
        captchaObj.appendTo('#popup-captcha')
      })
    })
  },
  computed: {
    token () {
      return this.$store.state.user.token
    },
    rules () {
      return this.$store.state.common.rules
    },
    gt () {
      return this.$store.state.user.gt
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.captchaObj.show()
          this.captchaObj.onSuccess(() => {
            setTimeout(() => {
              this.$store.dispatch('login', this.form).then((response) => {
                // let from = this._.getUrlSearch('from')
                let from = this._.getHashSearch('from')
                if (from) {
                  window.location.href = from
                } else if (response) {
                  this.$router.push('/index')
                }
              })
            }, 2000)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
</style>
