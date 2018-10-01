<template>
  <div class="users">
    <transition name="slide-left" mode="out-in">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Project'
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
