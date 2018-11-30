<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <h5>生产任务管理</h5>
    </el-row>
    <!-- 按钮操作 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加任务</el-button>
        <!-- <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除任务</el-button> -->
        <!-- <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="hangUpBatch">任务挂起</el-button> -->
        <!-- <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="cancleHangUpBatch">取消挂起</el-button> -->
        <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="beforeFilter">字段筛选</el-button>
      </el-col>
      <el-col :span="12">
        <MySearch class="search" :formData="searchFormData" :formItem="searchFormItem" @submit="searchSubmit"></MySearch>
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
      @hangUp="hangUpConfirm"
      @cancleHangUp="cancleHangUpConfirm"
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
      :type="confirmType"
      :title="confirmTitle"
      :content="confirmContent">
    </MyConfirm>
  </div>
</template>

<script>
import API from '@/api/task.js'
import {getField, getFormField, getSearchField} from '@/assets/json/index.js'
import { getPageSize, px2rem, rem2px } from '@/plugins/util.js'
import { setTimeout } from 'timers';
export default {
  name: 'TaskList',
  data () {
    // 表单配置
    var form = {
      title: '',
      ref: 'form1',
      showTitle: false,
      labelWidth: px2rem(140),
      labelPositon: 'right',
      width: '80%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
      cancleText: '取消'
    }
    // 表格操作配置
    var operation = {
      nowPage: 'taskList',
      show: true,
      fixed: false,
      size: 'mini',
      width: rem2px(px2rem(140)),
      minWidth: 100,
      label: '操作',
      btns: [
        {
          type: 'text',
          size: 'mini',
          content: '挂起',
          icon: 'el-icon-edit-outline',
          handle: 'hangUp'
        },
        {
          type: 'text',
          size: 'mini',
          content: '取消',
          icon: 'el-icon-edit-outline',
          handle: 'cancleHangUp'
        },
        {
          type: 'text',
          size: 'mini',
          content: '编辑',
          icon: 'el-icon-edit-outline',
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
    return {
      confirmType: 'warning',
      confirmTitle: '提示信息',
      confirmContent: '此操作将永久删除该文件, 是否继续?',
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
      filterFormItem: [],
      filterFormData: {},
      isFilter: false,
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: 'saveTask',
      searchFormData: {},
      searchFormItem: [],
      shengruiScript: [],
      providerScript: []
    }
  },
  created () {
    this.filterFormInit()
    this.fieldInit()
    this.formInit()
    this.searchFormInit()
  },
  mounted () {
    this.resetForm()
  },
  activated () {
    this.getProject()
    this.getShengruiScript()
    this.getProviderScript()
    this.getData()
  },
  methods: {
    // table字段初始化
    fieldInit () {
      // 获取字段
      var column = getField('task')
      column.forEach(item => {
        if(item.width != 'auto') {
          item.width = rem2px(px2rem(item.width))
        }
      });
      this.column = column
      this.toFilter()
    },
    // 表单数据初始化
    formInit () {
      // 获取form字段
      this.formItem = getFormField('task', 'item')
      this.formData = getFormField('task', 'data')
    },
    filterFormInit () {
      this.filterFormItem = getFormField('taskFilter', 'item')
      this.filterFormData = getFormField('taskFilter', 'data')
    },
    searchFormInit () {
      this.searchFormItem = getSearchField('task', 'item')
      this.searchFormData = getSearchField('task', 'data')
      console.log(this.searchFormInit)
    },
    // 获取盛瑞脚本
    getShengruiScript() {
      API.getFillAll({type: 2}).then((res) => {
        this.shengruiScript = res.data
        this.formItem.forEach(item => {
          if(item.name == 'shengruiScriptUrl') {
            item.options = res.data
          }
        })
      })
    },
    // 获取客户脚本
    getProviderScript() {
      API.getFillAll({type: 3}).then((res) => {
        this.providerScript = res.data
        this.formItem.forEach(item => {
          if(item.name == 'providerScriptUrl') {
            item.options = res.data
          }
        })
      })
    },
    // 获取项目列表
    getProject () {
      API.getProjectAll().then(res => {
        this.formItem.forEach(item => {
          if (item.name === 'projectId') {
            item.options = res.data
          }
        })
      }).catch(err => {})
    },
    // 添加数据
    showDialog () {
      this.isFilter = false
      this.formInit()
      this.dialogTitle = '添加生产任务'
      this.type = 'saveTask'
      this.dialogVisible = true
    },
    // 更新数据
    update (row) {
      this.isFilter = false
      this.formInit()
      this.dialogTitle = '添加生产任务'
      this.type = 'updateTaskById'
      this.dialogVisible = true
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          if(key === 'id') {
            this.formData[key] = row.taskId
          } else if (key === 'shengruiScriptId') {
            this.formData[key] = row.shengruiScriptUrl
          } else if (key === 'providerScriptId') {
            this.formData[key] = row.providerScriptUrl
          } else {
            this.formData[key] = row[key]
          }
        }
      }
    },
    // 提交数据
    submit () {
      if(this.isFilter) {
        this.toFilter()
      } else {
        console.log(this.formData)
        // return
        this.formData.shengruiScriptId = ''
        this.formData.providerScriptId = ''
        this.shengruiScript.forEach(item => {
          
          if (this.formData.shengruiScriptUrl == item.name) {
            console.log(item.name, item.id)
            this.formData.shengruiScriptId = item.id
          }
        })
        
        this.providerScript.forEach(item => {
          
          if (this.formData.providerScriptUrl == item.name) {
            console.log(item.name, item.id)
            this.formData.providerScriptId = item.id
          }
        })
        setTimeout(() => {
          API[this.type](this.formData).then(res => {
            this.dialogVisible = false
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.getData()
            this.getShengruiScript()
            this.getProviderScript()
          })
        }, 50);
        
      }
      
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
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
      config = $.extend(config, this.searchFormData)
      // 接口调用
      API.getTaskList(config).then(res => {
        console.log(res)
        this.data = res.data.list
        this.total = res.data.total
      }).catch(err => {})
    },
    // 删除
    delete () {
      var _this = this
      API.deleteTaskById({ids: _this.ids}).then(res => {
        this.ids = null
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getData()
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
      this.confirmContent = '此操作将永久删除该文件, 是否继续?'
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.delete, _this.cancle)
      }, 100)
      
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
              message: res.msg,
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
      this.confirmContent = '是否执行挂起操作, 是否继续?'
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.hangUp, _this.cancle)
      }, 100)
      
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
    // 挂起任务
    cancleHangUp () {
      var _this = this
      API.resetTaskById({ids: _this.ids}).then(res => {
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
              message: res.msg,
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
    cancleHangUpConfirm (row) {
      var _this = this
      var ids = []
      if (typeof row.taskId === 'number') {
        ids.push(row.taskId)
      } else {
        ids = row.taskId
      }
      this.ids = ids.join()
      this.confirmContent = '是否执行取消挂起操作, 是否继续?'
      setTimeout(() => {
        this.$refs.myconfirm.confirm(_this.cancleHangUp, _this.cancle)
      }, 100)
      
    },
    // 批量挂起
    cancleHangUpBatch () {
      var id = []
      this.multipleSelection.forEach(item => {
        id.push(item.taskId)
      })
      if (id.length > 0) {
        this.cancleHangUpConfirm({taskId: id})
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
    },
    // 搜索
    searchSubmit () {
      this.getData()
    },
    beforeFilter() {
      this.isFilter = true
      this.formItem = this.filterFormItem
      this.formData = this.filterFormData
      this.dialogTitle = '字段筛选'
      this.dialogVisible = true
    },
    toFilter () {
      console.log(this.filterFormData)
      this.column.forEach(item => {
        var show = false
        for (let i = 0; i < this.filterFormData.fieldFilter.length; i++) {
          const citem = this.filterFormData.fieldFilter[i];
          if(item.prop == citem) {
            show = true
          }
        }
        item.show = show
      });
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
