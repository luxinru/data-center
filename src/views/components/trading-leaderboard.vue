<template>
  <div class="trading_leaderboard">
    <Box title="交易排行榜">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange" />
      </template>

      <XTable
        autoScrollId="tbody1"
        :columns="columns"
        :tableData="tableData"
        @onRowClick="onRowClick"
      />
    </Box>

    <XModal v-show="isShowModal" @close="onModalClose">
      <div class="modal">
        <div class="title">
          <span>商品详情</span>
          <img src="@/assets/images/close.png" alt="" @click="onModalClose" />
        </div>

        <div class="content">
          <div class="info">
            <div class="details">
              <img :src="detailData.thumb" alt="" />

              <div class="labels">
                <div class="item">
                  <span>商品名称：</span>
                  <p>{{ detailData.title || '-' }}</p>
                </div>
                <div class="item">
                  <span>上架时间：</span>
                  <p>
                    {{
                      detailData.create_time
                        ? Moment(Number(detailData.create_time) * 1000).format(
                            'YYYY-MM-DD HH:mm:ss'
                          )
                        : '-'
                    }}
                  </p>
                </div>
                <div class="item">
                  <span>商品产地：</span>
                  <p>{{ detailData.province || '-' }}</p>
                </div>
                <div class="item">
                  <span>商户名称：</span>
                  <p>{{ detailData.merchant_name || '-' }}</p>
                </div>
                <div class="item">
                  <span>商品分类：</span>
                  <p>{{ detailData.categories || '-' }}</p>
                </div>
                <div class="item">
                  <span>商品评分：</span>
                  <p>{{ detailData.avgScore || '-' }}分</p>
                  <el-rate
                    v-model="detailData.avgScore"
                    disabled
                    style="margin-left: 10px; margin-bottom: 8px"
                  >
                  </el-rate>
                </div>
              </div>
            </div>

            <div id="chart6" class="chart"></div>
          </div>

          <div class="chat" id="chat1">
            <div class="title">商品评价</div>

            <div
              class="chat_item"
              v-for="(item, index) in detailData.comments"
              :key="index"
            >
              <div class="user">
                <img :src="item.avatar" alt="" />
                <span class="name">{{ item.masked_name }}</span>
                <el-rate
                  v-model="item.score"
                  disabled
                  style="margin-left: 10px; margin-bottom: 8px"
                >
                </el-rate>
                <span class="time">{{ item.time }}</span>
              </div>
              <div class="chat_content">
                {{ item.comment }}
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
import request from '@/api/request'
import urls from '@/api/urls'
import Moment from 'moment'

export default {
  name: 'TradingLeaderboard',

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
          label: '商品数量'
        },
        {
          value: '2',
          label: '商品销量'
        },
        {
          value: '3',
          label: '商品金额'
        }
      ],

      columns: [
        {
          name: '商品名称',
          value: 'title',
          width: '180px',
          align: 'left'
        },
        {
          name: '产地',
          value: 'city'
        },
        {
          name: '销量',
          value: 'sum_total',
          isNumber: true
        },
        {
          name: '金额',
          value: 'sum_price',
          isNumber: true,
          width: '100px'
        }
        // {
        //   name: '评分',
        //   value: 'score'
        // }
      ],

      tableData: [],

      detailData: {}
    }
  },

  mounted () {
    this.changeTableData(Number(this.options[0].value))
  },

  methods: {
    Moment,

    onModalClose () {
      this.isShowModal = false
    },

    async getData (type) {
      const res = await request({
        url: urls.product_rank,
        method: 'POST',
        data: {
          time_range: this.$store.state.time_range,
          type,
          limit: 999,
          offset: 0
        }
      })
      return res.data.data
    },

    async changeTableData (type) {
      this.tableData = await this.getData(type)

      this.autoScroll()
    },

    autoScroll () {
      const scrollContainer = document.getElementById('chat1')

      // Automatically scroll the container every 2 seconds
      let intervalId = setInterval(function () {
        scrollContainer.scrollTop += 1 // Adjust the amount of scrolling here
        if (
          scrollContainer.scrollTop ===
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          scrollContainer.scrollTop = 0
        }
      }, 60)

      // Pause scrolling when the mouse is over the container
      scrollContainer.addEventListener('mouseover', function () {
        clearInterval(intervalId)
      })

      // Resume scrolling when the mouse leaves the container
      scrollContainer.addEventListener('mouseout', function () {
        intervalId = setInterval(function () {
          scrollContainer.scrollTop += 1 // Adjust the amount of scrolling here
          if (
            scrollContainer.scrollTop ===
            scrollContainer.scrollHeight - scrollContainer.clientHeight
          ) {
            scrollContainer.scrollTop = 0
          }
        }, 60)
      })
    },

    init (data) {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart6'))
      const myChart = echarts.init(document.getElementById('chart6'))

      const dates = []
      const prices = []
      const sales = []
      data.forEach((item) => {
        dates.push(item.date.substring(0, 10))
        prices.push(item.price)
        sales.push(item.sales)
      })
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
            fontSize: 18
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
            data: dates,
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
              fontSize: 18
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
              fontSize: 18
            }
          }
        ],
        series: [
          {
            name: '近期价格趋势',
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
            data: prices
          },
          {
            name: '近期销量趋势',
            type: 'line',
            symbol: 'none', // 默认是空心圆（中间是白色的），改成实心圆
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
                color: 'rgba(46, 255, 169, 1)' // 线条颜色
              }
            },
            itemStyle: {
              normal: {
                color: '#fff600'
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
                      color: 'rgba(46, 255, 169, 0.3)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(46, 255, 169, 0.1)'
                    }
                  ],
                  false
                )
              }
            },
            data: sales
          }
        ]
      })
    },

    optionChange (option) {
      this.changeTableData(Number(option.value))
    },

    onRowClick (row) {
      this.isShowModal = true

      this.$nextTick(() => {
        request({
          url: urls.goods_detail,
          method: 'POST',
          data: {
            time_range: this.$store.state.time_range,
            goods_id: row.product_id
          }
        }).then((res) => {
          this.detailData = res.data.data
          this.init(res.data.data.trend)
        })
      })
    }
  }
}
</script>

<style lang="less">
.el-rate__icon {
  font-size: 26px;
}
</style>

<style lang="less" scoped>
.trading_leaderboard {
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
          height: 350px;
          display: flex;
          align-items: center;

          img {
            width: 350px;
            height: 350px;
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
                font-size: 18px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
              }

              p {
                font-size: 18px;
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
        position: relative;
        flex: 1 0;
        display: flex;
        flex-direction: column;
        margin-left: 36px;
        overflow-y: auto;
        padding-right: 10px;

        .title {
          position: sticky;
          top: 0;
          width: 100%;
          height: 56px;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          border-bottom: 1px solid rgba(58, 137, 206, 1);
          flex-shrink: 0;
          background-color: #041024;
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
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }

            .time {
              font-size: 18px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }

          .chat_content {
            font-size: 18px;
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
