<template>
  <div class="pane forget">
    <h4 class="title">忘记密码</h4>
    <el-steps :space="200" :active="step-1" finish-status="success" align-center>
      <el-step title="验证身份"></el-step>
      <el-step title="重置密码"></el-step>
      <el-step title="修改成功"></el-step>
    </el-steps>
    <div class="box security one" v-if="step==1">
      <div class="box-body">
        <el-form :label-position="labelPosition" size="small" :model="form" ref="form" label-width="80px" :rules="rules">
          <el-form-item prop="taget" >
            <el-input v-model="form.taget" style="width:400px"></el-input>
            <label>手机/邮箱</label>
          </el-form-item>
          <el-row>
            <el-col :span="15">
              <el-form-item prop="smscode" >
                <el-input v-model="form.smscode" style="width:280px"></el-input>
                <label>验证码</label>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <button class="verification-code" v-if="verify" type="button" @click="doVerify">{{verifyMessage}}</button>
              <button class="verification-wait" v-if="!verify" type="button">{{time}}s后重试</button>
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
        <el-form :label-position="labelPosition" size="small" :model="submitForm" ref="submitForm" :rules="rules">
          <el-form-item prop="newpassword">
            <el-input v-model="submitForm.newpassword" type="password" style="width: 400px;"></el-input>
            <label>新登录密码</label>
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input v-model="submitForm.checkPassword" type="password" style="width: 400px;"></el-input>
            <label>确认登录密码</label>
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
          smscode: '',
          taget: ''
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
        time: 60,
        verifyMessage: '发送验证码'
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
            this.submitForm.smscode = this.form.smscode
            this.submitForm.taget = this.form.taget
            this.$store.dispatch('findPassword', this.submitForm).then((response) => {
              if (response) {
                this.step = 4
              } else {
                this.$refs['form'].resetFields()
                this.$refs['submitForm'].resetFields()
                this.step = 1
              }
            })
          }
        })
      },
      doVerify () {
        this.$refs['form'].validateField('taget', (valid) => {
          if (!valid) {
            this.verify = false
            this.$store.dispatch('sendsms', {'taget': this.form.taget, smstype: '3'})
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
  .pane{
    width: 800px;
    margin: 10px auto 50px;
    background: #fff;
    box-shadow: 2px 2px 6px 0 rgba(0,0,0,0.1);
    padding: 23px 33px;
    .title {
      margin: 0 65px;
      padding: 25px 0 14px;
      font-size: 18px;
      letter-spacing: 2px;
      border-bottom: 1px solid #e8e8e8;
      text-align: center;
      font-weight: normal;
    }
    .el-steps {
      padding: 30px 170px 20px;
    }
    .box {
      width: 774px;
      height: 314px;
      margin: 0 auto;
      padding: 13px 20px;
      box-sizing: border-box;
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
        padding: 14px 87px;
        width: 600px;
        .el-form-item {
          label {
            position: absolute;
            top: 0;
            left: 20px;
            line-height: 38px;
          }
          button {
            background: #ffe474;;
            width: 220px;
            outline: 0;
            border: none;
            font-size: 17px;
            letter-spacing: 2px;
            height: 38px;
            border-radius: 10px;
            margin: 60px 0 0 90px;
            transition-duration: .3s;
            &:hover {
              opacity: .8;
              color: #5d4a00;
            }
          }
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
        height: 42px;
        padding: 0 80px;
        .el-button{
          margin-top: 30px;
        }
      }
    }
  }
  .verification-code, .verification-wait {
    width: 100px;
    height: 38px;
    border: 0;
    margin-left: -20px;
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
