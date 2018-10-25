<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>项目详情</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加标定文件</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除标定文件</el-button>
      </el-col>
      <el-col :span="4" :offset="6">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" class="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <!-- 表格数据 -->
    <MyTable
      :column="column"
      :data="data"
      :operation="operation"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @enable="enableConfirm"
      @disable="disableConfirm"
      @select="handleSelectionChange">
    </MyTable>
    <!-- 对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <MyForm ref="myform" :form="form" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
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
export default {
  name: 'ProjectDetail',
  data () {
    // 表单配置
    var form = {
      title: '',
      ref: 'project',
      showTitle: false,
      labelWidth: '100px',
      labelPositon: 'right',
      width: '90%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
      cancleText: '取消'
    }
    // 表格数据操作
    var operation = {
      show: true,
      fixed: 'right',
      size: 'mini',
      width: 'auto',
      minWidth: 100,
      label: '操作',
      btns: [
        {
          type: 'text',
          size: 'mini',
          content: '启用',
          icon: 'el-icon-edit-outline',
          handle: 'enable'
        },
        {
          type: 'text',
          size: 'mini',
          content: '禁用',
          icon: 'el-icon-edit-outline',
          handle: 'disable'
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
      dialogTitle: '添加标定文件',
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      formItem: [],
      formData: {},
      operation: operation,
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 0,
      search: '',
      type: 'getProjectAssociate',
      project: {}
    }
  },
  created () {
    this.init()
    this.getTCU()
    this.getFile()
    // this.getData()
  },
  activated() {
    this.getData()
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('projectDetail')
      // 获取form字段
      this.formItem = getFormField('projectDetail', 'item')
      this.formData = getFormField('projectDetail', 'data')
    },
    getTCU () {
      API.getTCUAll().then(res => {
        this.formItem.forEach(item => {
          if (item.name === 'tId') {
            item.options = res.data
          }
        })
      }).catch(err => {})
    },
    getFile () {
      API.getFillAll().then(res => {
        this.formItem.forEach(item => {
          if (item.name === 'fId') {
            item.options = res.data
          }
        })
      }).catch(err => {})
    },
    // 添加数据
    showDialog () {
      this.dialogVisible = true
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
      this.init()
      this.resetForm()
      done()
    },
    // 获取数据
    getData () {
      var _this = this
      var id = this.$route.params.id
      this.formData.pId = id
      var config = {
        id: id
      }
      // 添加查询字段

      // 接口调用
      API.getProjectDetailById(config).then(res => {
        switch (res.code) {
          case 0:
            this.$message({
              message: res.msg,
              type: 'error'
            })
            break;
          case 1:
            this.data = res.data
            this.total = 0
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
      API.deleteAssociate({ids: _this.ids}).then(res => {
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
        id.push(item.ptfId)
      })
      if (id.length > 0) {
        this.deleteConfirm({ptfId: id})
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
      if (typeof row.ptfId === 'number') {
        ids.push(row.ptfId)
      } else {
        ids = row.ptfId
      }
      this.ids = ids.join()
      this.$refs.myconfirm.confirm(_this.delete, _this.cancle)
    },
    // 取消
    cancle () {
      this.ids = null
    },
    // 启用
    enable () {
      var _this = this
      API.setProjectEnable(_this.project).then(res => {
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
      })
    },
    // 启用控制
    enableConfirm (row) {
      var _this = this
      _this.project = {
        pId: row.projectId,
        ptfId: row.ptfId
      }
      _this.confirm = {
        type: 'warning',
        title: '提示信息',
        content: '启用这条数据, 是否继续?'
      }
      this.$refs.myconfirm.confirm(_this.enable, _this.cancle)
    },
    // 禁用
    disable () {
      var _this = this
      API.setProjectDisable(_this.project).then(res => {
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
      })
    },
    // 禁用控制
    disableConfirm (row) {
      var _this = this
      this.project = {
        pId: row.projectId,
        ptfId: row.ptfId
      }
      this.confirm = {
        type: 'warning',
        title: '提示信息',
        content: '禁用这条数据, 是否继续?'
      }
      this.$refs.myconfirm.confirm(_this.disable, _this.cancle)
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
