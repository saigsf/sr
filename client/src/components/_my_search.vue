<template>
  <el-form
    :inline="true"
    ref="searchForm"
    label-width="0px"
    :model="formData"
    @submit.native.prevent>
    <template v-for="(item, index) in formItem">
      <el-form-item v-if="item.type == 'select' && item.show" :key="index">
        <el-select v-model="formData[item.name]" size="mini" placeholder="请选择">
          <el-option
            v-for="(option) in item.options"
            :key="option.value"
            :label="option.label"
            :value="option.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-else-if="item.type == 'text' && item.show" :key="index">
        <el-input
          v-model="formData[item.name]"
          size="mini"
          :name="item.name"
          :placeholder="item.placeholder"
          @keyup.enter.native="onSubmit">
        </el-input>
      </el-form-item>
      <span class="line" :key="item.name" v-if="(index != formItem.length-1) && item.show">-</span>
    </template>
    <el-form-item>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'search',
  props: {
    formItem: {
      type: Array,
      default: () => [Object]
    },
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      form: {}
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/mixins.scss';
@import '@/assets/base/variables.scss';
.el-form-item {
  margin: 0;
  &:last-of-type {
    @include px2rem(margin-left, 15)
  }
}
</style>
