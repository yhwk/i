<template>
  <el-container>
    <el-header>
      <public-header></public-header>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <public-footer></public-footer>
    </el-footer>
  </el-container>
</template>

<script>
import publicHeader from '@/components/publicHeader'
import publicFooter from '@/components/publicFooter'

export default {
  name: 'dashboard',
  components: {
    'public-header': publicHeader,
    'public-footer': publicFooter
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="css">
  .el-footer{
    padding: 0;
  }
  .el-main{
    background:  #f2f2f2;;
  }
  .el-header{
    padding: 0;
    height: auto!important;
  }
</style>
