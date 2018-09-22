<template>
  <el-container>
    <el-aside width="200px">
      <NavAside></NavAside>
    </el-aside>
    <el-container>
      <el-header height="100px">
        <NavHeader></NavHeader>
      </el-header>
      <el-main>
        <transition name="slide-left" mode="out-in">
          <keep-alive>
            <router-view class="child-view"></router-view>
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
.layout {
  width: 100%;
  height: 100%;
}
</style>
