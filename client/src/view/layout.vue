<template>
  <el-container>
    <el-header :height="headerHeight">
      <NavHeader></NavHeader>
    </el-header>
    <el-container>
      <el-aside :width="asideWidth">
        <NavAside></NavAside>
      </el-aside>
      <el-main>
        <!-- <transition name="slide-left" mode="out-in">
          <keep-alive>
            <router-view class="child-view"></router-view>
          </keep-alive>
        </transition> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { px2rem } from '@/plugins/util'
export default {
  name: 'Layout',
  data () {
    return {
      headerHeight: px2rem(95),
      asideWidth: px2rem(312)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
.layout {
  width: 100%;
  height: 100%;
}
</style>
