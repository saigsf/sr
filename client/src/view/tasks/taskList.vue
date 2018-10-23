<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <h5>生产任务管理列表</h5>
    </el-row>
    <!-- 按钮操作 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加任务</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除任务</el-button>
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="hangUpBatch">任务挂起</el-button>
      </el-col>
      <el-col :span="4" :offset="6">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" class="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <MyTable
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="true"
      :operation="operation"
      :column="column"
      :data="data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteConfirm"
      @update="update"
      @select="handleSelectionChange">
    </MyTable>
    <!-- 表单提交 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      top="10vh"
      width="30%"
      :before-close="handleClose">
      <MyForm :form="form" ref="myform" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
    </el-dialog>
    <!-- myconfirm -->
    <MyConfirm
      ref="myconfirm"
      :type="confirm.type"
      :title="confirm.title"
      :content="confirm.content">
    </MyConfirm>
  </div>
</template>

<script>
import API from '@/api/task.js'
import {getField, getFormField} from '@/assets/json/index.js'
import { dateFtt, px2rem } from '@/plugins/util.js'
export default {
  name: 'TaskList',
  data () {
    // 表单配置
    var form = {
      title: '',
      ref: 'form1',
      showTitle: false,
      labelWidth: '90px',
      labelPositon: 'right',
      width: '80%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
      cancleText: '取消'
    }
    // 表格操作配置
    var operation = {
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
          content: '删除',
          icon: 'el-icon-delete',
          handle: 'delete'
        }
      ]
    }
    // 确认信息配置
    var confirm = {
      type: 'warning',
      title: '提示信息',
      content: '此操作将永久删除该文件, 是否继续?'
    }
    return {
      confirm: confirm,
      dialogTitle: '添加生产任务',
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      operation: operation, // 操作按钮
      column: [],
      data: [],
      formItem: [],
      formData: {},
      pageSize: 9,
      currentPage: 1,
      total: 0,
      search: '',
      type: 'saveTask'
    }
  },
  created () {
    this.fieldInit()
    this.formInit()
    this.getProject()
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
      this.formItem = getFormField('task', 'item')
      this.formData = getFormField('task', 'data')
    },
    // 获取项目列表
    getProject () {
      API.getProjectAll().then(res => {
        console.log(res.data)
        this.formItem.forEach(item => {
          if (item.name === 'projectId') {
            item.options = res.data
          }
        })
      }).catch(err => {})
    },
    // 添加数据
    showDialog () {
      this.type = 'saveTask'
      this.dialogVisible = true
    },
    // 更新数据
    update (row) {
      this.type = 'updateTaskById'
      this.dialogVisible = true
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = row[key]
        }
      }
    },
    // 提交数据
    submit () {
      API[this.type](this.formData).then(res => {
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1:
            this.dialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getData()
            break;
        
          default:
            break;
        }
      })
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
      this.formInit()
      this.resetForm()
      done()
    },
    // 获取数据
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      // 添加查询字段

      // 接口调用
      API.getTaskList(config).then(res => {
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1:
            this.data = res.data.list
            this.total = res.data.total
            break;
        
          default:
            break;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除
    delete () {
      var _this = this
      API.deleteTaskById({ids: _this.ids}).then(res => {
        _this.ids = null
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1:
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getData()
            break;
        
          default:
            break;
        }
      })
    },
    // 批量删除
    deleteBatch () {
      var id = []
      this.multipleSelection.forEach(item => {
        id.push(item.taskId)
      })
      if (id.length > 0) {
        this.deleteConfirm({taskId: id})
      } else {
        this.$message({
          message: '请至少选择一个选项',
          type: 'warning'
        })
      }
    },
    // 删除确认
    deleteConfirm (row) {
      var _this = this
      var ids = []
      if (typeof row.taskId === 'number') {
        ids.push(row.taskId)
      } else {
        ids = row.taskId
      }
      this.ids = ids.join()
      this.$refs.myconfirm.confirm(_this.delete, _this.cancle)
    },
    // 取消删除
    cancle () {
      this.ids = null
    },
    // 挂起任务
    hangUp () {
      var _this = this
      API.hangUpTaskById({ids: _this.ids}).then(res => {
        _this.ids = null
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1:
            this.$message({
              message: '挂起成功',
              type: 'success'
            })
            this.getData()
            break;
        
          default:
            break;
        }
      }).catch(err => {})
    },
    // 挂起控制
    hangUpConfirm (row) {
      var _this = this
      var ids = []
      if (typeof row.taskId === 'number') {
        ids.push(row.taskId)
      } else {
        ids = row.taskId
      }
      this.ids = ids.join()
      this.confirm = {
        type: 'warning',
        title: '提示信息',
        content: '是否执行挂起操作, 是否继续?'
      }
      this.$refs.myconfirm.confirm(_this.hangUp, _this.cancle)
    },
    // 批量挂起
    hangUpBatch () {
      var id = []
      this.multipleSelection.forEach(item => {
        id.push(item.taskId)
      })
      if (id.length > 0) {
        this.hangUpConfirm({taskId: id})
      } else {
        this.$message({
          message: '请至少选择一个选项',
          type: 'warning'
        })
      }
    },
    // 表单重置
    resetForm () {
      if(this.$refs['myform'] != undefined) {
        this.$refs['myform'].resetForm()
      }
    },
    // 获取选中行
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 分页切换
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
