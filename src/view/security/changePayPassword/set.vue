<template>
  <div class="pane-body">
    <h4 class="title">您正在设置支付密码</h4>
    <div class="box security" >
      <div class="box-body">
        <el-form :label-position="labelPosition" size="small" :model="form" ref="form" label-width="120px" :rules="rules">
          <el-form-item label="支付密码" prop="newpassword" width="180">
            <el-input v-model="form.newpassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认支付密码" prop="checkPassword">
            <el-input v-model="form.checkPassword" type="password"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码" width="110" prop="smscode">
                <el-input v-model="form.smscode" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-button type="text" @click="doVerify" v-if="verify">发送短信验证码</el-button>
              <el-button type="text" v-if="!verify" disabled>{{time}}s后重试</el-button>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="warning" @click='submit' class="next">确&nbsp;定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'changePassword',
    data () {
      return {
        labelPosition: 'left',
        form: {
          newpassword: '',
          checkPassword: '',
          smscode: ''
        },
        user: this.$store.state.user.userInfo,
        verify: true,
        time: 60
      }
    },
    computed: {
      rules () {
        let rules = this.$store.state.common.rules
        let validateCheckPassword = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('确认密码不能为空'))
          } else if (value !== this.form.newpassword) {
            callback(new Error('两次输入的密码不一致'))
          } else {
            callback()
          }
        }
        this.$set(rules, 'checkPassword', {validator: validateCheckPassword, trigger: 'blur'})
        this.$set(rules, 'newpassword', {required: true, message: '请输入支付密码', trigger: 'blur'})
        return rules
      }
    },
    methods: {
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('setPayPassword', this.form).then((response) => {
              response ? this.$router.push('/index') : this.form.smscode = ''
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      doVerify () {
        this.verify = false
        this.$store.dispatch('sendsms', {'taget': this.user.Phone, smstype: '3'})
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
    }
  }
</script>

<style scoped lang="less">
  .pane-body {
    padding: 23px 33px;
    .title {
      margin: 0;
      padding: 0;
      font-size: 15px;
      color: #272727;
    }
    .el-steps {
      padding: 30px 170px 20px;
    }
    .box {
      width: 774px;
      height: 314px;
      margin: 32px auto;
      padding: 13px 20px;
      box-sizing: border-box;
      box-shadow: 0 0 1px #aaa;
      .box-title {
        padding: 10px 0 10px 20px;
        border-bottom: 1px solid #ededed;
        img {
          width: 16px;
          position: absolute;
          margin-top: 2px;
          margin-left: -20px;
        }
      }
      .box-body {
        padding: 34px 150px;
        float: left;
        width: 430px;
        .el-form-item__label {
          text-align: right
        }
        .el-row {
          height: 34px;
        }
        .phone {
          margin-bottom: 20px;
          &:first-child span {
            padding-right: 25px;
          }
        }
        .next {
          position: absolute;
          margin-top: 20px;
          left: 0;
        }
      }
    }
    .box.one {
      .el-input {
        width: 110px;
      }
    }
    .box.two {
      .el-form-item {
        height: 30px;
      }
    }
  }

</style>
