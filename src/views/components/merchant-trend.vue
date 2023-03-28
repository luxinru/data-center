<template>
  <div class="merchant_trend">
    <Box title="商户趋势">
      <div id="chart3" class="chart"></div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import * as echarts from 'echarts'

export default {
  name: 'MerchantTrend',

  components: {
    Box
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('chart3'))

      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          position: 'top',
          textStyle: {
            color: '#fff',
            fontSize: 19
          },
          itemGap: 30
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '10%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['17', '18', '19', '20', '21', '22', '23', '24'],
            axisPointer: {
              type: 'shadow'
            },
            axisTick: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(183, 200, 235, 0.29)',
                type: 'solid'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 16
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(183, 200, 235, 0.29)',
                width: 1,
                type: 'dashed'
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              fontSize: 16
            }
          }
        ],
        series: [
          {
            name: '商户数',
            type: 'bar',
            barWidth: 10,
            data: [30000, 20000, 11600, 22200, 44400, 28000, 44400, 28000],
            itemStyle: {
              barBorderRadius: [8, 8, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(90, 235, 216, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(90, 235, 216, 0.1)'
                }
              ])
            }
          },
          {
            name: '门店数',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              barBorderRadius: [8, 8, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(59, 176, 242, 1)'
                },
                {
                  offset: 0.5,
                  color: 'rgba(74, 128, 229, 0.62)'
                },
                {
                  offset: 1,
                  color: 'rgba(74, 128, 229, 0)'
                }
              ])
            },
            data: [10000, 20000, 10000, 10000, 50000, 17000, 50000, 17000]
          },
          {
            name: '自提点数',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
              barBorderRadius: [8, 8, 0, 0],
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 191, 124, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 191, 124, 0.1)'
                }
              ])
            },
            data: [30000, 30000, 40000, 30000, 28000, 32000, 28000, 32000]
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.merchant_trend {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
