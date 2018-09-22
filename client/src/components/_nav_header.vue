<template>
  <div class="header">
    <div class="header-content">
      <el-badge is-dot class="item">
        <el-button size="small" icon="el-icon-bell"></el-button>
      </el-badge>
      <el-badge is-dot class="item">
        <el-button size="small" icon="el-icon-message"></el-button>
      </el-badge>
      <el-badge is-dot class="item">
        <el-button size="small" icon="el-icon-setting"></el-button>
      </el-badge>
      <el-input
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="search">
      </el-input>
    </div>
    <div class="header-logo">
      <el-dropdown>
        <span class="el-dropdown-link">
          用户名<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>信息</el-dropdown-item>
          <el-dropdown-item>推出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img class="user-logo" src="../assets/img/user.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavHeader',
  data () {
    return {
      search: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
.header {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 0 20px;
  &-logo {
    padding: 0 20px;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: $tsaw;
    background-color: $tbcl;
    border-bottom-left-radius: 10px;
  }
  .el-dropdown {
    line-height: normal
  }
  .el-dropdown .el-dropdown-link {
    color: #fff;
  }
  .user-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #eee;
    margin-left: 20px;
  }
  .el-badge  {
    line-height: normal;
    &:not(:last-of-type) {
      margin-right: 40px;
    }
  }
  .el-button {
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 24px;
  }
  .el-input {
    line-height: normal;
    width: auto;
    border: none;
    box-shadow: 3px 3px 4px rgba($color: #000000, $alpha: .3) inset;
    background-color: #fff;
  }
}
</style>
