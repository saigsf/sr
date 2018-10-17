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
      @delete="deleteConfirm"
      @update="update"
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
      :content="confirm.content"
      @ok="ok" 
      @cancle="cancle">
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
      type: 'saveProject'
    }
  },
  created () {
    this.init()
    this.getData()
    console.log(this.$route.params.id)
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('projectDetail')
      // 获取form字段
      this.formItem = getFormField('projectDetail', 'item')
      this.formData = getFormField('projectDetail', 'data')
    },
    getTCU () {},
    // 表单提交
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
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      // 添加查询字段

      // 接口调用
      API.getProjectList(config).then(res => {
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
    // 删除确认
    deleteConfirm (row) {
      this.getIds(row)
      this.$refs.myconfirm.confirm()
    },
    // 确认
    ok () {
      this.deleteRow()
    },
    // 取消
    cancle () {
      this.ids = null
    },
    // 获取操作数据id集合
    getIds (row) {
      var ids = []
      if (typeof row.id === 'number') {
        ids.push(row.id)
      } else {
        ids = row.id
      }
      this.ids = ids.join()
    },
    // 删除
    deleteRow (row) {
      var _this = this
      API.deleteProjectById({ids: _this.ids}).then(res => {
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
        id.push(item.id)
      })
      if (id.length > 0) {
        this.deleteConfirm({id: id})
      } else {
        this.$message({
          message: '请至少选择一个选项',
          type: 'warning'
        })
      }
    },
    // 显示弹框
    showDialog () {
      this.type = 'saveProject'
      this.dialogVisible = true
    },
    // 编辑数据回显
    update (row) {
      this.type = 'updateProjectById'
      this.dialogVisible = true
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = row[key]
        }
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
