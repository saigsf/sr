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
      <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="userBindRoles">角色关联</el-button>
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
      @delete="deleteConfirm"
      @update="update"
      @select="handleSelectionChange">
    </MyTable>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <MyForm :form="form" ref="form" :formData="formData" :formItem="formItem" @submit="submit"></MyForm>
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
import API from '@/api/user.js'
import {getField, getFormField} from '@/assets/json/index.js'
import { dateFtt, px2rem, bubbleSortById } from '@/plugins/util.js'
export default {
  name: 'UsersList',
  data () {
    // 表单验证
    var validate = (rule, value, callback) => {
      if (!(/^1[345789]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback();
      }
    }
    var form = {
      ref: 'userForm',
      showTitle: false,
      labelWidth: px2rem(80),
      labelPositon: 'right',
      width: '90%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
      cancleText: '取消'
    }
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
          content: '修改',
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
      content: '此操作将删除该用户, 是否继续?'
    }
    return {
      confirm: confirm,
      rule: { validator: validate, trigger: 'blur' },
      dialogTitle: '新增用户',
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      formItem: [],
      formData: {},
      operation: operation, // table操作按钮
      column: [], // table字段
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 0,
      type: 'saveUser',
    }
  },
  created () {
    this.init()
    this.userFormInit()
    this.getData()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('user')
    },
    userFormInit () {
      // 获取form字段
      this.dialogTitle = '新增用户'
      this.formItem = getFormField('user', 'item')
      this.formItem[1].rules.push(this.rule)
      this.formData = getFormField('user', 'data')
    },
    rolesFormInit () {
      // 获取form字段
      this.dialogTitle = '角色关联'
      this.formItem = getFormField('userAndRoles', 'item')
      this.formData = getFormField('userAndRoles', 'data')
    },
    // 显示弹框
    showDialog () {
      this.type = 'saveUser'
      this.dialogVisible = true
    },
    // 更新数据
    update (row) {
      this.type = 'updateUser'
      this.dialogVisible = true
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = row[key]
        }
      }
    },
    // 提交数据
    submit () {
      if (this.type == 'setUserBindRole') {
        this.formData.roleIds = this.formData.roleIds.join(',')
      }
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
      // 初始化为添加表单
      this.userFormInit()
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
      // 表单重置
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
      API.getUser(config).then(res => {
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
      }).catch(err => {})
    },
    // 删除用户
    delete () {
      var _this = this
      API.deleteUser({ids: _this.ids}).then(res => {
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
          message: '请至少选择一个用户',
          type: 'warning'
        })
      }
    },
    // 删除确认
    deleteConfirm (row) {
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
    // 角色关联
    userBindRoles () {
      this.type = 'setUserBindRole'
      var len = this.multipleSelection.length
      if (len === 1) {
        var row = this.multipleSelection[0]
        var userId = row.id
        // 获取角色关联表单
        this.rolesFormInit()
        // 获取username显示
        this.formData.username = row.username
        // 获取id提交数据
        this.formData.userId = userId
        this.formData.roleIds = []
        // 获取角色列表
        API.getUserAndRoles({userId}).then(res => {
          this.formItem[1].options = bubbleSortById((res.data.inBind).concat(res.data.noBind))
          res.data.inBind.forEach(item => {
            this.formData.roleIds.push(item.id)
          });
        }).catch(err => {})
        
        this.dialogVisible = true
      } else if (len >= 1) {
        this.$message({
          message: '请只选择一个用户',
          type: 'warning'
        })
      } else {
        this.$message({
          message: '请选择一个用户',
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
    // 分页
    handleCurrentChange (index) {
      this.currentPage = index
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
</style>
