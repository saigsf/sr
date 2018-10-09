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
      column: [
        {
          'prop': 'rightsNo',
          'label': '权限编号',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'rightsName',
          'label': '权限名称',
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
