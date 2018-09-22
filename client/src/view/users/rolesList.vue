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
  name: 'RolesList',
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
