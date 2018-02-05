<template>
  <div class="pane-body">
    <h4 class="title">绑定邮箱</h4>
    <div class="box security" >
      <div class="box-body">
        <el-form :label-position="labelPosition" size="small" :model="form" ref="form" label-width="120px" :rules="rules">
          <el-form-item label="邮箱地址" prop="taget" width="180">
            <el-input v-model="form.taget"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="验证码" width="110" prop="smscode">
                <el-input v-model="form.vcode" ></el-input>
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
          taget: '',
          vcode: '',
          step1: ''
        },
        user: this.$store.state.user.userInfo,
        verify: true,
        time: 60
      }
    },
    computed: {
      rules () {
        let rules = this.$store.state.common.rules
        return rules
      }
    },
    methods: {
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('changePhoneOrEmailStep2', this.form).then((response) => {
              response ? this.$router.push('/index') : this.form.vcode = ''
            })
          } else {
            console.log('error submit!!')
            return false
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
