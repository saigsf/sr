<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-title"></div>
      <div class="login-box">
        <div class="login-logo"></div>
        <div class="login-form">
          <MyForm :form="form" ref="myform" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api/user.js'
import { getFormField } from '@/assets/json/index.js'
import {
  dateFtt,
  px2rem,
  setCookie
} from '@/plugins/util.js'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        title: '',
        ref: 'login',
        showTitle: false,
        labelWidth: px2rem(60),
        labelPositon: 'right',
        submitText: '登录',
        hasSubmit: true,
        width: '90%',
        column: 1
      },
      formItem: [],
      formData: {},
      path: '/home'
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.path =  this.$route.query.redirect ? this.$route.query.redirect : '/home'
  },
  methods: {
    init () {
      this.formItem = getFormField('login', 'item')
      this.formData = getFormField('login', 'data')  
    },
    // 提交数据
    submit () {
      var _this = this
      console.log(this.formData)
      API.login(this.formData).then(res => {
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1: 
            setCookie('username', res.data.username, 7)
            setCookie('nickname', res.data.nickname, 7)
            setCookie('token', res.data.token, 7)
            _this.$router.push({path: _this.path})
            break;
        
          default:
            break;
        }
      }).catch(err => {})
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../assets/img/login_bg.png) no-repeat center;
  background-size: cover;
  &-wrapper {
    width: 100%;
    @include px2rem(height, 406);
    background: url(../assets/img/middle_bg.png) no-repeat center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  &-title {
    @include px2rem(width, 663);
    @include px2rem(height, 53);
    position: absolute;
    left: 40%;
    top: -70px;
    background: url(../assets/img/login_title.png) no-repeat center;
    background-size: cover;
  }
  &-box {
    @include px2rem(width, 500);
    @include px2rem(height, 300);
    position: absolute;
    left: 45%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
    background: linear-gradient(bottom, #e6fee5, #f5f9ff);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, .25)
  }
  &-logo {
    float: left;
    width: 40%;
    height: 100%;
    background: url(../assets/img/userlogo.png) no-repeat center;
    @include px2rem(background-size, 130)
  }
  &-form {
    float: left;
    width: 60%;
    height: 100%;
    position: relative;
    .form {
      position: absolute;
      top: 50%;
      transform: translateY(-50%)
    }
  }
}
</style>
