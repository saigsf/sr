<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>生产日志管理</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <a :href="downLoadUrl">
        <el-button type="primary" size="mini" icon="el-icon-download">导出日志</el-button>
      </a>
      <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="showDialog">字段筛选</el-button>
    </el-row>
    <MyTable
      :multiple="false"
      :column="column"
      :data="data"
      :operation="operation"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @select="handleSelectionChange">
    </MyTable>
    <el-dialog
      width="40%"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <MyForm :form="form" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import API from '@/api/task.js'
import {getField, getFormField} from '@/assets/json/index.js'
import { getPageSize, px2rem } from '@/plugins/util.js'
import apiConfig from '../../../config/api.config'
export default {
  name: 'ProductionLog',
  data () {
    var form = {
      ref: 'productionLog',
      showTitle: false,
      labelWidth: px2rem(100),
      labelPositon: 'right',
      width: '100%',
      column: 1,
      hasSubmit: true,
      submitText: '提交'
    }
    return {
      dialogTitle: '字段筛选',
      dialogVisible: false,
      downLoadUrl: apiConfig.baseURl + '/tasklog/getExcel',
      multipleSelection: [],
      form: form,
      formItem: [],
      formData: {},
      operation: {
        show: false
      },
      column: [],
      data: [],
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.init()
  },
  activated () {
    this.getData()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('productionLog')
      // // 获取form字段, "supCode", "tagNumber", "tagLsNo", "wtLsNo"
      this.formItem = getFormField('productionLog', 'item')
      this.formData = getFormField('productionLog', 'data')
      this.submit()
    },
    // 添加数据
    showDialog () {
      this.dialogVisible = true
    },
    // 表单提交
    submit () {
      this.column.forEach(item => {
        var show = false
        for (let i = 0; i < this.formData.fieldFilter.length; i++) {
          const citem = this.formData.fieldFilter[i];
          if(item.prop == citem) {
            show = true
          }
        }
        item.show = show
      });
      this.dialogVisible = false
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      done()
    },
    // 获取数据
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      API.getProductionLog(config).then(res => {
        console.log(res)
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    // 获取选中行
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (index) {
      this.currentPage = index
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
