<template>
  <div class="panel">
    <nav>
      <el-row>
        <el-col :span="24">
          <ul>
            <li><a href="/index">智纺后台首页</a></li>
            <li class="active"><router-link to="/index">账户设置</router-link></li>
            <li><a href="http://admin.zhifangw.cn">招聘管理</a></li>
            <li><a href="http://rfid.zhifangw.cn">产能协同</a></li>
            <li><a href="#">智纺设计</a></li>
            <li><a href="#">机械维修</a></li>
            <li><a href="/person/p_balance">资金管理</a></li>
            <li><a href="/person/p_messages">消息中心</a></li>
            <li><a href="#">分享好友</a></li>
          </ul>
        </el-col>
      </el-row>
    </nav>
    <div class="panel-body">
      <aside>
        <ul>
          <li class="active"><a href="">安全设置</a></li>
          <li><a href="">账号信息</a></li>
        </ul>
      </aside>
      <div class="pane">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'index',
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
    }
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
  @font-color: #333;
  @active-color: #d59f03;
  @hover-color: #777;
  .clear{
    margin: 0;
    padding: 0;
  }
  .li {
    color: @font-color;
    &:hover {
      color: @hover-color;
    }
  }
  .active {
    color: @active-color;
  }
  .panel {
    width: 1200px;
    margin: 0 auto;
    color: @font-color;
  }
  nav {
    padding: 0;
    font-size: 14px;
    ul {
      .clear;
      li {
        float: left;
        margin-right: 20px;
        line-height: 20px;
        padding: 3px 6px;
        a {
          .li;
        }
      }
      li.active a{
        .active;
      }
    }
    &:after {
      clear: both;
    }
  }
  .panel-body {
    margin: 25px 0;
  }
  aside {
    width: 190px;
    float: left;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.12);
    background: #fff;
    font-size: 14px;
    min-height: 576px;
    ul {
      .clear;
      li {
        padding: 10px;
        text-align: center;
        border-bottom: 1px solid #ededed;
        line-height: normal;
        a {
          .li;
        }
      }
      li.active a{
        .active;
      }
    }
  }
  .pane {
    width: 980px;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.12);
    background: #fff;
    margin-left: 220px;
    min-height: 576px;
    font-size: 14px;
  }
</style>
