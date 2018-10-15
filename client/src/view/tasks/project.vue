<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>项目管理列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加项目</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除项目</el-button>
    </el-row>
    <MyTable
      :table="table"
      :column="column"
      :data="data"
      :operation="operation"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteRow"
      @update="showDialog"
      @select="handleSelectionChange">
    </MyTable>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <MyForm :form="form" ref="form" :formData="formData" :formItem="formItem" @submit="submit" @cancle="cancle"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import {getField, getFormField} from '@/assets/json/index.js'
export default {
  name: 'UsersList',
  data () {
    return {
      dialogTitle: '添加项目',
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
      table: {
        size: 'mini',
        stripe: true, // 是否带有斑马纹路
        border: true, // 是否要竖直边框
        multiple: true, // 复选框
        // height: '414',
        // maxHeight: '513',
        width: '80'
      },
      operation: { // 操作按钮
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
            content: '查看',
            icon: 'el-icon-delete',
            handle: 'delete'
          }
        ]
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
    this.getCarmake()
    this.getUserList()
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('project')
      // 获取form字段
      this.formItem = getFormField('project', 'item')
      this.formData = getFormField('project', 'data')
    },
    getCarmake () {
      var data = [
        {
          label: '车企a',
          value: '车企a'
        },
        {
          label: '车企b',
          value: '车企b'
        },
        {
          label: '车企c',
          value: '车企c'
        }
      ]
      this.formItem.forEach(item => {
        if (item.name === 'carmake') {
          item.options = data
        }
      })
    },
    getTCU () {},
    // 表单提交
    submit () {
      console.log()
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
          projectName: 'sdfas',
          carmakeName: 'dsfgdtg',
          tcuCode: 'wereq',
          makeTime: '2018-01-01'
        })
      }
    },
    // 删除用户
    deleteRow (row) {
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
