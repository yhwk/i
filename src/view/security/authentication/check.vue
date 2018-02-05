<template>
  <div class="pane-body">
    <h4 class="title">个人账户实名认证</h4>
    <el-steps :space="200" :active="step-1" finish-status="success" align-center>
      <el-step title="提交"></el-step>
      <el-step title="后台审核中"></el-step>
      <el-step title="审核通过/不通过" v-if="user.State<2"></el-step>
      <el-step title="审核通过" v-else-if="user.State==2"></el-step>
      <el-step title="审核不通过" v-else></el-step>
    </el-steps>
    <div class="box auth" v-if="user.UserType==0">
      <el-form ref="form"  :label-position="labelPosition" label-width="150px" size="small">
        <el-form-item label="真实姓名：" width="90" prop="name">
          <el-input v-model="user.Name" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="certid">
          <el-input v-model="user.CertID" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证照片：">
          <el-row>
            <el-col :span="12">
              <img v-if="user.CertImg1" :src="imageUrl1" class="avatar">
            </el-col>
            <el-col :span="12">
              <img v-if="user.CertImg1" :src="imageUrl2" class="avatar">
            </el-col>
          </el-row>
          <el-row>
            <p>只允许<span>jpg、jpeg、bmp</span>格式</p>
            <p>一张身份证只可认证一个账号，一经绑定无法更改</p>
          </el-row>
        </el-form-item>
        <el-form-item label="身份证到期时间：">
          <el-input disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="box auth" v-if="user.UserType==1">
      <el-form ref="form"  :label-position="labelPosition" label-width="150px" size="small">
        <el-form-item label="企业名称：" width="90" prop="name">
          <el-input v-model="user.Name" disabled></el-input>
        </el-form-item>
        <el-form-item label="营业执照：">
          <el-row>
            <el-col :span="12">
              <img v-if="user.CertImg1" :src="imageUrl1" class="avatar">
            </el-col>
          </el-row>
          <el-row>
            <p>只允许<span>jpg、jpeg、bmp</span>格式</p>
            <p>一张身份证只可认证一个账号，一经绑定无法更改</p>
          </el-row>
        </el-form-item>
        <el-form-item label="营业执照期限：">
          <el-input disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        form: {},
        user: this.$store.state.user.userInfo,
        labelPosition: 'right',
        rules: this.$store.state.common.rules
      }
    },
    computed: {
      imageUrl1 () {
        return `/api/file/read?filename=${this.user.CertImg1}`
      },
      imageUrl2 () {
        return `/api/file/read?filename=${this.user.CertImg2}`
      },
      step () {
        if (this.user.State < 2) {
          return 2
        } else {
          return 4
        }
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
  .el-steps {
    padding: 32px 150px;
  }
  .box {
    float: left;
    width: 52%;
    padding: 0 150px;
  }
  .el-form-item {
  }
  .el-form-item p {
    line-height: 1;
    margin-top: 8px;
    font-size: 12px;
    color: #272727
  }
  p span {
    color: #e64593
  }
  .el-button{
    background: #ffe474;
    font-size: 14px;
    padding: 9px 25px;
  }
</style>
