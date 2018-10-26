<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>操作日志管理</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <a :href="downLoadUrl">
        <el-button type="primary" size="mini" icon="el-icon-download">导出日志</el-button>
      </a>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除日志</el-button>
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
      @select="handleSelectionChange">
    </MyTable>
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
import {getField} from '@/assets/json/index.js'
import { dateFtt, px2rem } from '@/plugins/util.js'
import apiConfig from '../../../config/api.config'
export default {
  name: 'OperationLog',
  data () {
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
      content: '此操作将永久删除该记录, 是否继续?'
    }
    return {
      confirm: confirm,
      downLoadUrl:  apiConfig.baseURl + '/operationlog/getExcel',
      multipleSelection: [],
      operation: operation,
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 0,
      ids: ''
    }
  },
  created () {
    // 获取字段
    this.init()
    this.getData()
  },
  methods: {
    init () {
      // 获取table字段
      this.column = getField('operationLog')
    },
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
      API.getOperationLog(config).then(res => {
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
    delete (ro) {
      var _this = this
      API.deleteOperationLog({ids: _this.ids}).then(res => {
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
      if (id) {
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
    // 获取选中行
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
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
