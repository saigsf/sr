<template>
  <div class="header">
    <div class="header-logo">
      <h1>盛瑞后台管理系统</h1>
    </div>
    <div class="header-content">
      <el-input placeholder="请输入公司员工" v-model="search" size="mini" class="input-with-select">
        <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select> -->
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="header-user">
      <p>欢迎您，<span>{{username}}</span></p>
      <div class="login-out" @click="logout">
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/api/user.js'
import {
  dateFtt,
  px2rem,
  getCookie,
  delCookie
} from '@/plugins/util.js'
export default {
  name: 'NavHeader',
  data () {
    return {
      search: '',
      username: '系统管理员'
    }
  },
  activated () {
    this.getUserName()
  },
  methods: {
    getUserName () {
      this.username = unescape(getCookie('username')) 
    },
    logout () {
      var _this = this
      API.logout().then(res => {
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1:
            delCookie('username')
            delCookie('token')
            _this.$router.push({
              path: '/login',
              query: {
                redirect: _this.$route.fullPath
              }
            })
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
.header {
  height: 100%;
  width: 100%;
  position: relative;
  @include padding(0, 20);
  &-logo {
    @include px2rem(width, 292);
    @include px2rem(padding-left, 40);
    height: 100%;
    float: left;
    color: #fff;
    font-family: 'hanYi';
    background: url(../assets/img/logo.png) no-repeat center left;
    @include px2rem(background-size, 30);
    h1 {
      @include px2rem(font-size, 30);
    }
  }
  &-content {
    float: left;
    height: 100%;
  }
  &-user {
    // @include px2rem(min-width, 250);
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    .login-out {
      position: relative;
      // top: 0;
      // right: 0;
      // bottom: 0;
      float: right;
      @include px2rem(width, 102);
      height: 100%;
      background-color: $tc;
      color: #fff;
      text-align: center;
      cursor: pointer;
      transition: all .5s;
      &:before {
        content: "";
        vertical-align: middle;
        display: inline-block;
        @include px2rem(width, 35);
        @include px2rem(height, 35);
        background: url(../assets/img/login.png) no-repeat center;
        background-size: cover;
      }
      &:hover {
        background-color: $tc7;
      }
      span {
        line-height: normal;
        width: 100%;
        position: absolute;
        left: 0;
        @include px2rem(bottom, 10);
        @include px2rem(font-size, 14);
      }
    }
    p {
      color: #fff;
      float: left;
      @include px2rem(font-size, 16);
      @include px2rem(margin-right, 10);
      span {
        color: $tc;
      }
    }
  }
  .el-input {
    border-radius: 21px;
    background-color: #fff;
    overflow: hidden;
    @include px2rem(height, 40);
    @include px2rem(width, 443);
    @include px2rem(margin-left, 86);
  }
}
</style>
