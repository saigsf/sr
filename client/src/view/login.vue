<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-title"></div>
      <div class="login-box">
        <div class="login-logo"></div>
        <div class="login-form">
          <MyForm :form="form" @submit="submit" @cancle="cancle"></MyForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        title: '',
        ref: 'login',
        showTitle: false,
        labelWidth: '60px',
        labelPositon: 'right',
        submitText: '登录',
        width: 90,
        column: 1,
        formItem: [
          {
            type: 'text',
            name: 'username',
            placeholder: '请输入用户名',
            value: '',
            width: '100',
            label: '用户名'
          },
          {
            type: 'password',
            name: 'password',
            placeholder: '请输入用户密码',
            value: '',
            width: '100',
            label: '密码'
          }
        ]
      }
    }
  },
  methods: {
    // 表单提交
    submit (form) {
      console.log(form)
      this.$router.push({path: '/'})
    },
    // 表单取消提交
    cancle (form) {
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
  background: url(../../static/img/login_bg.png) no-repeat center;
  background-size: cover;
  &-wrapper {
    width: 100%;
    @include px2rem(height, 406);
    background: url(../../static/img/middle_bg.png) no-repeat center;
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
    background: url(../../static/img/login_title.png) no-repeat center;
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
    background: url(../../static/img/userlogo.png) no-repeat center;
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
