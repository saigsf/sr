<template>
  <div class="aside">
    <div class="aside-logo">
      <h1>盛瑞后台管理</h1>
    </div>
    <el-menu
      :default-active="currentActive"
      class="el-menu-aside"
      :router="hasRouter"
      :unique-opened="unique"
      :collapse="isCollapse"
      text-color="#fff"
      active-text-color="#ffd04b">
      <template v-for="(item, index) in navList">
        <el-submenu v-if="!item.meta.leaf && item.meta.show" :index="index+''" :key="index">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="(citem, index) in item.children" :key="index" :index="citem.path">
            <i :class="citem.meta.icon"></i>
            <span>{{citem.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else-if="item.meta.leaf && item.meta.show" :index="item.path" :key="index">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavAside',
  data () {
    return {
      isCollapse: false,
      hasRouter: true,
      unique: true,
      navList: [],
      currentActive: '/'
    }
  },
  created () {
    this.getNavList()
    this.resetCurrent()
  },
  mounted () {},
  methods: {
    getNavList () {
      var routerList = this.$router.options.routes
      for (let i = 0; i < routerList.length; i++) {
        const item = routerList[i]
        if (item.name === 'Home') {
          this.navList = item.children
        }
      }
    },
    resetCurrent () {
      this.currentActive = this.$router.history.current.path
    }
  },
  watch: {
    $route (to, from) {
      this.currentActive = to.fullPath
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
.aside {
  position: relative;
  height: 100%;
  width: 100%;
  &>.el-menu {
    width: 100%;
    position: absolute;
    top: 140px;
    bottom: 60px;
  }
}
.aside-logo {
  line-height: $tsalh;
  background-color: $tbcl;
  text-align: right;
  padding-right: 20px;
  h1 {
    font-size: 24px;
  }
}
</style>
