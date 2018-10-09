<template>
  <div class="list">
    <!-- 标题 -->
    <el-row class="title">
      <h5>生产任务管理列表</h5>
    </el-row>
    <!-- 按钮 -->
    <el-row class="btn-group">
      <el-button type="primary" size="mini" icon="el-icon-circle-close">删除任务</el-button>
      <el-button type="primary" size="mini" icon="el-icon-circle-plus">添加任务</el-button>
      <el-button type="primary" size="mini" icon="el-icon-edit">任务挂起</el-button>
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
  name: 'TaskList',
  data () {
    return {
      table: {
        size: 'mini',
        stripe: false, // 是否带有斑马纹路
        border: false, // 是否要竖直边框
        multiple: true, // 复选框
        // height: '400',
        // maxHeight: '513',
        width: '100',
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
              content: '编辑',
              icon: 'el-icon-edit',
              handle: 'update'
            },
            {
              type: 'text',
              size: 'mini',
              content: '查看',
              icon: 'el-icon-delete',
              handle: 'delete'
            }
          ]
        } // 操作按钮
      },
      column: [
        {
          'prop': 'employee',
          'label': '项目名称',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '生产日期',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': 'TCU代码',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '批次',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '批次数量',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '创建人',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '创建日期',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '完成数量',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'allocatedTime',
          'label': '任务状态',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'allocatedTime',
          'label': '初始流水号',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        }
      ],
      data: [
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        },
        {
          employee: 'sdgasg',
          other: 'sdgasg',
          allocatedTime: 'sdgasg'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
