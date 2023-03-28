<template>
  <div class="merchant_categorization">
    <Box title="商户分类">
      <div id="chart5" class="chart"></div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import * as echarts from 'echarts'

export default {
  name: 'MerchantCategorization',

  components: {
    Box
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('chart5'))

      var total = 0
      var data = [35, 30, 22, 55]
      var getsjjg = ['>100000', '50000-100000', '10000-50000', '<10000']
      var getsjjgrs = data
      var syjgdata = []
      for (const i in getsjjgrs) {
        total += getsjjgrs[i]
      }
      for (var i = 0; i < getsjjg.length; i++) {
        syjgdata.push(
          {
            name: getsjjg[i],
            value: getsjjgrs[i]
          },
          {
            value: total / 150,
            name: ''
          }
        )
      }

      var colorList = [
        ['rgba(0,132,255,1)', 'rgba(0,132,255,0.7)'],
        ['', ''],
        ['rgba(55,255,201,1)', 'rgba(55,255,201,0.7)'],
        ['', ''],
        ['rgba(25,214,255,1)', 'rgba(25,214,255,0.7)'],
        ['', ''],
        ['rgba(255,231,119,1)', 'rgba(255,231,119,0.7)'],
        ['', '']
      ]

      // 绘制图表
      myChart.setOption({
        grid: {
          left: '0',
          top: '0',
          right: '0',
          bottom: '0'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          icon: 'circle',
          itemWidth: 10,
          itemGap: 15,
          bottom: 0,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: 'RGBA(10, 28, 64, 1)'
              }
            },
            type: 'pie',
            hoverAnimation: false,
            radius: ['40%', '50%'],
            center: ['50%', '40%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 1
              }
            ],
            z: 100
          },
          {
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.6)'
              }
            },
            type: 'pie',
            hoverAnimation: false,
            radius: ['50%', '60%'],
            center: ['50%', '40%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 1
              }
            ],
            z: 100
          },
          {
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.6)'
              }
            },
            type: 'pie',
            hoverAnimation: false,
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 1
              }
            ],
            z: 100
          },
          {
            itemStyle: {
              normal: {
                color: function (params) {
                  if (params.dataIndex === 0) {
                    return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                      {
                        offset: 0,
                        color: colorList[params.dataIndex][0]
                      },
                      {
                        offset: 1,
                        color: colorList[params.dataIndex][1]
                      }
                    ])
                  } else {
                    if (params.dataIndex % 2 === 0) {
                      return new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                        {
                          offset: 0,
                          color: colorList[params.dataIndex][0]
                        },
                        {
                          offset: 1,
                          color: colorList[params.dataIndex][1]
                        }
                      ])
                    }
                  }
                }
              }
            },
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            hoverAnimation: true,
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '40%'],
            data: syjgdata,
            z: 10
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.merchant_categorization {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
