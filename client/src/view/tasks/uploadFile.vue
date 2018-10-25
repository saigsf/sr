<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>文件管理列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col :span="12">
        <el-upload
          class="upload"
          :action="upLoadUrl"
          :before-upload="handleBefore"
          :on-success="handleSuccess"
          :on-error="handleError"
          :show-file-list="false">
          <el-button type="primary" size="mini" icon="el-icon-circle-plus">添加文件</el-button>
        </el-upload>
        <!-- <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">添加文件</el-button> -->
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除文件</el-button>
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
      @select="handleSelectionChange">
    </MyTable>
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
import {getField, getFormField} from '@/assets/json/index.js'
import apiConfig from '../../../config/api.config'
export default {
  name: 'ProjectList',
  data () {
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

    return {
      confirm: confirm,
      upLoadUrl: apiConfig.baseURl + '/tcufile/upload',
      multipleSelection: [],
      ids: null,
      operation: operation,
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 0,
      search: '',
      type: 'saveProject',
      loading: '',
    }
  },
  created () {
    this.init()
    this.getData()
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('file')
    },
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      // 添加查询字段

      // 接口调用
      API.getFileList(config).then(res => {
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
      this.loading = this.$loading({
        lock: true,
        text: '文件正在上传···',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    // 上传文件成功
    handleSuccess (res) {
      console.log(res)
      this.loading.close()
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
    },
    // 上传文件失败
    handleError (err) {
      console.log(err)
      this.loading.close()
      this.$message({
        message: '文件上传失败',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
.upload {
  float: left;
  @include px2rem(margin-right, 20)
}
</style>
