<template>
  <div class="tasks">
    <transition name="slide-left" mode="out-in">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Tasks'
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';

</style>
