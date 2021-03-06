<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>TCU管理</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加TCU</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除TCU</el-button>
      </el-col>
      <el-col :span="12">
        <MySearch class="search" :formData="searchFormData" :formItem="searchFormItem" @submit="searchSubmit"></MySearch>
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
    <!-- 表单提交 -->
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
import {getField, getFormField, getSearchField} from '@/assets/json/index.js'
import { getPageSize, px2rem } from '@/plugins/util.js'
export default {
  name: 'TcuList',
  data () {
    // 表单配置
    var form = {
      title: '',
      ref: 'tuc',
      showTitle: false,
      labelWidth: px2rem(140),
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
    // 确认信息配置
    var confirm = {
      type: 'warning',
      title: '提示信息',
      content: '此操作将永久删除该文件, 是否继续?'
    }

    return {
      confirm: confirm,
      dialogTitle: '添加TCU',
      dialogVisible: false,
      multipleSelection: [],
      queryType: 'addUser',
      form: form,
      formItem: [],
      formData: {},
      operation: operation,
      column: [],
      data: [],
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: 'saveTCU',
      searchFormData: [],
      searchFormItem: {},
      fileArr: []
    }
  },
  created () {
    this.init()
    this.searchFormInit()
  },
  mounted () {
    this.resetForm()
  },
  activated () {
    this.getFile()
    this.getData()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('tcu')
      // 获取form字段
      this.formItem = getFormField('tcu', 'item')
      this.formData = getFormField('tcu', 'data')
    },
    searchFormInit () {
      this.searchFormItem = getSearchField('tcu', 'item')
      this.searchFormData = getSearchField('tcu', 'data')
    },
    // 获取tcu配置文件
    getFile () {
      API.getFillAll({type: 4}).then((res) => {
        this.fileArr = res.data
        this.formItem.forEach(item => {
          if(item.name == 'fileId') {
            item.options = res.data
          }
        })
      })
    },
    // 添加数据
    showDialog () {
      this.type = 'saveTCU'
      this.dialogVisible = true
    },
    // 更新数据
    update (row) {
      console.log(row)
      this.formItem.forEach(item => {
        if (item.name === 'files') {
          item.options = row.files
        }
      })

      this.type = 'updateTCUById'
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
        this.dialogVisible = false
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getData()
      })
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      this.init()
      this.resetForm()
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
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
      API.getTCUList(config).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      })
    },
    // 删除用户
    delete () {
      var _this = this
      API.deleteTCUById({ids: _this.ids}).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getData()
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
    // 删除确认
    deleteConfirm (row) {
      console.log(row)
      var _this = this
      var ids = []
      if (typeof row.id === 'number') {
        ids.push(row.id)
      } else {
        ids = row.id
      }
      this.ids = ids.join()
      this.$refs.myconfirm.confirm(_this.delete, _this.cancle)
    },
    // 取消删除
    cancle () {
      this.ids = null
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
    // 分页
    handleCurrentChange (index) {
      this.currentPage = index
      this.getData()
    },
    // 搜索
    searchSubmit () {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
