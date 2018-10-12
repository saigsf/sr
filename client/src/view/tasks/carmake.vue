<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>车企管理列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加车企</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除车企</el-button>
    </el-row>
    <MyTable
      :table="table"
      :column="column"
      :operation="operation"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteUser"
      @update="showDialog"
      @select="handleSelectionChange"
      :data="data">
    </MyTable>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
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
      dialogTitle: '添加车企',
      dialogVisible: false,
      multipleSelection: [],
      form: {
        title: '',
        ref: 'form1',
        showTitle: false,
        labelWidth: '70px',
        labelPositon: 'right',
        width: '90%',
        column: 1,
        hasSubmit: true,
        submitText: '提交',
        cancleText: '取消'
      },
      formItem: [
        {
          type: 'text',
          name: 'username',
          value: '',
          width: '80',
          label: '用户名:'
        },
        {
          type: 'checkbox',
          name: 'roles',
          label: '角色:',
          // width: '80',
          value: [],
          options: [
            {
              label: '刷写工人',
              value: '刷写工人'
            },
            {
              label: '刷写设置管理员',
              value: '刷写设置管理员'
            },
            {
              label: '生产任务管理员',
              value: '生产任务管理员'
            },
            {
              label: '超级管理员',
              value: '超级管理员'
            },
            {
              label: '日志管理员',
              value: '日志管理员'
            }
          ]
        },
        {
          type: 'checkbox',
          name: 'rights',
          label: '权限:',
          // width: '80',
          value: [],
          options: [
            {
              label: '刷写工人',
              value: '刷写工人'
            },
            {
              label: '刷写设置管理员',
              value: '刷写设置管理员'
            },
            {
              label: '生产任务管理员',
              value: '生产任务管理员'
            },
            {
              label: '超级管理员',
              value: '超级管理员'
            },
            {
              label: '日志管理员',
              value: '日志管理员'
            }
          ]
        }
      ],
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
      operation: {
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
      }, // 操作按钮
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 10
    }
  },
  created () {
    // 获取字段
    this.init()
    this.getUserList()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('carmake')
      // 获取form字段
      this.formItem = getFormField('carmake', 'item')
      this.formData = getFormField('carmake', 'data')
    },
    // 表单提交
    submit () {
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
          carmakeName: 'sdfas',
          makeTime: '2018-01-01'
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
      } else {
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
