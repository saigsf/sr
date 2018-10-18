<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>车企管理列表</span>
    </el-row>
    <!-- 按钮操作 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog()">添加车企</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除车企</el-button>
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
      :operation="operation"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange"
      @delete="deleteConfirm"
      @update="update"
      @select="handleSelectionChange"
      :data="data">
    </MyTable>
    <!-- 表单提交 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <MyForm ref="myform" :form="form" :formData="formData" :formItem="formItem" @submit="submit" @cancle="cancle"></MyForm>
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
import { dateFtt, px2rem } from '@/plugins/util.js'
export default {
  name: 'TcuList',
  data () {
    // 表单验证
    var validate = (rule, value, callback) => {
      if (value.length < 2 || value.length > 20) {
        callback(new Error('车企名称长度2-20'));
      } else {
        callback();
      }
    }
    // 表单配置
    var form = {
      title: '',
      ref: 'carmake',
      showTitle: false,
      labelWidth: px2rem(120),
      labelPositon: 'right',
      width: '90%',
      column: 1,
      hasSubmit: true,
      submitText: '提交',
      cancleText: '取消'
    }
    // 表格操作配置
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
      rule: { validator: validate, trigger: 'blur' },
      dialogTitle: '添加车企',
      dialogVisible: false,
      multipleSelection: [],
      ids: null,
      form: form,
      formItem: [],
      formData: {},
      operation: operation, // 操作按钮
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 0,
      search: '', // 搜索字段
      type: 'saveCarmake', // 请求方式
    }
  },
  created () {
    // 获取字段
    this.init()
    this.getData()
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('carmake')
      // 获取form字段
      this.formItem = getFormField('carmake', 'item')
      this.formItem[0].rules.push(this.rule)
      this.formData = getFormField('carmake', 'data')
    },
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

      // 接口调用
      API.getCarmakeList(config).then(res => {
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
    // 删除用户
    deleteRow () {
      var _this = this
      API.deleteCarmakeById({ids: _this.ids}).then(res => {
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
          message: '请至少选择一个选项',
          type: 'warning'
        })
      }
    },
    // 显示弹框
    showDialog () {
      this.type = 'saveCarmake'
      this.dialogVisible = true
    },
    // 编辑数据回显
    update (row) {
      this.type = 'updateCarmakeById'
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
    // 分页切换
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
