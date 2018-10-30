<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>用户权限列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">新增权限</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除权限</el-button>
      </el-col>
      <el-col :span="12">
        <MySearch class="search" :formData="searchFormData" :formItem="searchFormItem" @submit="searchSubmit"></MySearch>
      </el-col>
    </el-row>
    <MyTable
      :column="column"
      :data="data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
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
import { getPageSize, px2rem, bubbleSortById } from '@/plugins/util.js'
export default {
  name: 'RightsList',
  data () {
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
    // 确认信息配置
    var confirm = {
      type: 'warning',
      title: '提示信息',
      content: '此操作将删除该数据, 是否继续?'
    }
    return {
      confirm: confirm,
      dialogTitle: '新增权限',
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      formItem: [],
      formData: {},
      column: [],
      data: [],
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: 'saveRights',
      searchFormData: [],
      searchFormItem: {}
    }
  },
  created () {
    this.init()
    this.rightsFormInit()
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
      this.column = getField('rights')
    },
    rightsFormInit () {
      // 获取form字段
      this.formItem = getFormField('rights', 'item')
      this.formData = getFormField('rights', 'data')
    },
    searchFormInit () {
      this.searchFormItem = getSearchField('rights', 'item')
      this.searchFormData = getSearchField('rights', 'data')
    },
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      config = $.extend(config, this.searchFormData)
      API.getRights(config).then(res => {
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
    // 添加数据
    showDialog () {
      this.dialogVisible = true
    },
    // 更新数据
    update (row) {
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
      this.rightsFormInit()
      this.resetForm()
      for (const key in this.formData) {
        if (this.formData.hasOwnProperty(key)) {
          this.formData[key] = ''
        }
      }
      done()
    },
    // 删除
    delete () {
      var _this = this
      API.deleteRights({ids: _this.ids}).then(res => {
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
        console.log(item)
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
