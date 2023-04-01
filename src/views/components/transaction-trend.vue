<template>
  <div class="transaction_trend">
    <Box title="交易增长趋势">
      <div id="chart4" class="chart"></div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import * as echarts from 'echarts'

export default {
  name: 'TransactionTrend',

  components: {
    Box
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart4'))
      const myChart = echarts.init(document.getElementById('chart4'))

      // 绘制图表
      myChart.setOption({
        color: ['rgba(59, 176, 242, 1)', 'rgba(46, 255, 169, 1', 'rgba(252, 230, 119, 1)', 'rgba(25, 216, 254, 1)'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true,
          textStyle: {
            color: 'rgba(255, 255, 255, 1)',
            fontSize: 18
          },
          itemGap: 30,
          icon: 'circle'
        },
        grid: {
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
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
            },
            data: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
            boundaryGap: false // 不留白，从原点开始
          }
        ],
        yAxis: [
          {
            // minInterval: 1,
            type: 'value',
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
            name: '交易额',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(59, 176, 242, 1)' // 线条颜色
              }
            },
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: 'rgba(59, 176, 242, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(59, 176, 242, 0)'
                  }
                ],
                global: false
              }
            },
            data: ['30', '70', '130', '200', '90', '30', '70', '130', '200', '90']
          },
          {
            name: '订单数',
            type: 'line',
            showSymbol: false,
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(46, 255, 169, 1)' // 线条颜色
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: 'rgba(46, 255, 169, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(46, 255, 169, 0)'
                  }
                ],
                global: false
              }
            },
            data: ['95', '30', '170', '60', '210', '30', '70', '130', '200', '90']
          },
          {
            name: '用户数',
            type: 'line',
            showSymbol: false,
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(252, 230, 119, 1)' // 线条颜色
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: 'rgba(252, 230, 119, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(252, 230, 119, 0)'
                  }
                ],
                global: false
              }
            },
            data: ['120', '130', '270', '160', '110', '130', '170', '230', '100', '190']
          },
          {
            name: '商品数',
            type: 'line',
            showSymbol: false,
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(25, 216, 254, 1)' // 线条颜色
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  // 渐变颜色
                  {
                    offset: 0,
                    color: 'rgba(25, 216, 254, 0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(25, 216, 254, 0)'
                  }
                ],
                global: false
              }
            },
            data: ['80', '20', '150', '40', '180', '10', '90', '100', '100', '50']
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.transaction_trend {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
