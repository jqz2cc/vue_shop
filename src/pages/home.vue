<template>
  <div class="home_box">
     <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  methods:{
    logout(){
      sessionStorage.clear();
      this.$router.push({
        path:'/login'
      })
    },
  }
}
</script>
<style lang="less" scoped>

</style>
