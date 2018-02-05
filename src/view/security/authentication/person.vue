<template>
  <div class="pane-body">
    <h4 class="title">个人账户实名认证</h4>
    <el-steps :space="200" :active="step-1" finish-status="success" align-center>
      <el-step title="提交"></el-step>
      <el-step title="后台审核中"></el-step>
      <el-step title="审核通过/不通过"></el-step>
    </el-steps>
    <div class="box auth">
      <el-form ref="form" :model="form" :label-position="labelPosition" label-width="150px" size="small" :rules="rules">
        <el-form-item label="真实姓名：" width="90" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码：" prop="certid">
          <el-input v-model="form.certid"></el-input>
        </el-form-item>
        <el-form-item label="身份证照片：">
          <el-row>
            <el-col :span="12">
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                name="fs"
                :show-file-list="false"
                :on-success="handleAvatarSuccess1"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                <i v-else class="el-icon-plus
                avatar-uploader-icon">正面</i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload"
                name="fs"
                :show-file-list="false"
                :on-success="handleAvatarSuccess2"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                <i v-else class="el-icon-plus
                avatar-uploader-icon">反面</i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row>
            <p>只允许<span>jpg、jpeg、bmp</span>格式</p>
            <p>一张身份证只可认证一个账号，一经绑定无法更改</p>
          </el-row>
        </el-form-item>
        <el-form-item label="身份证到期时间：">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">确&nbsp;&nbsp;认</el-button>
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
        form: {
          name: '',
          certid: '',
          img1: '',
          img2: ''
        },
        step: 1,
        imageUrl1: '',
        imageUrl2: '',
        labelPosition: 'right',
        rules: this.$store.state.common.rules
      }
    },
    methods: {
      submit () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$store.dispatch('authentication', this.form).then((response) => {
              if (response) {
                this.$router.push('/index')
                this.$store.commit('changeState', 1)
              }
            })
          }
        })
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/bmp'
        const isLt2M = file.size / 1024 / 1024 < 5

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/JPEG/BMP 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!')
        }
        return isJPG && isLt2M
      },
      handleAvatarSuccess1 (res, file) {
        this.imageUrl1 = URL.createObjectURL(file.raw)
        this.form.img1 = res.data
      },
      handleAvatarSuccess2 (res, file) {
        this.imageUrl2 = URL.createObjectURL(file.raw)
        this.form.img2 = res.data
      }
    }
  }
</script>
<style scoped>
  .pane-body {
    min-height: 620px;
  }
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
    font-size: 14px; padding: 9px 25px;

  }
</style>
