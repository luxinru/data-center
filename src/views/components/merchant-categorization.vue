<template>
  <div class="merchant_categorization">
    <Box title="商户分类占比">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange" />
      </template>

      <div id="chart5" class="chart"></div>

      <div class="labels">
        <div class="item" v-for="(item, index) in labels" :key="index">
          <span class="icon" :style="{background: colors[index]}"></span>
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
  name: 'MerchantCategorization',

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
          label: '商户数量'
        },
        {
          value: '2',
          label: '商户销量'
        },
        {
          value: '3',
          label: '商户金额'
        }
      ],
      labels: [],
      total: 0,
      colors: [
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
        '#9a60b4',
        '#ea7ccc'
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
      echarts.dispose(document.getElementById('chart5'))
      this.myChart = echarts.init(document.getElementById('chart5'))

      const data = await this.getData() || []

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
            a: {

            },
            b: {}
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
            radius: ['20%', '30%'],
            center: ['50%', '35%'],
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
            z: 100,
            silent: true
          },
          {
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.6)'
              }
            },
            type: 'pie',
            hoverAnimation: false,
            radius: ['30%', '40%'],
            center: ['50%', '35%'],
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
            z: 100,
            silent: true
          },
          {
            itemStyle: {
              normal: {
                color: 'rgba(0,0,0,0.6)'
              }
            },
            type: 'pie',
            hoverAnimation: false,
            radius: ['30%', '50%'],
            center: ['50%', '35%'],
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
            z: 100,
            silent: true
          },
          {
            labelLine: {
              show: false
            },
            label: {
              show: false
            },
            hoverAnimation: true,
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['50%', '35%'],
            data: syjgdata,
            z: 10
          }
        ]
      })
    },
    async getData (type) {
      const res = await request({
        url: urls.merchant_cate_ratio,
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
.merchant_categorization {
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
