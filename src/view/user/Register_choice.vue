<template>
  <div class="container">
    <div class="panel panel-login">
      <div class="panel-header">
        智纺平台注册
      </div>
      <div class="panel-body" v-show="!type">
        <el-row>
          <transition name="el-fade-in">
            <el-col :span="12">
              <div class="box box-enterprise">
                <el-row>
                  <el-col :span="10" :offset="2">
                    <img src="../../assets/register_enterprise.png" alt="企业"/>
                  </el-col>
                  <el-col :span="12">
                    <h3>企业注册</h3>
                    <p>Enterprise registration</p>
                    <p>企业、加工厂、商家</p>
                  </el-col>
                </el-row>
              </div>
              <el-row class="button-row">
                <el-col :span="24">
                  <button @click="doRegister('enterprise')">企业注册</button>
                </el-col>
              </el-row>
            </el-col>
          </transition>
          <transition>
            <el-col :span="12">
              <div class="box">
                <el-row>
                  <el-col :span="10" :offset="4">
                    <img src="../../assets/register_staff.png" alt="个人"/>
                  </el-col>
                  <el-col :span="10">
                    <h3>个人注册</h3>
                    <p>Individual registration</p>
                    <p>设计师、机修、工人</p>
                  </el-col>
                </el-row>
              </div>
              <el-row class="button-row">
                <el-col :span="24">
                  <button @click="doRegister('staff')">个人注册</button>
                </el-col>
              </el-row>
            </el-col>
          </transition>
        </el-row>
      </div>
    </div>
    <div class="prompt">
      <span>已有账号 ?</span>
      <router-link to="/login">立即登录</router-link>
    </div>
  </div>
</template>

<script>
import './login.less'

export default {
  name: 'register',
  components: {
  },
  data () {
    return {
      type: ''
    }
  },
  computed: {
  },
  methods: {
    doRegister (type) {
      this.$router.push(`/register/${type}`)
    }
  }
}
</script>

<style scoped lang="less">
  .transition {
    transition-duration: .3s;
  }
  @color: #d59f03;
  .panel-body {
    padding: 20px 65px 50px;
    .box {
      padding: 50px 0;
      text-align: left;
      h3 {
        margin: 5px 0 0;
        font-size: 20px;
      }
      p {
        font-size: 12px;
        color: #666;
        font-family: Arial, '微软雅黑';
      }
      img {
        width: 96px;
        height: 96px;
      }
    }
    .button-row{
      text-align: center;
      button {
        height: 38px;
        width: 180px;
        border-radius: 4px;
        background: @color;
        font-size: 16px;
        color: #fff;
        border: 0;
        cursor: pointer;
        outline: none;
        .transition;
        &:hover {
          color: @color;
          background: #FFF;
          border: 1px solid @color;
        }
      }
    }
  }
  .prompt {
    margin-top: -20px;
  }
  .box-enterprise {
    border-right: 1px dashed #ccc;
  }
</style>
