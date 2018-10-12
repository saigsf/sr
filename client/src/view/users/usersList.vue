<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>用户信息列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">新增用户</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除用户</el-button>
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="roleAssociation">角色关联</el-button>
    </el-row>
    <MyTable
      size="mini"
      :stripe="false"
      :border="false"
      :multiple="true"
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
// import API from '@/api/user.js'
import {getField, getFormField} from '@/assets/json/index.js'
export default {
  name: 'UsersList',
  data () {
    return {
      dialogTitle: '新增用户',
      dialogVisible: false,
      multipleSelection: [],
      queryType: 'addUser',
      form: {
        title: '',
        ref: 'form1',
        showTitle: false,
        labelWidth: '60px',
        labelPositon: 'right',
        width: '90%',
        column: 1,
        hasSubmit: true,
        submitText: '提交',
        cancleText: '取消'
      },
      formItem: [],
      formData: {},
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
            content: '修改密码',
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
      }, // table操作按钮
      column: [], // table字段
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
      this.column = getField('user')
      // 获取form字段
      this.formItem = getFormField('user', 'item')
      this.formData = getFormField('user', 'data')
    },
    // 表单提交
    submit () {
      var _this = this
      this.dialogVisible = false
      console.log(this.formData)
      var id = this.data[0].uid
      this.data.push({
        uid: ++id,
        username: _this.formData.username,
        roles: _this.formData.roles.join(','),
        rights: _this.formData.rights.join(','),
        makeTime: '2018-01-01'
      })
    },
    // 表单取消提交
    cancle () {
      this.dialogVisible = false
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      done()
    },
    getUserList () {
      for (let i = 0; i < this.pageSize; i++) {
        this.data.push({
          uid: i + 1,
          username: 'sdfas',
          roles: '超级管理员',
          rights: '超级管理员',
          makeTime: '2018-01-01'
        })
      }
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
      // 获取form字段
      this.formItem = getFormField('user', 'item')
      this.formData = getFormField('user', 'data')
      console.log(this.formData)
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
        this.queryType = 'updateUserInfo'
      } else {
        this.queryType = 'addUser'
      }
      this.dialogVisible = true
    },
    // 角色关联
    roleAssociation () {
      // 获取form字段
      this.dialogTitle = '角色关联'
      this.formItem = getFormField('userAndRoles', 'item')
      this.formData = getFormField('userAndRoles', 'data')
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
