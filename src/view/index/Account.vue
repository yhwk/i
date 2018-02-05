<template>
  <div>
    <div class="top">
      <h4 class="title">您的基本信息</h4>
      <el-row>
        <el-col :span="12">
          <span>用户名</span><i>：</i>{{user.UserName}}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>手机号码</span><i>：</i>{{user.Phone}}
          <router-link to="/security/changePhone/phone">（修改手机号）</router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>邮箱</span><i>：</i>{{user.Email}}
          <router-link to="/security/changeEmail">（修改邮箱）</router-link>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <h4 class="title">您的安全服务</h4>
      <el-row class="level">
        <el-col :span="3" :offset="1">
          安全等级：
          <span v-if="level<50"> 低</span>
          <span v-else-if="level<=75">中</span>
          <span v-else-if="level>75">高</span>
        </el-col>
        <el-col :span="8">
          <el-progress :percentage="level" status="exception" :stroke-width="12"></el-progress>
        </el-col>
        <el-col :span="12">
          建议启动所有安全设置，以保障账户及资金安全
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <img src="../../assets/success.png">
          <span>登录密码</span>
        </el-col>
        <el-col :span="14">
          建议定期更换账户密码以保障账户安全
        </el-col>
        <el-col :span="5">
          <router-link to="/security/changePassword/phone">修改</router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <img src="../../assets/success.png">
          <span>手机验证</span>
        </el-col>
        <el-col :span="14">
          验证后，可用于快速找回登录密码及支付密码，接收账户余额变动提醒
        </el-col>
        <el-col :span="5">
          <router-link to="/security/changePhone/phone">修改</router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <img src="../../assets/success.png" v-if="user.Email">
          <img src="../../assets/warning.png" v-else>
          <span>邮箱验证</span>
        </el-col>
        <el-col :span="14">
          验证后，可用于快速找回登录密码及支付密码，接收账户余额变动提醒
        </el-col>
        <el-col :span="5" v-if="user.Email">
          <router-link to="/security/changeEmail">修改</router-link>
        </el-col>
        <el-col :span="5" v-else>
          <router-link to="/security/changeEmail/set">绑定</router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <img src="../../assets/success.png" v-if="user.PayPassword">
          <img src="../../assets/warning.png" v-else>
          <span>支付密码</span>
        </el-col>
        <el-col :span="14">
          建议您定期更换密码保护账户安全
        </el-col>
        <el-col :span="5" v-if="user.PayPassword">
          <router-link to="/security/paypassword/phone">修改</router-link>
        </el-col>
        <el-col :span="5" v-else>
          <router-link to="/security/paypassword/set">设置</router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <img src="../../assets/success.png" v-if="user.State==2">
          <img src="../../assets/warning.png" v-else>
          <span>实名认证</span>
        </el-col>
        <el-col :span="14">
          用于提升账户的安全性及信任级别，认证后的账号不能修改认证信息
        </el-col>
        <el-col :span="5" v-if="user.State==0||user.State==-1">
          <router-link to="/security/authentication">认证</router-link>
        </el-col>
        <!--<el-col :span="5" v-if="user.State==-1">-->
          <!--<router-link to="/security/authentication/check">等待审核</router-link>-->
        <!--</el-col>-->
        <el-col :span="5" v-if="user.State==1">
          <router-link to="/security/authentication/check">审核中</router-link>
        </el-col>
        <el-col :span="5" v-if="user.State==2">
          <router-link to="/security/authentication/check">已认证</router-link>
        </el-col>
        <el-col :span="5" v-if="user.State>2">
          <router-link to="/security/authentication">重新认证</router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'account',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user.userInfo
    },
    level () {
      let level = 25
      if (this.user.Email) {
        level = level + 25
      }
      if (this.user.PayPassword) {
        level = level + 25
      }
      if (this.user.State === 2) {
        level = level + 25
      }
      return level
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  .pane-child {
    float: left;
    padding: 23px 33px 0;
    width: 94%;
    .title {
      margin: 0;
      padding: 0;
      font-size: 15px;
      color: #272727;
      margin-bottom: 20px;
    }
  }
  .top {
    border-bottom: 1px solid #efefef;
    .pane-child;
    .el-row {
      margin-bottom: 16px;
    }
    span {
      width: 56px;
      display: inline-block;
      text-align: justify;
      text-align-last: justify;
    }
    i {
      font-style: normal;
      margin: 0 8px;
    }
    a {
      color: #0082fd;
      margin-left: 10px;
      &:hover{
        opacity: .8;
      }
    }
  }
  .bottom {
    .pane-child;
    line-height: 16px;
    .el-progress {
      margin-top: 2px;
    }
    .el-row {
      border-bottom: 1px solid #ededed;
      padding: 24px 20px 12px;
      img {
        margin-right: 10px;
      }
    }
    .level {
      border: 0;
      padding: 10px;
      span {
        color: #dfb741;
        margin: 0 !important;
      }
    }
    .el-row .el-col{
      &:first-child {
        img {
          position: absolute;
        }
        span {
          margin-left: 35px;
        }
      }
      &:nth-child(2){
        font-size: 12px;
        color: #666
      }
    }
    .el-row.level .el-col {
      &:nth-child(3){
        font-size: 12px;
        color: #666
      }
    }
  }
</style>
