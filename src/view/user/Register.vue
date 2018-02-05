<template>
  <div class="container">
    <div class="panel panel-login panel-register">
      <div class="panel-header">
        {{typeList[type-1]}}注册
      </div>
      <el-form :model="form" :rules="rules" ref="form" :status-icon="true">
        <el-form-item prop="UserName">
          <el-input v-model="form.UserName" placeholder="请输入用户名、邮箱或手机号"></el-input>
          <label>用户名</label>
        </el-form-item>
        <el-form-item prop="Phone">
          <el-input v-model="form.Phone" placeholder="请输入手机号"></el-input>
          <label>手机号</label>
        </el-form-item>
        <el-form-item prop="Password">
          <el-input v-model="form.Password" placeholder="请输入密码" type="password"></el-input>
          <label>登录密码</label>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input v-model="form.checkPassword" placeholder="请再次输入密码" type="password"></el-input>
          <label>确认密码</label>
        </el-form-item>
        <el-row>
          <el-col :span="17">
            <el-form-item prop="SmsVCode">
              <el-input v-model="form.SmsVCode" placeholder="请输入短信验证码"></el-input>
              <label>短信验证码</label>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="1">
            <button class="verification-code" v-if="verify" type="button" @click="doVerify">{{verifyMessage}}</button>
            <button class="verification-wait" v-if="!verify" type="button">{{time}}s后重试</button>
          </el-col>
        </el-row>
        <el-form-item style="padding: 5px 60px 15px;">
          <el-checkbox v-model="checked">同意<a href="javascript:;" @click="dialogVisible = true">《智纺网用户注册协议》</a></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="button" @click="submit" :disabled="!checked">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%">
      <div slot="title" class="dialog-title">用户协议</div>
      <user-protocol></user-protocol>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;checked = true">同意</el-button>
     </div>
    </el-dialog>
  </div>
</template>
<script>
import './login.less'

export default {
  name: 'register',
  components: {
    'user-protocol': () => import('@/components/protocol')
  },
  beforeRouteEnter (to, from, next) {
    let type
    to.params.type === 'enterprise' ? type = 2 : type = 1
    next(vm => {
      vm.type = type
    })
  },
  data () {
    return {
      type: '',
      typeList: ['个人', '企业'],
      checked: false,
      dialogVisible: false,
      verify: true,
      verifyMessage: '发送验证码',
      time: 60,
      form: {
        Email: '',
        InviteCode: '',
        Password: '',
        Phone: '',
        Recommender: '',
        SmsVCode: '',
        UserName: '',
        checkPassword: '',
        UserType: ''
      }
    }
  },
  computed: {
    rules () {
      let rules = this.$store.state.common.rules
      let validateCheckPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('确认密码不能为空'))
        } else if (value !== this.form.Password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }
      this.$set(rules, 'checkPassword', {validator: validateCheckPassword, trigger: 'blur'})
      return rules
    },
    vcode () {
      return this.$store.state.common.vcode
    }
  },
  methods: {
    submit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.UserType = this.type
          this.$store.dispatch('register', this.form).then((response) => {
            response ? this.$router.push('/login') : this.form.SmsVCode = ''
          })
        }
      })
    },
    doVerify () {
      this.$refs['form'].validateField('Phone', (valid) => {
        if (!valid) {
          this.verify = false
          this.$store.dispatch('sendsms', {'taget': this.form.Phone, smstype: '2'})
          let verify = setInterval(() => {
            if (this.time === 0) {
              clearInterval(verify)
              this.time = 60
              this.verify = true
              this.verifyMessage = '重发验证码'
            } else {
              this.time--
            }
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  a{
    text-decoration:underline;
    color: #dfb741!important;
    &:hover {
      color: #ffe474!important;
    }
  }
  .dialog-title{
    text-align: center;
    font-size: 20px;
  }
  .dialog-footer{
    text-align: center;
    button {
      padding: 10px 25px;
    }
  }
  .panel {
    padding-bottom: 30px;
    .el-form .el-form-item .el-button.is-disabled{
      color: #606266;
      &:hover {
        opacity: 1;
        color: #606266;
      }
    }
  }
  .verification-code, .verification-wait {
    width: 100%;
    height: 38px;
    border: 0;
  }
  .verification-code {
    background: #ffe474;
    cursor: pointer;
    &:hover {
      opacity: .8;
      color: #5d4a00;
    }
  }
  .verification-wait {
    cursor: not-allowed;
  }
</style>
