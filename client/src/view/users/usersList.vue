<template>
  <div class="list">
    <el-row>
      <el-button type="primary" size="mini" icon="el-icon-plus">新增</el-button>
      <el-button type="primary" size="mini" icon="el-icon-minus">删除</el-button>
    </el-row>
    <MyTable class="mb10" :table="table" :column="column" :data="data"></MyTable>
  </div>
</template>

<script>
export default {
  name: 'UsersList',
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
              size: 'mini',
              content: '删除'
            },
            {
              size: 'mini',
              content: '修改'
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
        }
      ],
      data: [
        {
          username: 'sdgasg',
          roles: 'sdgasg'
        },
        {
          username: 'sdgasg',
          roles: 'sdgasg'
        },
        {
          username: 'sdgasg',
          roles: 'sdgasg'
        },
        {
          username: 'sdgasg',
          roles: 'sdgasg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
