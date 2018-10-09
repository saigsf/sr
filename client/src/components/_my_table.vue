<template>
  <div class="my-table">
    <!-- 标题 -->
    <el-row class="title" v-if="titleShow">
      <h5>{{title}}</h5>
    </el-row>
    <!-- 增删改查操作 -->
    <el-row class="btn-group" v-if="btnGroupShow">
      <el-button size="mini" icon="el-icon-minus">删除</el-button>
    </el-row>
    <!-- 表 -->
    <el-table
      ref="multipleTable"
      :size="size"
      :highlight-current-row="true"
      :data="data"
      :stripe="stripe"
      :border="border"
      :max-height="maxHeight"
      :style="styles"
      tooltip-effect="dark"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange">
      <!-- 复选框 -->
      <el-table-column type="selection" v-if="multiple" :fixed="false"></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="hasIndex"
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
          <span v-if="item.cprop">{{ scope.row[item.prop][item.cprop] }}</span>
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
        v-if="operation.show"
        :fixed="operation.fixed"
        :label="operation.label"
        :width="operation.width"
        :minWidth="operation.minWidth">
        <template slot-scope="scope">
          <el-button v-for="(citem, index) in operation.btns"
            :key="index"
            type="text"
            @click="handle(citem.handle, scope.row)"
            :icon="citem.icon"
            :size="citem.size">{{citem.content}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :layout="layout"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "MyTable",
  props: {
    table: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    column: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: '标题'
    },
    titleShow: {
      type: Boolean,
      default: false
    },
    btnGroupShow: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'mini'
    },
    stripe: {
      type: Boolean,
      default: false
    }, // 是否带有斑马纹路
    border: {
      type: Boolean,
      default: false
    }, // 是否要竖直边框
    multiple: {
      type: Boolean,
      default: true
    }, // 复选框
    height: {
      type: String,
      default: 'auto'
    },
    maxHeight: {
      type: String,
      default: 'none'
    },
    styles: {
      type: String,
      default: ''
    },
    hasIndex: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 60
    },
    pageSize: {
      type: Number,
      default: 5
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    operation: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。
      if (rowIndex%2 === 0) {
        return "even-row";
      } else {
        return "";
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
      console.log(this.$refs)
      // this.$refs.multipleTable.toggleRowSelection(row);
    },
    indexMethod(index) {
      return index +1;
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
.title {
  @include padding(10, 10, 20, 10);
  border-bottom: 2px dashed rgba(229,229,229,1);
  h5 {
    // border-left: 5px solid $tc;
    @include px2rem(font-size, 29);
    color: $tc;
    &:before {
      content: "";
      display: inline-block;
      vertical-align: middle;
      @include px2rem(height, 27);
      @include px2rem(width, 5);
      @include px2rem(margin-right, 9);
      background-color: $tc;
    }
  }
}
.btn-group {
  @include padding(20, 10);
}
.pagination {
  text-align: right;
  @include padding(20, 10);
}
</style>
