<template>
  <div class="pane-body">
    <h4 class="title">实名认证</h4>
    <div class="box">
      <div class="box-title">尊敬的用户，您还未进行实名认证</div>
      <div class="box-body">温馨提示：只有实名认证才能进行充值提现转账等相关业务，智纺网将对您以下信息进行保密。</div>
      <el-button plain @click="doAuth">实名认证</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: this.$store.state.user.userInfo
      }
    },
    methods: {
      doAuth () {
        this.user.UserType === 0 ? this.$router.push('/security/authentication/enterprise') : this.$router.push('/security/authentication/person')
      }
    }
  }
</script>
<style lang="less" scoped>
  .box {
    width: 722px;
    height: 167px;
    box-sizing: border-box;
    margin: 36px auto;
    padding: 25px 0;
    text-align: center;
    background: #fbfafa;
    .box-title {
      font-weight: bold;
    }
    .box-body {
      margin: 18px  0 22px;
    }
    .el-button {
      width: 133px;
      height: 36px;
      padding: 10px 20px;
      background: none;
      &:hover {
        color: #d59f03;
        border-color: #d59f03;
      }
    }
  }
</style>
