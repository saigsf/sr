<template>
  <div class="">
    <el-row>
      <el-button type="primary" size="mini" icon="el-icon-minus">删除</el-button>
    </el-row>
    <MyTable class="mb10" :table="table" :column="column" :data="data"></MyTable>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
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
              content: '修改'
            }
          ]
        } // 操作按钮
      },
      column: [
        {
          'prop': 'employee',
          'label': '员工',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'other',
          'label': '其他字段',
          'width': 'auto',
          'fixed': false,
          'sortable': false
        },
        {
          'prop': 'allocatedTime',
          'label': '分配时间',
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
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
</style>
