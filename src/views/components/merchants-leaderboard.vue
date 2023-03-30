<template>
  <div class="merchants_leaderboard">
    <Box title="商户排行榜">
      <template #select>
        <XSelect :value="value" :options="options" />
      </template>

      <XTable :columns="columns" :tableData="tableData" autoScrollId="tbody2" @onRowClick="onRowClick"/>
    </Box>

    <XModal v-show="isShowModal">
      <div class="modal">
        <div class="title">
          <span>商户详情</span>
          <img src="@/assets/images/close.png" alt="" @click="onModalClose" />
        </div>

        <div class="content">
          <div class="info">
            <div class="details">
              <img src="@/assets/images/pic-5.png" alt="" />

              <div class="labels">
                <div class="item">
                  <span>商户名称：</span>
                  <p>苏泊尔空气炸电烤箱 家用38L独立控温 OD38AK813</p>
                </div>
                <div class="item">
                  <span>商户分类：</span>
                  <p>苏泊尔广发旗舰店</p>
                </div>
                <div class="item">
                  <span>商户产地：</span>
                  <p>江苏</p>
                </div>
                <div class="item">
                  <span>商户类型：</span>
                  <p>南昌自营</p>
                </div>
                <div class="item">
                  <span>商品数量：</span>
                  <p>家用电器</p>
                </div>
                <div class="item">
                  <span>订单数量：</span>
                  <p>家用电器</p>
                </div>
                <div class="item">
                  <span>用户评分：</span>
                  <p>4.5分</p>
                  <el-rate v-model="rate" disabled style="margin-left: 10px">
                  </el-rate>
                </div>
              </div>
            </div>

            <div id="chart7" class="chart"></div>
          </div>

          <div class="chat">
            <div class="title">用户评价</div>

            <div class="chat_item" v-for="index in 20" :key="index">
              <div class="user">
                <img src="@/assets/images/pic-1.png" alt="" />
                <span class="name">熙***乐</span>
                <span class="time">2023-03-28</span>
              </div>
              <div class="chat_content">
                烤箱质量很好，启动声音不大，速度快。颜色也是喜欢的。大小
                也很合适，烤箱质量很好，启动声音不大.
              </div>
            </div>
          </div>
        </div>
      </div>
    </XModal>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'
import XSelect from '@/components/x-select.vue'
import XModal from '@/components/x-model.vue'
import * as echarts from 'echarts'

export default {
  name: 'MerchantsLeaderboard',

  components: {
    Box,
    XTable,
    XSelect,
    XModal
  },

  data () {
    return {
      rate: 4.5,
      isShowModal: false,
      value: '1',
      options: [
        {
          value: '1',
          label: '商户金额'
        },
        {
          value: '2',
          label: '门店金额'
        },
        {
          value: '3',
          label: '自提点金额'
        }
      ],
      columns: [
        {
          name: '名称',
          value: 'b'
        },
        {
          name: '地区',
          value: 'c'
        },
        {
          name: '销量',
          value: 'd',
          isNumber: true
        },
        {
          name: '金额',
          value: 'e',
          isNumber: true
        },
        {
          name: '评分',
          value: 'f'
        }
      ],
      tableData: [
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        }
      ]
    }
  },

  methods: {
    onModalClose () {
      this.isShowModal = false
    },

    init () {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart7'))
      const myChart = echarts.init(document.getElementById('chart7'))

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
          left: '1%',
          right: '1%',
          top: '10%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '09',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26'
            ],
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
            },
            boundaryGap: false // 不留白，从原点开始
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
            name: '近期交易趋势',
            type: 'line',
            symbol: 'none', // 默认是空心圆（中间是白色的），改成实心圆
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(2, 105, 233, 1)' // 线条颜色
              }
            },
            itemStyle: {
              normal: {
                color: '#00f0ff'
              }
            },
            areaStyle: {
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(2, 105, 233, 0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(2, 105, 233, 0.1)'
                    }
                  ],
                  false
                )
              }
            },
            data: [
              1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000,
              2000, 1000, 2000, 1000, 2000, 1000, 2000, 1000, 2000
            ]
          }
        ]
      })
    },

    onRowClick (row) {
      this.isShowModal = true

      this.$nextTick(() => {
        this.init()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.merchants_leaderboard {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .modal {
    width: 1868px;
    height: 920px;
    background: url('~@/assets/images/details-bj.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow: hidden;

    .title {
      width: 100%;
      height: 67px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 40px;
        font-family: YouSheBiaoTiHei;
        font-weight: 400;
        color: #ffffff;
        margin-left: 36px;
      }

      img {
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .content {
      position: relative;
      width: 100%;
      flex: 1 0;
      overflow: hidden;
      padding: 16px 0;
      overflow: hidden;
      display: flex;

      .info {
        flex: 2 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .details {
          width: 100%;
          height: 338px;
          display: flex;
          align-items: center;

          img {
            height: 338px;
            margin-right: 25px;
          }

          .labels {
            flex: 1 0;
            height: 100%;
            display: flex;
            flex-direction: column;

            .item {
              width: 100%;
              flex: 1 0;
              border-bottom: 1px dashed rgba(58, 137, 206, 0.3);
              display: flex;
              align-items: center;

              span {
                width: 120px;
                white-space: nowrap;
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
              }

              p {
                font-size: 24px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #05b9ff;
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              &:nth-child(1) {
                p {
                  flex: 1 0;
                }
              }
            }
          }
        }

        .chart {
          width: 100%;
          flex: 1 0;
          margin-top: 20px;
        }
      }

      .chat {
        flex: 1 0;
        display: flex;
        flex-direction: column;
        margin-left: 36px;
        overflow-y: auto;
        padding-right: 10px;

        .title {
          width: 100%;
          height: 56px;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          border-bottom: 1px solid rgba(58, 137, 206, 1);
          flex-shrink: 0;
        }

        .chat_item {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 20px 0;
          flex-shrink: 0;
          border-bottom: 1px dashed rgba(58, 137, 206, 0.5);

          .user {
            width: 100%;
            height: 35px;
            display: flex;
            align-items: center;

            img {
              width: 35px;
              height: 35px;
              overflow: hidden;
              border-radius: 50%;
              margin-right: 16px;
            }

            .name {
              flex: 1 0;
              font-size: 22px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }

            .time {
              font-size: 20px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }

          .chat_content {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #05b9ff;
            line-height: 32px;
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
