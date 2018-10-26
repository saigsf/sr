<template>
  <div id="app">
    <transition name="slide-left" mode="out-in">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { px2rem, getCookie } from '@/plugins/util'
export default {
  name: 'App',
  created () {
    this.isLogin()
  },
  methods: {
    goto (path) {
      this.$router.push({path: path})
    },
    isLogin () {
      console.log(getCookie('token'))
      if(getCookie('token') === null) {
        this.goto('/login')
      }
    }
  }
}
</script>

<style lang="scss">
// @import '@/assets/base/index.scss';
// @import '@/assets/base/icon.scss';
</style>
