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
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/base/index.scss';
@import './assets/base/icon.scss';
</style>
