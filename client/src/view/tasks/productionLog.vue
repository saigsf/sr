<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <span>生产日志管理列表</span>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-close" @click="deleteBatch">字段筛选</el-button>
      <el-button type="primary" size="mini" icon="el-icon-download" @click="showDialog">导出日志</el-button>
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
          show: false
        } // 操作按钮
      },
      column: [
        {
          'prop': 'projectName',
          'label': '操作时间',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'projectName',
          'label': '操作人',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'projectName',
          'label': '项目名称',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'tcuCode',
          'label': 'TCU型号',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'makeTime',
          'label': '生产任务',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'makeTime',
          'label': '刷写结果',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'makeTime',
          'label': '流水号',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'makeTime',
          'label': '批次号',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        }
      ],
      data: [
        {
          projectName: 'sdfas',
          carmakeName: 'dsfgdtg',
          tcuCode: 'wereq',
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
