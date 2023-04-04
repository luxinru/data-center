<template>
  <div class="channel-source">
    <Box title="渠道来源">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange" />
      </template>

      <div id="chart2" class="chart"></div>
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
  name: 'ChannelSource',

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
          label: '订单渠道来源'
        },
        {
          value: '2',
          label: '用户渠道来源'
        }
      ],
      sourceTypes: {
        1: 'h5',
        2: 'app',
        3: '小程序',
        4: '大江网',
        5: 'i南昌',
        6: '鹭鹭行'
      },
      myChart: null
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart2'))
      this.myChart = echarts.init(document.getElementById('chart2'))

      const data = await this.getData() || []

      // 绘制图表
      this.setChartOption(data)
    },
    setChartOption (data) {
      const xaxisData = []
      const yaxisData1 = []
      const yaxisData2 = []
      data.forEach(item => {
        xaxisData.push(this.sourceTypes[item.source_type])
        yaxisData1.push(item.sum_price)
        yaxisData2.push(item.order_count)
      })

      this.myChart.setOption({
        // 提示框
        tooltip: {
          trigger: 'item'
        },

        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          containLabel: true
        },

        // 头部标注
        legend: {
          data: ['交易额', '订单数'],
          textStyle: {
            color: '#fff',
            fontSize: 19
          }
        },

        xAxis: [
          {
            type: 'value',
            axisLabel: {
              interval: 0,
              color: '#fff',
              fontSize: 15
            },
            axisLine: {
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            },
            splitLine: {
              // 网格线
              show: false
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
              // y轴
              show: false
            },
            axisTick: {
              // y轴刻度线
              show: false
            },
            // prettier-ignore
            data: xaxisData,
            splitLine: {
              // 网格线
              show: false
            }
          }
        ],

        series: [
          {
            type: 'bar',
            name: '交易额',
            data: yaxisData1,
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(1, 243, 177, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(25, 190, 238, 1)'
                }
              ])
            },

            // 为柱条添加背景色
            // 用 showBackground 开启，并且可以通过 backgroundStyle 配置。
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(118, 168, 255, 0.1)'
            }
          },
          {
            type: 'bar',
            name: '订单数',
            data: yaxisData2,
            barWidth: 10,
            itemStyle: {
              // 柱条的颜色（color）；
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                {
                  offset: 0,
                  color: 'rgba(0, 69, 255, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(25, 225, 238, 1)'
                }
              ])
            },
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(118, 168, 255, 0.1)'
            }
          }
        ]
      })
    },
    async getData (type) {
      const res = await request({
        url: urls.channel_source,
        method: 'POST',
        data: {
          time_range: this.$store.state.time_range
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
.channel-source {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
