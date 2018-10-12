<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <h5>生产任务管理列表</h5>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加任务</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除任务</el-button>
      <el-button type="primary" size="mini" icon="el-icon-edit">任务挂起</el-button>
    </el-row>
    <MyTable
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="true"
      :operation="operation"
      :column="column"
      :data="data"
      @delete="deleteRow"
      @update="showDialog"
      @select="handleSelectionChange">
    </MyTable>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="30%"
      :before-close="handleClose">
      <MyForm :form="form" ref="form" :formData="formData" :formItem="formItem" @submit="submit" @cancle="cancle"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import {getField, getFormField} from '@/assets/json/index.js'
import { dateFtt } from '@/plugins/util.js'
export default {
  name: 'TaskList',
  data () {
    return {
      operation: {
        show: true,
        fixed: false,
        size: 'mini',
        width: 'auto',
        minWidth: 100,
        label: '操作',
        btns: [
          {
            type: 'text',
            size: 'mini',
            content: '编辑',
            icon: 'el-icon-edit',
            handle: 'update'
          },
          {
            type: 'text',
            size: 'mini',
            content: '查看',
            icon: 'el-icon-delete',
            handle: 'delete'
          }
        ]
      }, // 操作按钮
      column: [],
      data: [],
      dialogTitle: '添加生产任务',
      dialogVisible: false,
      multipleSelection: [],
      form: {
        title: '',
        ref: 'form1',
        showTitle: false,
        labelWidth: '80px',
        labelPositon: 'right',
        width: '80%',
        column: 1,
        hasSubmit: true,
        submitText: '提交',
        cancleText: '取消'
      },
      formItem: [],
      formData: {}
    }
  },
  created () {
    this.fieldInit()
    this.formInit()
    this.getData()
  },
  methods: {
    // table字段初始化
    fieldInit () {
      // 获取字段
      this.column = getField('task')
    },
    // 表单数据初始化
    formInit () {
      // 获取form字段
      this.formItem = getFormField('productionTask', 'item')
      this.formData = getFormField('productionTask', 'data')
    },
    // 表单提交
    submit () {
      this.dialogVisible = false
      console.log(this.formData)
    },
    // 表单取消提交
    cancle () {
      this.dialogVisible = false
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      done()
    },
    // 删除用户
    deleteRow (row) {
      console.log(row)
      // this.$message({
      //   message: '正在执行删除' + row.uid + '操作···',
      //   type: 'warning'
      // })
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 批量删除
    deleteBatch () {
      var id = ''
      this.multipleSelection.forEach(item => {
        id += item.uid + ','
      })
      console.log(id)
      if (id) {
        this.deleteRow({uid: id.slice(0, id.length - 1)})
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
        // 数据回显
        for (const key in this.formData) {
          if (this.formData.hasOwnProperty(key)) {
            const item = this.formData[key]
            if (item instanceof Array) {
              this.formData[key] = row[key].split(',')
            } else {
              this.formData[key] = row[key]
            }
          }
        }
      } else {}
      this.dialogVisible = true
    },
    // 获取选中行
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 获取数据
    getData () {
      for (let i = 0; i < 9; i++) {
        this.data.push({
          uid: i + 1,
          projectName: 'sdfsdf',
          productionDate: dateFtt('yyyy-MM-dd', new Date()),
          tcuCode: 'sdfer23',
          batch: '1',
          batchNumber: '12',
          creater: 'sresr',
          createTime: dateFtt('yyyy-MM-dd', new Date()),
          finishedNumber: '12',
          status: '完成',
          flowCode: '12312'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
