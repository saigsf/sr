<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>文件管理</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <!-- <el-upload
          class="upload"
          :headers="headers"
          :action="upLoadUrl"
          :before-upload="handleBefore"
          :on-success="handleSuccess"
          :on-error="handleError"
          :show-file-list="false">
          <el-button type="primary" size="mini" icon="el-icon-circle-plus">添加文件</el-button>
        </el-upload> -->
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加文件</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除文件</el-button>
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
      @select="handleSelectionChange">
    </MyTable>
    <!-- 表单提交 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <!-- <MyForm ref="myform" :form="form" :formData="formData" :formItem="formItem" @submit="submit"></MyForm> -->
      <el-form
        :model="formData"
        :label-width="form.labelWidth"
        :label-positon="form.labelPositon"
        >
        <el-form-item label="文件类型：">
          <el-select v-model="formData.type" placeholder="文件类型" style="width:85%">
            <el-option v-for="option in formItem[0].options" :key="option.id" :label="option.name" :value="option.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件说明：">
          <el-input
            v-model="formData.remark"
            type="text"
            :style="'width:85%'">
          </el-input>
        </el-form-item>
        <el-form-item label="选择文件：">
          <el-upload
            ref="upload"
            class="upload"
            :headers="headers"
            :action="upLoadUrl"
            :data="formData"
            :auto-upload="false"
            :file-list="fileList"
            accept="file/.hex,file/.bfc"
            style="width:85%"
            :show-file-list="true"
            :on-success="handleSuccess">
            <el-button type="primary" size="mini">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.hex/.bfc文件，并且文件名称不能有中文和空格！！</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-row class="upload-btn" style="width:85%">
        <el-button type="primary" size="mini" @click="submit">上传</el-button>
      </el-row>
    </el-dialog>
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
import { getPageSize, px2rem, getCookie } from '@/plugins/util.js'
import apiConfig from '../../../config/api.config'
export default {
  name: 'ProjectList',
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
      cancleText: '取消',
      fileUpload: true
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

    var headers = {
      Authorization: getCookie('token')
    }

    return {
      dialogTitle: '文件上传',
      dialogVisible: false,
      form: form,
      formItem: [],
      formData: {},
      fileNmae: '',
      fileList: [],
      headers: headers,
      confirm: confirm,
      upLoadUrl: apiConfig.baseURl + '/tcufile/upload',
      multipleSelection: [],
      ids: null,
      operation: operation,
      column: [],
      data: [],
      pageSize: getPageSize(),
      currentPage: 1,
      total: 0,
      type: 'uploadFile',
      loading: '',
      searchFormData: [],
      searchFormItem: {}
    }
  },
  created () {
    this.init()
    this.searchFormInit()
  },
  activated () {
    this.headers.Authorization = getCookie('token')
    this.getData()
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('file')
      // 获取form字段
      this.formItem = getFormField('file', 'item')
      this.formData = getFormField('file', 'data')
    },
    searchFormInit () {
      this.searchFormItem = getSearchField('file', 'item')
      this.searchFormData = getSearchField('file', 'data')
    },
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      // 添加查询字段
      config = $.extend(config, this.searchFormData)
      // 接口调用
      API.getFileList(config).then(res => {
        this.data = res.data.list
        this.total = res.data.total
      }).catch(err => {})
    },
    // 删除
    delete () {
      var _this = this
      API.deleteFileList({ids: _this.ids}).then(res => {
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
    // 取消
    cancle () {
      this.ids = null
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
    // 上传文件之前
    handleBefore (res) {
      console.log(res)
    },
    // 上传文件成功
    handleSuccess (res) {
      console.log(res)
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
    },
    // 上传文件失败
    handleError (err) {
      // this.dialogVisible = true
      this.$message({
        message: '文件上传失败',
        type: 'error'
      })
    },
    // 搜索
    searchSubmit () {
      this.getData()
    },
    // 添加数据
    showDialog () {
      this.dialogVisible = true
    },
    // 提交数据
    submit () {
      this.$refs.upload.submit()
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      done()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
.upload {
  float: left;
  @include px2rem(margin-right, 20);
  
}
.upload-btn {
    margin: auto;
    text-align: right;
    .el-button {
      margin-right: 5%
    }
  }
</style>
