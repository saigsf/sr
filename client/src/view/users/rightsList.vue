<template>
  <div class="list">
    <el-row>
      <el-button type="primary" size="mini" icon="el-icon-minus">删除</el-button>
    </el-row>
    <MyTable class="mb10" :table="table" :column="column" :data="data"></MyTable>
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
              size: 'mini',
              content: '删除'
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
