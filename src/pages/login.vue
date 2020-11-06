<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="@/assets/logo.png"
             alt="">
      </div>
      <div class="form_login">
        <el-form ref="form">
          <el-form-item>
            <el-input v-model="loginForm.username"
                      placeholder="请输入用户名"
                      prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password"
                      :maxlength="16"
                      :minlength="6"
                      type='password'
                      placeholder="请输入密码"
                      prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary"
                       @click="login">登录</el-button>
            <el-button type="info"
                       @click="resert">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { login } from './../request/api.js'
  export default {
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456',
        }
      }
    },
    methods: {
      login() {
        if (this.loginForm.password && this.loginForm.username) {
          login(this.loginForm).then(res => {
            if (res.meta.status==200 && res.data.token) {
              this.$message({
                message: '登录成功',
                type: 'success',
                center: true
              })
              // 保存token到sessionStorage中
              sessionStorage.setItem('token', res.data.token);
              this.$router.push({
                path: '/home'
              })
            }
          })
        }
      },
      resert() {
        this.loginForm.username = '';
        this.loginForm.password = '';
      },
    },

  }
</script>
<style lang="less" scoped>
  .login_container {
    background-color: #3c5d7f;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-sizing: border-box;
      padding: 10px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      box-shadow: 1px 1px 1px #eee;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .form_login {
      margin-top: 80px;
      box-sizing: border-box;
      padding: 0 20px;
    }
  }
  .btns {
    display: flex;
    justify-content: center;
  }
</style>
