<template>
  <div class="commodity_price_trend">
    <Box title="商品价格趋势">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange" />
      </template>

      <div id="chart1" class="chart"></div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import * as echarts from 'echarts'
import XSelect from '@/components/x-select.vue'
import request from '@/api/request'
import urls from '@/api/urls'

export default {
  name: 'CommodityPriceTrend',

  components: {
    Box,
    XSelect
  },

  data () {
    return {
      value: '2',
      options: [
        {
          value: '2',
          label: '上升'
        },
        {
          value: '1',
          label: '下降'
        },
        {
          value: '3',
          label: '异常'
        }
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
      echarts.dispose(document.getElementById('chart1'))
      this.myChart = echarts.init(document.getElementById('chart1'))

      const data = await this.getData() || []

      // 绘制图表
      this.setChartOption(data)
    },
    setChartOption (data) {
      const xaxisData = []
      const yaxisData = []
      data.forEach(item => {
        xaxisData.push(item.title)
        yaxisData.push(item.rate * 100)
      })

      this.myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(255,255,255,0.75)',
          extraCssText: 'box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.3);',
          textStyle: {
            fontSize: 14,
            color: '#000'
          },
          formatter: (params) => {
            const item = params[0]
            return item.name + ' : ' + item.value.toFixed(2) + ' %'
          }
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'value',
            name: '',
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {

                // y轴网格线设置
                color: 'rgba(183, 200, 235, 0.08)',
                width: 1
              }
            },
            axisLabel: {
              show: true,
              fontSize: 15,
              color: '#fff',
              formatter: '{value}%'
            }
          }
        ],
        yAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: 18,
              margin: 20
            },
            axisLine: {
              lineStyle: {
                // y轴网格线设置
                color: 'rgba(183, 200, 235, 0.29)',
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            data: xaxisData.reverse()
          }
        ],
        series: [
          {
            type: 'bar',
            barWidth: 10,
            label: {
              show: false
            },
            itemStyle: {
              borderRadius: [0, 8, 8, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(14, 229, 232, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0, 180, 255, 1)'
                }
              ])
            },
            data: yaxisData.reverse()
          }
        ]
      })
    },
    async getData (sort = 2, isErr = 0) {
      const res = await request({
        url: urls.goods_price_trend,
        method: 'POST',
        data: {
          time_range: this.$store.state.time_range,
          limit: 10,
          offset: 0,
          sort,
          is_err: isErr
        }
      })
      return res.data.data
    },
    async optionChange (option) {
      const chartData = await this.getData(option.value === '3' ? undefined : Number(option.value), option.value === '3' ? 1 : 0)
      this.setChartOption(chartData)
    }
  }
}
</script>

<style lang="less" scoped>
.commodity_price_trend {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
