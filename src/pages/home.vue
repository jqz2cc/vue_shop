<template>
  <el-container class="home-container">
    <el-header>
      <div class="title">
        <img src="@/assets/imgs/dog.png"
             alt="">
        JQZ电商后台管理系统
      </div>
      <el-button type="info"
                 @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggel_btn"
             @click="isCollapse=!isCollapse">
             <i class="el-icon-s-fold" v-if="!isCollapse"></i>
             <i class="el-icon-s-unfold" v-else></i>
             </div>
        <el-menu class="el-menu-vertical-demo"
                 background-color="#333744"
                 text-color="#fff"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition='false'
                 :router="true"
                 :default-active='activePath'
                 active-text-color="#ffd04b">
          <!-- 一级菜单 -->
          <el-submenu v-for="(item,index) in menuList"
                      :key="item.id"
                      :index="index+''">
            <template slot="title">
              <i :class="iconList[index]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="(it,ind) in item.children"
                          :key="it.id"
                          :index="'/'+it.path"
                          @click="saveNaveState(it.path,index,ind)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{it.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right"
                       v-if="showbreadcrumb && menuList.length">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{menuList[currentNemuIndex].authName}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{menuList[currentNemuIndex].children[currentNemuItemIndex].authName}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import { getMenus } from './../request/api.js'
  export default {
    data() {
      return {
        menuList: [],
        iconList: [
          'el-icon-user-solid', 'el-icon-s-cooperation', 'el-icon-s-goods', 'el-icon-s-order', 'el-icon-s-marketing'
        ],
        isCollapse: false,
        activePath: '',
        showbreadcrumb: false,
        currentNemuIndex: 0,
        currentNemuItemIndex: 0
      }
    },
    methods: {
      logout() {
        sessionStorage.clear();
        this.$router.push({
          path: '/login'
        })
      },
      toggleBtn() {

      },
      saveNaveState(path, index, ind) {
        window.sessionStorage.setItem('activePath', '/' + path)
        this.activePath = sessionStorage.getItem('activePath')
        this.showbreadcrumb = this.$router.history.current.path !== '/welcome';
        this.currentNemuIndex = index;
        this.currentNemuItemIndex = ind;
        sessionStorage.setItem('currentNemuIndex', this.currentNemuIndex)
        sessionStorage.setItem('currentNemuItemIndex', this.currentNemuItemIndex)
      }
    },
    created() {
      this.activePath = sessionStorage.getItem('activePath')
      this.showbreadcrumb = this.$router.history.current.path !== '/welcome';
      if (sessionStorage.getItem('currentNemuItemIndex') || sessionStorage.getItem('currentNemuIndex')) {

        this.currentNemuItemIndex = sessionStorage.getItem('currentNemuItemIndex') || 0;
        this.currentNemuIndex = sessionStorage.getItem('currentNemuIndex') || 0;
      }
      getMenus().then(res => {
        if (res.meta.status == 200) {
          this.menuList = res.data;
        }
      })
    },
  }
</script>

<style lang="less" scoped>
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      margin-right: 10px;
    }
    .title {
      display: flex;
      align-items: center;
      color: #f5f5f5;

    }
  }
  .el-aside {
    background-color: #333744;
    overflow-x: hidden;
    .el-menu {
      border-right: none;
    }
  }
  .el-main {
    background-color: #f5f5f5;
  }
  .home-container {
    height: 100%;
  }

  .toggel_btn {
    text-align: center;
    color: #f5f5f5;
    cursor: pointer;
    padding: 10px 0;
  }
</style>
