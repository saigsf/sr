<template>
  <div id="app">
    <!-- <transition name="slide-left" mode="out-in"> -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <!-- </transition> -->
  </div>
</template>

<script>
import { px2rem, getCookie } from '@/plugins/util'
export default {
  name: 'App',
  created () {},
  methods: {
    goto (path) {
      this.$router.push({path: path})
    }
  }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
