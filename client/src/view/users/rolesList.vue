<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>用户角色列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="showDialog">新增角色</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">删除角色</el-button>
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="deleteBatch">角色关联</el-button>
    </el-row>
    <MyTable
      :table="table"
      :column="column"
      :data="data"
      @delete="deleteUser"
      @update="showDialog"
      @select="handleSelectionChange">
    </MyTable>
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <MyForm :form="form" @submit="submit" @cancle="cancle"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import {getField} from '@/assets/json/index.js'
export default {
  name: 'RolesList',
  data () {
    return {
      dialogVisible: false,
      multipleSelection: [],
      form: {
        title: '',
        ref: 'form1',
        showTitle: false,
        labelWidth: '80px',
        labelPositon: 'right',
        width: 100,
        column: 1,
        formItem: [
          {
            type: 'text',
            name: 'username',
            value: '',
            width: '80',
            label: '用户名:'
          },
          {
            type: 'checkbox',
            name: 'roles',
            label: '角色:',
            // width: '80',
            value: [],
            options: [
              {
                label: '刷写工人',
                value: '刷写工人'
              },
              {
                label: '刷写设置管理员',
                value: '刷写设置管理员'
              },
              {
                label: '生产任务管理员',
                value: '生产任务管理员'
              },
              {
                label: '超级管理员',
                value: '超级管理员'
              },
              {
                label: '日志管理员',
                value: '日志管理员'
              }
            ]
          }
        ]
      },
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
              content: '修改权限',
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
        } // 操作按钮
      },
      column: [],
      data: [
        {
          belonged: 'sdgasg',
          roles: 'sdgasg',
          makeTime: '2018-01-01'
        },
        {
          belonged: 'sdgasg',
          roles: 'sdgasg',
          makeTime: '2018-01-01'
        },
        {
          belonged: 'sdgasg',
          roles: 'sdgasg',
          makeTime: '2018-01-01'
        },
        {
          belonged: 'sdgasg',
          roles: 'sdgasg',
          makeTime: '2018-01-01'
        }
      ]
    }
  },
  created () {
    // 获取字段
    this.column = getField('roles')
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
