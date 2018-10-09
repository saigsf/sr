<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>用户权限列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">新增用户</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除用户</el-button>
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="deleteBatch">角色关联</el-button>
    </el-row>
    <MyTable
      :table="table"
      :column="column"
      :data="data">
    </MyTable>
  </div>
</template>

<script>
import {getField} from '@/assets/json/index.js'
export default {
  name: 'RightsList',
  data () {
    return {
      table: {
        size: 'mini',
        stripe: true, // 是否带有斑马纹路
        border: true, // 是否要竖直边框
        multiple: true, // 复选框
        // height: '414',
        // maxHeight: '513',
        width: '80',
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
              content: '删除',
              icon: 'el-icon-delete',
              handle: 'delete'
            }
          ]
        } // 操作按钮
      },
      column: [],
      data: [
        {
          rightsNo: 'sdgasg',
          rightsName: 'sdgasg',
          makeTime: 'sdfsdga'
        },
        {
          rightsNo: 'sdgasg',
          rightsName: 'sdgasg',
          makeTime: 'sdfsdga'
        },
        {
          rightsNo: 'sdgasg',
          rightsName: 'sdgasg',
          makeTime: 'sdfsdga'
        },
        {
          rightsNo: 'sdgasg',
          rightsName: 'sdgasg',
          makeTime: 'sdfsdga'
        }
      ]
    }
  },
  created () {
    // 获取字段
    this.column = getField('rights')
  },
  methods: {
    submit (form) {
      console.log(form)
    },
    cancle (form) {
      console.log(form)
    },
    handleClose (done) {
      done()
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
        this.queryType = 'updateUserInfo'
      } else {
        this.queryType = 'addUser'
      }
      this.dialogVisible = true
    },
    // 获取选中行
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
