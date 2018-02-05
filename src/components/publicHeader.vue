<template>
  <div class="header">
    <div class="head-top">
      <el-row>
        <el-col :span="2">
          <a href="javascript:;" class="head-app" @mouseenter="showApp=true" @mouseleave="showApp=false">
            APP下载
            <transition name="el-fade-in">
              <div class="two-dimensional-code-box" v-show="showApp">
                <div><img class="two-dimensional-img" src="../assets/app-qrcode.jpg"></div>
                <span style="width: 100%">个人版APP</span>
             </div>
            </transition>
          </a>
        </el-col>
        <el-col :span="2">
          <a href="javascript:;" class="head-wx" @mouseenter="showWx=true" @mouseleave="showWx=false">
            微信公众号
            <transition name="el-fade-in">
              <div class="two-dimensional-code-box" v-show="showWx">
                <div><img class="two-dimensional-img" src="../assets/wx-qrcode.jpg"></div>
                <span>微信公众号</span>
                <span>微信订阅号</span>
              </div>
            </transition>
          </a>
        </el-col>
        <el-col :span="4"><a href="javascript:;" class="head-phone">客服电话：<span>0579-85876766</span></a></el-col>
        <el-col :span="6" :offset="10" class="head-user">
          <div v-if="user.token">
            <router-link to="/index">{{user.userInfo.UserName}}</router-link> &nbsp;&nbsp;| &nbsp;
            <a href="javascript:;" @click="logout">退出</a>
          </div>
          <div v-else-if="!user.token">
            <router-link to="/login" class="head-login">登录</router-link>
            <router-link to="/register" class="head-register">免费注册</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="head-bottom">
      <div>
        <a href="http://www.zhifangw.cn"><img src="../assets/logo.png" alt="logo"></a>
        <yn-ul>
          <li><a href="http://www.zhifangw.cn">首页</a></li>
          <li @mouseenter="showDl1=true" @mouseleave="showDl1=false">
            <a href="javascript:;">服务</a>
            <transition name="el-fade-in">
              <dl v-show="showDl1"> <!-- 二级菜单 -->
                <dd><a href="http://shop.zhifangw.cn/">智纺商城</a></dd>
                <dd><a href="/index">智纺工人</a></dd>
                <dd><a href="http://rfid.zhifangw.cn">智能制造</a></dd>
                <dd><a href="#">智纺研发</a></dd>
                <dd><a href="#">产能协同</a></dd>
                <dd><a href="#">智纺设计</a></dd>
                <dd><a href="#">智纺金融</a></dd>
              </dl>
            </transition>
          </li>
          <li @mouseenter="showDl2=true" @mouseleave="showDl2=false">
            <a href="javascript:;">资讯</a>
            <transition name="el-fade-in">
              <dl v-show="showDl2"> <!-- 二级菜单 -->
                <dd><a href="javascript:;">行业资讯</a></dd>
                <dd><a href="javascript:;">面料趋势</a></dd>
                <dd><a href="javascript:;">流行趋势</a></dd>
              </dl>
            </transition>
          </li>
          <li><a href="http://www.zhifangw.cn/case">成功案例</a></li>
          <li><a href="http://www.zhifangw.cn/about">关于智纺</a></li>
          <li><a href="http://www.zhifangw.cn/help?id=1">常见问题</a></li>
        </yn-ul>
      </div>
    </div>
  </div>
</template>

<script>
import ynUl from './yn/ul'
export default {
  name: 'publicHeader',
  components: {
    'yn-ul': ynUl
  },
  data () {
    return {
      showApp: false,
      showWx: false,
      showDl1: false,
      showDl2: false
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
.head-top{
  line-height: 24px;
  color: rgb(255, 255, 255);
  background: rgb(51, 44, 43);
  padding: 8px 0px;
}
.head-top .el-row{
  width: 1200px;
  margin: 0 auto;
  font-size: 12px;
}
.head-top a{
  color: #fff;
  display: inline-block;
}
.head-top a.head-app {
  background: url(../assets/app.png) no-repeat center left;
  padding-left: 20px;
}
.head-top a.head-wx {
  background: url(../assets/wx.png) no-repeat center left;
  padding-left: 25px;
}
.head-top a.head-wx {
  background: url(../assets/wx.png) no-repeat center left;
  padding-left: 25px;
}
.head-top a.head-phone {
  background: url(../assets/phone.png) no-repeat center left;
  padding-left: 25px;
  margin-left: 15px;
}
.head-top a span {
  font-weight: bold;
}
.head-top .head-user{
  font-size: 14px;
}
.head-top .head-user>div{
  float: right;
}
.head-top  a.head-register{
  background: #d59f03;
  padding: 0 18px;
}
.head-top  a.head-login{
  padding: 0 18px;
}
.two-dimensional-code-box{
  position: absolute;
  left: 0;
  top: 38px;
  border: 1px solid #ccc;
  padding: 8px;
  background: #fff;
  color: #000;
  text-align: center;
  z-index: 9999;
}
.head-bottom{
  background: #fff;
  box-shadow: 1px 0 1px 1px #ddd;
  font-size: 14px;
  color: #333;
  height: 60px;
}
.head-bottom>div{
  margin: 0 auto;
  padding: 0;
  width: 1200px;
}
.head-bottom ul{
  margin: 0 auto 0 20px;
  padding: 0;
  height: 60px;
  float: left;
}
.head-bottom ul>li{
  float: left;
  position: relative;
}
.head-bottom a{
  color: #333;
  padding: 0 20px;
  transition: all .3s;
  -webkit-transition: all .3s;
}
.head-bottom>div>a{
  padding: 11px 0;
  display: inline-block;
  float: left;
  width: 132px;
}
.head-bottom a:hover{
  color: #dfb741;
}
.head-bottom img{
    vertical-align: middle;
    width: 132px;
}
dl{
  position: absolute;
  left: -14px;
  top: 60px;
  margin: 0;
  min-width: 100%;
  line-height: 36px;
  padding: 5px 0;
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
  border: 1px solid #d2d2d2;
  background-color: #fff;
  z-index: 100;
  border-radius: 2px;
  white-space: nowrap;
}
dd{
  position: relative;
  margin: 0;
  height: 36px;
}
dd>a{
  line-height: 40px;
  padding: 8px 20px!important;
}
dd a:hover{
  background-color: #f2f2f2;
}
.el-fade-in-enter-active{
  transition: all .3s ease;
}
.el-fade-in-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  z-index: 99
}
.el-fade-in-enter, .el-fade-in-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(20px);
  opacity: 0;
}
</style>
