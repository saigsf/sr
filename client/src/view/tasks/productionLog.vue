<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>生产日志管理列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="showDialog">字段筛选</el-button>
      <el-button type="primary" size="mini" icon="el-icon-download">导出日志</el-button>
    </el-row>
    <MyTable
      :column="column"
      :data="data"
      :operation="operation"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteUser"
      @update="showDialog"
      @select="handleSelectionChange">
    </MyTable>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <MyForm :form="form" :formData="formData" :formItem="formItem" @submit="submit" @cancle="cancle"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
// import API from '@/api/user.js'
import {getField, getFormField} from '@/assets/json/index.js'
export default {
  name: 'UsersList',
  data () {
    return {
      dialogTitle: '字段筛选',
      dialogVisible: false,
      multipleSelection: [],
      form: {
        title: '',
        ref: 'form1',
        showTitle: false,
        labelWidth: '80px',
        labelPositon: 'right',
        width: 100,
        column: 1,
        hasSubmit: true,
        submitText: '提交',
        cancleText: '取消'
      },
      formItem: [],
      formData: {},
      operation: { // 操作按钮
        show: false
      },
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 10
    }
  },
  created () {
    this.init()
    this.getUserList()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('productionLog')
      // // 获取form字段
      this.formItem = getFormField('productionLog', 'item')
      this.formData = getFormField('productionLog', 'data')
    },
    // 表单提交
    submit (form) {
    },
    // 表单取消提交
    cancle (form) {
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      done()
    },
    getUserList () {
      for (let i = 0; i < this.pageSize; i++) {
        this.data.push({
          uid: i + 1,
          operationTime: '2018-01-01',
          operator: 'sdfas',
          projectName: 'sdfas',
          tcuCode: 'wereq',
          productiveTask: 'wereq',
          flashResults: 'wereq',
          serialNumber: 'wereq',
          batchNumber: '01'
        })
      }
    },
    // 删除用户
    deleteUser (row) {
      this.$message({
        message: '正在执行删除操作···',
        type: 'warning'
      })
    },
    // 批量删除
    deleteBatch () {
      var id = ''
      this.multipleSelection.forEach(item => {
        id += item.uid + ','
      })
      if (id) {
        this.deleteUser({uid: id.slice(0, id.length - 1)})
      } else {
        this.$message({
          message: '请至少选择一个用户',
          type: 'warning'
        })
      }
    },
    // 显示弹框
    showDialog (row) {
      if (row.uid) {
        this.form.formItem.forEach(item => {
          item.value = row[item.name]
          if (item.name === 'roles') {
            item.value = item.value.split(',')
          }
        })
        this.queryType = 'updateUserInfo'
      } else {
        this.queryType = 'addUser'
      }
      this.dialogVisible = true
    },
    // 获取选中行
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (index) {
      this.currentPage = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
