<template>
  <div class="statistics">
    <div class="pie-search">
      <MySearch class="search" :formData="searchFormData" :formItem="searchFormItem" @submit="searchSubmit"></MySearch>
    </div>
    <div class="pie-wrapper" id="pie_wrapper">
    </div>
  </div>
</template>

<script>
import API from '@/api/task.js'
import { getSearchField } from '@/assets/json/index.js'
// 引入基本模板
let echarts = require('echarts')
// 引入饼图组件
// require('echarts/lib/chart/pie')
export default {
  name: 'StatisticsPie',
  data() {
    return {
      pie: null,
      pieOption: {},
      searchFormData: [],
      searchFormItem: {}
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.pieInit()
  },
  methods: {
    // 初始化
    init () {
      this.searchFormItem = getSearchField('statistics', 'item')
      this.searchFormData = getSearchField('statistics', 'data')
    },
    pieInit() {
      this.pie = echarts.init(document.getElementById('pie_wrapper'))
      this.pieOption = {
        color: ['#ed7e11','#1197ed'],
        tooltip : {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: 'bottom',
          data: ['成功', '失败']
        },
        series : [
          {
            name: '刷写统计',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            clockwise: false,
            data:[],
            itemStyle: {
              emphasis: {
                shadowBlur: 4,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b} : {c} ({d}%)'
            },
            labelLine: {
              length: 30,
              length2: 30
            }
          }
        ]
      }
    },
    // 获取数据
    getData () {
      var _this = this
      var config = {
        startTime: '',
        endTime: ''
      }

      if(this.searchFormData.dateRange && this.searchFormData.dateRange.length>0) {
        config = {
          startTime: _this.searchFormData.dateRange[0],
          endTime: _this.searchFormData.dateRange[1]
        }
      }
      API.getEchatInfo(config).then(res => {
        if(res == null || res != null && res.data == null) {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          return;
        }
        this.drawPie(res.data)
      })
    },
    // 画图
    drawPie (data) {
      this.pieOption.series[0].data = [
        {
          value: data.successCount,
          name: '成功'
        },
        {
          value: data.failCount,
          name: '失败'
        }
      ]
      this.pie.setOption(this.pieOption)
    },
    // 搜索
    searchSubmit () {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/base/variables.scss';
@import '@/assets/base/mixins.scss';
.pie-search {
  text-align: center
}
.pie-wrapper {
  width: 100%;
  height: px2rem(400);
  margin-top: px2rem(20);
}
</style>


