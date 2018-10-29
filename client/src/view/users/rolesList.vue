<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>用户角色列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">新增角色</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除角色</el-button>
        <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="rolesBindRights">权限关联</el-button>
      </el-col>
      <el-col :span="12">
        <MySearch class="search" :formData="searchFormData" :formItem="searchFormItem" @submit="searchSubmit"></MySearch>
      </el-col>
    </el-row>
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
    <el-dialog
      width="30%"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
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
import { getField, getFormField, getSearchField } from '@/assets/json/index.js'
import { dateFtt, px2rem, bubbleSortById } from '@/plugins/util.js'
export default {
  name: 'RolesList',
  data () {
    var validate = (rule, value, callback) => {
      console.log(value)
      if (/[\u4e00-\u9fa5]/.test(value)) {
        callback(new Error('请输入英文关键字'));
      } else {
        callback();
      }
    }
    var form = {
      ref: 'roleForm',
      showTitle: false,
      labelWidth: px2rem(80),
      labelPositon: 'right',
      width: '90%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
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
      content: '此操作将删除该数据, 是否继续?'
    }
    return {
      confirm: confirm,
      rule: { validator: validate, trigger: 'blur' },
      dialogTitle: '新增角色',
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
      type: 'saveRoles',
      searchFormData: [],
      searchFormItem: {}
    }
  },
  created () {
    this.init()
    this.rolesFormInit()
    this.searchFormInit()
  },
  mounted () {
    this.resetForm()
  },
  activated () {
    this.getData()
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('roles')
    },
    rolesFormInit () {
      // 获取form字段
      this.dialogTitle = '新增角色'
      this.formItem = getFormField('roles', 'item')
      this.formItem[1].rules.push(this.rule)
      this.formData = getFormField('roles', 'data')
    },
    rightsFormInit () {
      // 获取form字段
      this.dialogTitle = '权限绑定'
      this.formItem = getFormField('rolesBindRights', 'item')
      this.formData = getFormField('rolesBindRights', 'data')
    },
    searchFormInit () {
      this.searchFormItem = getSearchField('role', 'item')
      this.searchFormData = getSearchField('role', 'data')
    },
    // 添加数据
    showDialog () {
      this.type = 'saveRoles'
      this.dialogVisible = true
    },
    // 更新数据
    update (row) {
      this.type = 'updateRoles'
      this.dialogVisible = true
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = row[key]
        }
      }
    },
    // 提交数据
    submit () {
      if (this.type == 'roleBindAcl') {
        this.formData.aclIds = this.formData.aclIds.join(',')
      }
      API[this.type](this.formData).then(res => {
        this.dialogVisible = false
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getData()
      }).catch(err => {})
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      this.rolesFormInit()
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
      config = $.extend(config, this.searchFormData)
      API.getRoles(config).then(res => {
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
    // 删除
    delete () {
      var _this = this
      API.deleteRoles({ids: _this.ids}).then(res => {
        this.ids = null
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getData()
      }).catch(err => {})
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
          message: '请至少选择一条数据',
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
    // 表单重置
    resetForm () {
      if(this.$refs['myform'] != undefined) {
        this.$refs['myform'].resetForm()
      }
    },
    // 角色绑定权限
    rolesBindRights () {
      var _this = this
      this.type = 'roleBindAcl'
      var len = this.multipleSelection.length
      if (len === 1) {
        var row = this.multipleSelection[0]
        console.log(row)
        var roleId = row.id
        // 获取角色关联表单
        this.rightsFormInit()
        // 获取username显示
        this.formData.name = row.name
        // 获取id提交数据
        this.formData.roleId = roleId
        this.formData.aclIds = []
        // 获取角色列表
        API.getAclDto({roleId}).then(res => {
          _this.formItem[1].options = bubbleSortById((res.data.inBind).concat(res.data.noBind))
          res.data.inBind.forEach(item => {
            _this.formData.aclIds.push(item.id)
          })
          
        }).catch(err => {})
        console.log(this.formItem)
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
