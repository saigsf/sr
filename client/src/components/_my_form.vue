<template>
  <div class="form">
    <el-form
      v-if="!form.isTable"
      :ref="form.ref"
      :label-position="form.labelPosition"
      :inline="false" size="small"
      :style="'width:'+form.width+'%'"
      :model="form"
      :label-width="form.labelWidth">
      <el-row>
      <el-col :span="24/form.column" v-for="(item, index) in form.formItem" :key="index">
      <el-form-item :label="item.label">
        <!-- 上传文件 -->
        <el-input v-if="item.type==='file'"
          :type="item.type"
          :style="'width:'+item.width+'%'"
          v-model="item.value">
        </el-input>
        <!-- 输入框 -->
        <el-input v-else-if="item.type == 'text'"
          :type="item.type"
          :placeholder="item.placeholder"
          :style="'width:'+item.width+'%'"
          v-model="item.value">
        </el-input>
        <!-- 日期选择框 -->
        <el-date-picker v-else-if="item.type == 'date'"
          :type="item.type"
          :placeholder="item.placeholder"
          :value-format="item.formate"
          :style="'width:'+item.width+'%'"
          v-model="item.value">
        </el-date-picker>
        <!-- 时间选择框 -->
        <el-time-picker v-else-if="item.type == 'fixed-time'"
          :type="item.type"
          :placeholder="item.placeholder"
          :style="'width:'+item.width+'%'"
          v-model="item.value">
        </el-time-picker>
        <!-- 日期时间选择器 -->
        <el-date-picker v-else-if="item.type == 'datetime'" v-model="item.value"
          :type="item.type"
          :placeholder="item.placeholder"
          :default-time="item.defaultTime"
          :align="item.align"
          :style="'width:'+item.width+'%'"
          :picker-options="item.pickerOptions">
        </el-date-picker>
        <!-- 开关 -->
        <el-switch v-else-if="item.type=='switch'" v-model="item.value"></el-switch>
        <!-- select选择框 -->
        <el-select v-else-if="item.type=='select'"
          v-model="item.value"
          :style="'width:'+item.width+'%'"
          :placeholder="item.placeholder">
          <el-option v-for="(option, idx) in item.options" :key="idx" :label="option.label" :value="option.value"></el-option>
        </el-select>
        <!-- 复选框 -->
        <el-checkbox-group v-else-if="item.type=='checkbox'" v-model="item.value">
          <el-checkbox v-for="(option, idx) in item.options" :key="idx" :label="option.label"></el-checkbox>
        </el-checkbox-group>
        <!-- 单选 -->
        <el-radio-group v-else-if="item.type=='radio'" v-model="item.value">
          <el-radio v-for="(option, idx) in item.options" :key="idx" :label="option.label"></el-radio>
        </el-radio-group>
        <!-- 文本域 -->
        <el-input v-else-if="item.type=='textarea'"
          :type="item.type"
          v-model="item.value"
          :style="'width:'+item.width+'%'"
          :placeholder="item.placeholder">
        </el-input>
        <!-- 其他 -->
        <el-input v-else :type="item.type" :placeholder="item.placeholder" v-model="item.value"></el-input>
      </el-form-item>
      </el-col>
      </el-row>
    </el-form>
    <el-row class="btns" :style="'width:'+form.width+'%'">
      <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
      <!-- <el-button size="mini" @click="onCancel">取消</el-button> -->
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import {dateFtt} from '@/plugins/util.js'
export default {
  name: "MyForm",
  props: ["form"],
  data() {
    return {
      formData: {}
    };
  },
  created () {},
  activated () {
    this.getSubmitData(true)
  },
  methods: {
    getSubmitData(clear) {
        for (let i = 0; i < this.form.formItem.length; i++) {
          this.form.formItem[i].value = clear ? '' : this.form.formItem[i].value
          this.formData[this.form.formItem[i].name] = this.form.formItem[i].value
        }
    },
    onSubmit() {
      this.getSubmitData()
      this.$emit('submit', this.formData)
    },
    onCancel() {
      this.getSubmitData(true)
      this.$emit('cancle')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/base/index.scss';
.el-row.btns {
  text-align: right;
  margin-top: 40px;
  .el-button {
    background-color: $tbca;
    border-color: $tbca;
    // margin-right: -20px;
    &.el-button--mini {
      padding: 7px 20px;
    }
    &.is-active,
    &:active {
      background-color: rgba(54, 69, 100, .8);
      border-color: rgba(54, 69, 100, .8);
    }
    &:focus,
    &:hover {
      background-color: rgba(54, 69, 100, .8);
      border-color: rgba(54, 69, 100, .8);
    }
  }
}
.el-checkbox {
  margin-left: 0;
  margin-right: 30px
}
</style>