<template>
  <div class="footer">
    <div class="footer-top">
      <el-row>
        <el-col :span="13" :offset="5">
          <ul>
            <li><a href="http://www.zhifangw.cn/about">关于我们<span></span></a></li>
            <li><a href="#">会员须知<span></span></a></li>
            <li><a href="#">付款方式<span></span></a></li>
            <li><a href="http://www.zhifangw.cn/contactUs">联系我们<span></span></a></li>
            <li><a href="http://www.zhifangw.cn/index">诚聘英才<span></span></a></li>
            <li><a href="http://www.zhifangw.cn/help?id=1">常见问题</a></li>
          </ul>
        </el-col>
        <el-col :span="2" :offset="4">
          <img src="../assets/advan.png" alt="二维码"/>
          <p>关注智纺网</p>
        </el-col>
      </el-row>
    </div>
    <div class="footer-bottom">
      <p>浙江迎来纺网络科技有限公司© 版权所有</p>
      <p>浙ICP备08105203号-6</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'publicFooter',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@font-color:  #cebd8d;
.center {
  text-align: center;
}
.footer {
  background: #2c2c2c;
  color: @font-color;
  font-size: 14px;
  line-height: 22px;
  padding: 55px 0;
  .el-row {
    width: 1200px;
    margin: 0 auto;
  }
  .footer-top{
    border-bottom: 1px solid #414141;
    padding-bottom: 10px;
    ul {
      margin-left: 30px;
      li {
        float: left;
        padding: 0 20px;
        a {
          color: @font-color;
          span {
            position: absolute;
            height: 14px;
            width: 2px;
            background: @font-color;
            top: 37px;
            margin-left: 18px;
          }
        }
      }
    }
    img{
      .center;
      color: @font-color;
    }
    p {
      margin: 0 auto;
    }
  }
  .footer-bottom {
    .center;
    font-size: 12px;
    margin-top: 35px;
    line-height: 20px;
    p {
      margin: 0;
    }
  }
}
  .el-row div:nth-child(2){
    margin-top: -24px;
  }
</style>
