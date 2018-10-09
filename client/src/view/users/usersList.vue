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
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="deleteBatch">角色关联</el-button>
    </el-row>
    <MyTable
      :table="table"
      :column="column"
      @delete="deleteUser"
      @update="showDialog"
      @select="handleSelectionChange"
      :data="data">
    </MyTable>
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <MyForm :form="form" @submit="submit" @cancle="cancle"></MyForm>
    </el-dialog>
  </div>
</template>

<script>
import API from '@/api/user.js'
export default {
  name: 'UsersList',
  data () {
    return {
      dialogVisible: false,
      multipleSelection: [],
      queryType: 'addUser',
      form: {
        title: '',
        ref: 'form1',
        submitText: '提交',
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
          },
          {
            type: 'checkbox',
            name: 'rights',
            label: '权限:',
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
              content: '修改密码',
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
      column: [
        {
          'prop': 'username',
          'label': '用户名',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'roles',
          'label': '角色',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'rights',
          'label': '所属权限',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'makeTime',
          'label': '创建时间',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        }
      ],
      data: [
        {
          username: 'sdfas',
          roles: 'dsfgdtg',
          rights: 'wereq',
          makeTime: '2018-01-01'
        }
      ]
    }
  },
  created () {
    // this.getUserList()
  },
  methods: {
    // 表单提交
    submit (form) {
      var data = {}
      var _this = this
      if (this.queryType === 'updateUserInfo') {
        data = {
          uid: _this.multipleSelection[0].uid,
          username: form.username,
          roles: form.roles.join(',')
        }
      } else {
        data = {
          username: form.username,
          roles: form.roles.join(',')
        }
      }

      console.log(data)
      console.log(this.queryType)
      // return
      API[this.queryType](data).then(res => {
        this.dialogVisible = false
        this.getUserList()
      }).catch(err => {
        console.log(err)
      })
    },
    // 表单取消提交
    cancle (form) {
    },
    // 弹框关闭时的回调函数
    handleClose (done) {
      done()
    },
    getUserList () {
      API.getUserList({
        page: 1,
        size: 10
      }).then(res => {
        this.data = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除用户
    deleteUser (row) {
      API.deleteUser({
        uid: row.uid
      }).then(res => {
        this.getUserList()
      }).catch(err => {
        console.log(err)
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
