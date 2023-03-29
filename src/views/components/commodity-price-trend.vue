<template>
  <div class="commodity_price_trend">
    <Box title="商品价格趋势">
      <template #select>
        <XSelect :value="value" :options="options" />
      </template>

      <div id="chart1" class="chart"></div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import * as echarts from 'echarts'
import XSelect from '@/components/x-select.vue'

export default {
  name: 'CommodityPriceTrend',

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
          label: '上升'
        },
        {
          value: '2',
          label: '下降'
        },
        {
          value: '3',
          label: '异常'
        }
      ]
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('chart1'))

      const xaxisData = [
        '家用电器',
        '速冻食品',
        '粮油副食',
        '酒水茶饮',
        '美食餐饮',
        '蔬菜豆菇',
        '新鲜水果',
        '鲜肉蛋禽',
        '酒店民宿'
      ]
      const yaxisData = [90, 80, 100, 70, 65, 69, 80, 69, 80]

      // 绘制图表
      myChart.setOption({
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
            return item.name + ' : ' + item.value + ' 条'
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
              color: '#fff'
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
            data: xaxisData
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
            data: yaxisData
          }
        ]
      })
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
