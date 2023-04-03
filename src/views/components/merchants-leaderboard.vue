<template>
  <div class="merchants_leaderboard">
    <Box title="商户排行榜">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange" />
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
              <img :src="detailData.pic" width="365" height="338" style="color: white" alt="商户图片" />

              <div class="labels">
                <div class="item">
                  <span>商户名称：</span>
                  <p>{{detailData.name}}</p>
                </div>
                <div class="item">
                  <span>商户分类：</span>
                  <p>{{detailData.cate}}</p>
                </div>
                <div class="item">
                  <span>商户产地：</span>
                  <p>{{detailData.province}}</p>
                </div>
                <div class="item">
                  <span>商户类型：</span>
                  <p>{{detailData.cate}}</p>
                </div>
                <div class="item">
                  <span>商品数量：</span>
                  <p>{{detailData.goods_count}}</p>
                </div>
                <div class="item">
                  <span>订单数量：</span>
                  <p>{{detailData.order_count}}</p>
                </div>
                <div class="item">
                  <span>用户评分：</span>
                  <p>{{detailData.rating || '-'}}分</p>
                  <el-rate v-model="detailData.rating" disabled style="margin-left: 10px">
                  </el-rate>
                </div>
              </div>
            </div>

            <div id="chart7" class="chart"></div>
          </div>

          <div class="chat">
            <div class="title">用户评价</div>

            <div class="chat_item" v-for="(item, index) in detailData.comments" :key="index">
              <div class="user">
                <img :src="item.avatar || defaultHeadSrc" alt="" />
                <span class="name">{{ item.masked_name }}</span>
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
import defaultHeadSrc from '@/assets/images/user.png'

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
      defaultHeadSrc: defaultHeadSrc,
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
          value: 'name'
        },
        {
          name: '地区',
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
          isNumber: true
        },
        {
          name: '评分',
          value: 'rating'
        }
      ],
      tableData: [],
      detailData: {}
    }
  },

  mounted () {
    this.changeTableData(1)
  },
  computed: {
    timeRange () {
      return this.$store.state.time_range
    }
  },
  watch: {
    value (newVal) {
      this.changeTableData(Number(newVal))
    },
    timeRange (newVal) {

    }
  },

  methods: {
    onModalClose () {
      this.isShowModal = false
    },

    async getData (type) {
      const res = await request({
        url: urls.merchant_rank,
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
    },

    init (data) {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart7'))
      const myChart = echarts.init(document.getElementById('chart7'))

      const dates = []
      const counts = []
      const prices = []
      data.forEach(item => {
        dates.push(item.date)
        counts.push(item.order_count)
        prices.push(item.sum_price)
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
            data: prices
          }
        ]
      })
    },

    optionChange (option) {
      this.value = option.value
    },

    onRowClick (row) {
      this.isShowModal = true

      this.$nextTick(() => {
        request({
          url: urls.merchant_detail,
          method: 'POST',
          data: {
            time_range: this.$store.state.time_range,
            id: row.id
          }
        }).then(res => {
          const result = res.data.data
          this.detailData = result
          this.init(result.trend || [])
        })
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
            word-wrap: break-word;
          }
        }
      }
    }
  }
}
</style>
