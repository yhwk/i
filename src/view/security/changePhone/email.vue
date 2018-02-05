<template>
  <div class="pane-body">
    <h4 class="title">修改手机号码</h4>
    <el-steps :space="200" :active="step-1" finish-status="success" align-center>
      <el-step title="验证身份"></el-step>
      <el-step title="修改手机号码"></el-step>
      <el-step title="修改成功"></el-step>
    </el-steps>
    <div class="box security one" v-if="step==1">
      <div class="box-title">
        <img src="../../../assets/info.png">您正在使用“验证邮箱”进行验证 | <router-link to="/security/changePhone/phone">通过已验证手机号码验证</router-link>
      </div>
      <div class="box-body">
        <div class="phone">
          <span>邮箱地址</span><span>{{user.Email}}</span>
        </div>
        <el-form :label-position="labelPosition" size="small" :model="form" ref="form" label-width="80px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码" width="110" prop="vcode">
                <el-input v-model="form.vcode" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-button type="text" @click="doVerify(0)" v-if="verify[0]">发送短信验证码</el-button>
              <el-button type="text" v-if="!verify[0]" disabled>{{time[0]}}s后重试</el-button>
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
          <el-form-item label="新手机号码" prop="newpassword">
            <el-input v-model="submitForm.taget"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码" width="110" prop="vcode">
                <el-input v-model="submitForm.vcode" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-button type="text" @click="doVerify(1)" v-if="verify[1]">发送短信验证码</el-button>
              <el-button type="text" v-if="!verify[1]" disabled>{{time[1]}}s后重试</el-button>
            </el-col>
          </el-row>
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
          vcode: '',
          taget: ''
        },
        submitForm: {
          taget: '',
          vcode: ''
        },
        step: 1,
        verify: [true, true],
        time: [60, 60]
      }
    },
    computed: {
      rules () {
        return this.$store.state.common.rules
      },
      vcode () {
        return this.$store.state.common.vcode
      },
      user () {
        return this.$store.state.user.userInfo
      }
    },
    methods: {
      next () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.taget = this.user.Email
            this.$store.dispatch('changePhoneOrEmailStep1', this.form).then((response) => {
              this.step = 2
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submit () {
        this.$refs['submitForm'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('changePhoneOrEmailStep2', this.submitForm).then((response) => {
              if (response) {
                this.step = 4
                this.$store.commit('changePhone', this.submitForm.taget)
              } else {
                this.step = 1
                this.$refs['form'].resetFields()
                this.$refs['submitForm'].resetFields()
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      doVerify (n) {
        this.verify.splice(n, 1, false)
        n === 0 ? this.$store.dispatch('sendsms', {'taget': this.user.Email, smstype: '3'}) : this.$store.dispatch('sendsms', {'taget': this.submitForm.taget, smstype: '3'})
        let verify = setInterval(() => {
          if (this.time[n] === 0) {
            clearInterval(verify)
            this.time.splice(n, 1, 60)
            this.verify.splice(n, 1, true)
          } else {
            this.time.splice(n, 1, this.time[n] - 1)
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
