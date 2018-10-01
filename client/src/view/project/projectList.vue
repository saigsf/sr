<template>
  <div class="list">
    <el-row>
      <el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogVisible=true">新增</el-button>
      <el-button type="primary" size="mini" icon="el-icon-minus">删除</el-button>
    </el-row>
    <MyTable class="mb10" :table="table" :column="column" :data="data"></MyTable>
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
export default {
  name: 'ProjectList',
  data () {
    return {
      dialogVisible: false,
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
              size: 'mini',
              content: '删除'
            },
            {
              size: 'mini',
              content: '修改权限'
            }
          ]
        } // 操作按钮
      },
      column: [
        {
          'prop': 'roles',
          'label': '角色',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'belonged',
          'label': '所属权限',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        }
      ],
      data: [
        {
          belonged: 'sdgasg',
          roles: 'sdgasg'
        },
        {
          belonged: 'sdgasg',
          roles: 'sdgasg'
        },
        {
          belonged: 'sdgasg',
          roles: 'sdgasg'
        },
        {
          belonged: 'sdgasg',
          roles: 'sdgasg'
        }
      ]
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
