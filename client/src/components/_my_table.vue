<template>
    <el-table
      :size="table.size"
      ref="multipleTable"
      :highlight-current-row="true"
      :data="data"
      :stripe="table.stripe"
      :border="table.border"
      :height="table.height"
      :max-height="table.maxHeight"
      :header-row-class-name="'header-row'"
      :row-class-name="tableRowClassName"
      :style="'width: '+table.width+'%'"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <!-- 复选框 -->
      <el-table-column type="selection" v-if="table.multiple" :fixed="'left'"></el-table-column>
      <!-- 序号 -->
      <el-table-column
        :fixed="'left'"
        type="index"
        label="序号"
        sortable="true"
        width="50"
        :index="indexMethod">
      </el-table-column>
      <!-- 选项内容 -->
      <el-table-column v-for="(item, idx) in column" :key="idx"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :prop="item.cprop"
        :label="item.label"
        :width="item.width">
        <template slot-scope="scope">
          <el-button v-if="item.prop == 'vSn'" @click="to(scope.row)" size="mini">{{ scope.row[item.prop] }}</el-button>
          <span v-else-if="item.cprop">{{ scope.row[item.prop][item.cprop] }}</span>
          <template v-else-if="item.isArray">
            <span v-for="(citem, cindex) in scope.row[item.prop]" :key="cindex">
              {{ citem.name }}
            </span>
          </template>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
        <template v-if="item.column">
          <el-table-column v-for="(item, idx) in item.column" :key="idx"
            :fixed="item.fixed"
            :sortable="item.sortable"
            :prop="item.prop"
            :label="item.label"
            :width="item.width">
            <template v-if="item.column"></template>
          </el-table-column>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column
        v-if="table.operation.show"
        :fixed="table.operation.fixed"
        :label="table.operation.label"
        :width="table.operation.width"
        :minWidth="table.operation.minWidth">
        <template slot-scope="scope">
          <el-button v-for="(citem, index) in table.operation.btns"
            :key="index"
            plain
            @click="handle(citem.handle, scope.row)"
            :size="citem.size">
            {{citem.content}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
/* eslint-disable */
export default {
  name: "MyTable",
  props: ['table', 'data', 'column'],
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
      if (rowIndex%2 === 0) {
        return "";
      } else {
        return "even-row";
      }
      
    },
    handle(str, row) {
      this.rowClick(row)
      this.$emit(str, row)
    },
    handleSelectionChange(val) {
      this.$emit('select', val)
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    indexMethod(index) {
      return index +1;
    },
    to(currentRow) {
      console.log(currentRow)
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/base/index.scss';
</style>
