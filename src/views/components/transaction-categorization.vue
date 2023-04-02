<template>
  <div class="transaction_categorization">
    <Box title="交易分类占比">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange"/>
      </template>

      <div id="chart9" class="chart"></div>

      <div class="labels">
        <div class="item" v-for="(item, index) in labels" :key="index">
          <span class="icon" :style="{ background: colors[index] }"></span>
          <span class="name">
            {{ item.name }}
          </span>
          <span class="value">
            {{ ((item.value / total) * 100).toFixed(2) }}%
          </span>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XSelect from '@/components/x-select.vue'
import * as echarts from 'echarts'
import request from '@/api/request'
import urls from '@/api/urls'

export default {
  name: 'TransactionCategorization',

  components: {
    Box,
    XSelect
  },

  data () {
    return {
      value: '1',
      options: [
        {
          value: '1',
          label: '商品金额'
        },
        {
          value: '2',
          label: '商品销量'
        },
        {
          value: '3',
          label: '商品数量'
        }
      ],
      labels: [],
      total: 0,
      colors: [
        '#91cc75',
        '#5470c6',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#fac858',
        '#5470c6',
        '#91cc75',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#ea7ccc',
        '#9a60b4'
      ],
      myChart: null
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart9'))
      this.myChart = echarts.init(document.getElementById('chart9'))

      const data = await this.getData(Number(this.options[0].value)) || []

      // 绘制图表
      this.setChartOption(data)
    },
    setChartOption (data) {
      const syjgdata = []
      let total = 0
      data.forEach(item => {
        const num = Number(item.val)
        total += num
        syjgdata.push({
          name: item.cate,
          value: num
        })
      })
      this.labels = syjgdata
      this.total = total

      this.myChart.setOption({
        color: this.colors,
        grid: {
          left: '0',
          top: '0',
          right: '0',
          bottom: '0'
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            fontSize: 18
          }
        },
        legend: {
          // type: 'scroll',
          show: false,
          icon: 'circle',
          itemWidth: 10,
          itemGap: 15,
          bottom: '0',
          textStyle: {
            color: '#fff',
            fontSize: 18
          },
          // 使用回调函数
          formatter: function (name) {
            const item = data.find(it => it.cate === name)
            return item ? (
              `${name}` + ' ' + `${((Number(item.val) / total) * 100).toFixed(2)}%`
            ) : '-'
          },
          rich: {
            a: {},
            b: {}
          }
        },
        series: [
          {
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            hoverAnimation: true,
            type: 'pie',
            radius: ['0%', '60%'],
            center: ['50%', '35%'],
            data: syjgdata,
            z: 10
          }
        ]
      })
    },
    async getData (type) {
      const res = await request({
        url: urls.product_category_ratio,
        method: 'POST',
        data: {
          type
        }
      })
      return res.data.data
    },
    async optionChange (option) {
      const chartData = await this.getData(Number(option.value))
      this.setChartOption(chartData)
    }
  }
}
</script>

<style lang="less" scoped>
.transaction_categorization {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .chart {
    width: 100%;
    height: 100%;
  }

  .labels {
    position: absolute;
    bottom: 24px;
    width: 100%;
    height: 110px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    overflow-y: auto;

    .item {
      display: flex;
      align-items: center;

      .icon {
        width: 20px;
        height: 5px;
        border-radius: 2px;
        margin-right: 13px;
      }

      .name {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        margin-right: 13px;
      }

      .value {
        font-size: 23px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: rgba(0, 186, 255, 1);
      }
    }
  }
}
</style>
