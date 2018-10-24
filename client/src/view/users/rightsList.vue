<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>用户权限列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-col v-if="false" :span="12">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">新增用户</el-button>
        <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除用户</el-button>
        <el-button type="primary" size="mini" icon="el-icon-edit" @click="deleteBatch">角色关联</el-button>
      </el-col>
    </el-row>
    <MyTable
      :column="column"
      :data="data"
      :currentPage="currentPage"
      :pageSize="pageSize"
      :total="total"
      @handleCurrentChange="handleCurrentChange">
    </MyTable>
  </div>
</template>

<script>
import API from '@/api/user.js'
import {getField} from '@/assets/json/index.js'
export default {
  name: 'RightsList',
  data () {
    return {
      column: [],
      data: [],
      pageSize: 9,
      currentPage: 1,
      total: 0
    }
  },
  created () {
    this.init()
    this.getData()
  },
  methods: {
    init () {
      // 获取字段
      this.column = getField('rights')
    },
    getData () {
      var _this = this
      var config = {
        pageNo: _this.currentPage,
        size: _this.pageSize
      }
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
</style>
