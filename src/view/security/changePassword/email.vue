<template>
  <div class="pane-body">
    <h4 class="title">修改登录密码</h4>
    <el-steps :space="200" :active="step-1" finish-status="success" align-center>
      <el-step title="验证身份"></el-step>
      <el-step title="修改登录密码"></el-step>
      <el-step title="修改成功"></el-step>
    </el-steps>
    <div class="box security one" v-if="step==1">
      <div class="box-title">
        <img src="../../../assets/info.png">您正在使用“验证邮箱”进行验证 | <router-link to="/security/changePassword/phone">通过已验证手机号码验证</router-link>
      </div>
      <div class="box-body">
        <div class="phone">
          <span>邮箱地址</span><span>{{ user.Email}}</span>
        </div>
        <el-form :label-position="labelPosition" size="small" :model="form" ref="form" label-width="80px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码" width="110" prop="SmsVCode">
                <el-input v-model="form.SmsVCode" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-button type="text" @click="doVerify" v-if="verify">发送邮箱验证码</el-button>
              <el-button type="text" v-if="!verify" disabled>{{time}}s后重试</el-button>
            </el-col>
          </el-row>
          <el-form-item label="">
            <el-button type="warning" @click='next' class="next">下一步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="box security two" v-if="step==2">
      <div class="box-body">
        <el-form :label-position="labelPosition" size="small" :model="submitForm" ref="submitForm" label-width="120px" :rules="rules">
          <el-form-item label="新登录密码" prop="newpassword">
            <el-input v-model="submitForm.newpassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认登录密码" prop="checkPassword">
            <el-input v-model="submitForm.checkPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click='submit' class="next">确&nbsp;定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="box security three" v-if="step==4">

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
          SmsVCode: ''
        },
        submitForm: {
          taget: '',
          smscode: '',
          newpassword: '',
          checkPassword: ''
        },
        user: this.$store.state.user.userInfo,
        step: 1,
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
          } else if (value !== this.submitForm.newpassword) {
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
      next () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.step = 2
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submit () {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            this.submitForm.smscode = this.form.SmsVCode
            this.submitForm.taget = this.user.Email
            this.$store.dispatch('findPassword', this.submitForm).then((response) => {
              this.step = 4
            }).catch((error) => {
              this.step = 1
              this.$refs['form'].resetFields()
              this.$refs['submitForm'].resetFields()
              throw error
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      doVerify () {
        this.verify = false
        this.$store.dispatch('sendsms', {'taget': this.user.Email, smstype: '3'})
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
