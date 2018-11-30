<template>
  <div class="header">
    <div class="header-logo">
      <h1>盛瑞后台管理系统</h1>
    </div>
    <div class="header-content" v-if="false">
      <el-input placeholder="请输入公司员工" v-model="search" size="mini" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="header-user">
      <p>欢迎您，
        <span>{{nickname}}</span>
      </p>
      <div class="login-out">
        <div class="logout" @click="logout">
          <span>退出</span>
        </div>
        <div class="other">
          <div class="other-item" @click="changePsd">更改密码</div>
          <div class="other-item" @click="logout">退出登录</div>
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
      :before-close="handleClose">
      <MyForm ref="myform" :form="form" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import API from "@/api/user.js";
import {getField, getFormField, getSearchField} from '@/assets/json/index.js'
import { dateFtt, px2rem, getCookie, delCookie } from "@/plugins/util.js";
export default {
  name: "NavHeader",
  data() {
     // 表单配置
    var form = {
      title: '',
      ref: 'changePassword',
      showTitle: false,
      labelWidth: px2rem(120),
      labelPositon: 'right',
      width: '90%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
      cancleText: '取消'
    }
    return {
      dialogTitle: '更改密码',
      dialogVisible: false,
      form: form,
      formItem: [],
      formData: {},
      search: "",
      username: "admin",
      nickname: "系统管理员",
    };
  },
  created() {
    this.init()
  },
  activated() {
    this.getUserName();
  },
  methods: {
    init() {
      this.formItem = getFormField('changePassword', 'item')
      this.formData = getFormField('changePassword', 'data')
    },
    getUserName() {
      this.nickname = unescape(getCookie("nickname"));
      this.username = unescape(getCookie("username"));
      this.formData.username = this.username
    },
    logout() {
      var _this = this;
      API.logout()
        .then(res => {
          delCookie("username");
          delCookie("nickname");
          delCookie("token");
          _this.$router.push({
            path: "/login",
            query: {
              redirect: _this.$route.fullPath
            }
          });
        })
    },
    changePsd() {
      this.dialogVisible = true
    },
    submit() {
      console.log(this.formData)
      API.changePsd(this.formData).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.logout()
      })
    },
    handleClose(done) {
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
      this.init()
      this.resetForm()
      done()
    },
    resetForm () {
      if(this.$refs['myform'] != undefined) {
        this.$refs['myform'].resetForm()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/base/variables.scss";
@import "@/assets/base/mixins.scss";
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
    font-family: "hanYi";
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
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    .login-out {
      position: relative;
      float: right;
      @include px2rem(width, 102);
      height: 100%;
      transition: all 0.5s;
      .logout {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: $tc;
        color: #fff;
        text-align: center;
        cursor: pointer;
        z-index: 111;
        &:before {
          content: "";
          vertical-align: middle;
          display: inline-block;
          @include px2rem(width, 35);
          @include px2rem(height, 35);
          background: url(../assets/img/login.png) no-repeat center;
          background-size: cover;
        }
      }

      span {
        line-height: normal;
        width: 100%;
        position: absolute;
        left: 0;
        @include px2rem(bottom, 10);
        @include px2rem(font-size, 14);
      }
      .other {
        position: absolute;
        right: 0;
        top: px2rem(15);
        width: px2rem(102);
        background-color: #fff;
        text-align: center;
        line-height: px2rem(40);
        font-size: px2rem(14);
        border-bottom: px2rem(1) solid $tc;
        color: #333;
        transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
        &-item {
          cursor: pointer;
          &:hover {
            background-color: #f3f3f3;
            color: $tc
          }
        }
      }
      &:hover {
        .other {
          top: px2rem(95);
        }
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
