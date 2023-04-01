<template>
  <div class="transaction_categorization">
    <Box title="交易分类占比">
      <template #select>
        <XSelect :value="value" :options="options" />
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
      ]
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart9'))
      const myChart = echarts.init(document.getElementById('chart9'))

      var data = [
        556, 1599, 500, 121, 186, 457, 436, 373, 4, 3, 77, 41, 3, 16, 0, 0, 4,
        0, 0, 0, 2, 1, 0, 9, 0, 0, 1, 5611
      ]
      var getsjjg = [
        '新鲜水果',
        '蔬菜豆菇',
        '鲜肉蛋禽',
        '品质水产',
        '速冻食品',
        '粮油副食',
        '酒水茶饮',
        '休闲食品',
        '营养保健',
        '厨卫餐具',
        '日化家用',
        '个护美妆',
        '生活服务',
        '医疗健康',
        '娱乐景点',
        '酒店民宿',
        '美食餐饮',
        '花卉景观',
        '母婴用品',
        '数码',
        '电器',
        '服装箱包',
        '运动健身',
        '饰品',
        '家纺',
        '家具',
        '进口专区',
        '电子卡劵'
      ]
      var getsjjgrs = data
      var syjgdata = []
      let total = 0
      for (var i = 0; i < getsjjg.length; i++) {
        total += data[i]
        syjgdata.push({
          name: getsjjg[i],
          value: getsjjgrs[i]
        })
      }

      this.labels = syjgdata
      this.total = total

      // 绘制图表
      myChart.setOption({
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
            const index = getsjjg.indexOf(name)
            return (
              `${name}` + ' ' + `${((data[index] / total) * 100).toFixed(2)}%`
            )
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
