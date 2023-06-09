<template>
  <div class="device_list_root">
    <Box title="设备列表">
      <template #select>
        <XSelect :value="value" :options="options" @select="optionChange" />
      </template>

      <XTable
        :isRank="false"
        :columns="columns"
        :tableData="tableData"
        autoScrollId="tbody3"
        @onRowClick="onRowClick"
      />
    </Box>

    <XModal v-show="isShowModal" @close="onModalClose">
      <div class="modal">
        <div class="title">
          <span>设备详情</span>
          <img src="@/assets/images/close.png" alt="" @click="onModalClose" />
        </div>

        <div class="content">
          <div class="info">
            <div class="details">
              <img src="@/assets/images/pic-7.png" alt="" />

              <div class="labels">
                <div class="item">
                  <span>设备编号：</span>
                  <p>{{currentData.device_id}}</p>
                </div>
                <div class="item">
                  <span>设备地址：</span>
                  <p>{{currentData.addr}}</p>
                </div>
                <div class="item">
                  <span>设备温度：</span>
                  <p>{{currentData.temp}}</p>
                </div>
                <div class="item">
                  <span>设备格子数：</span>
                  <p>{{currentData.box_amount}}</p>
                </div>
                <div class="item">
                  <span>占用数量：</span>
                  <p>{{currentData.used_box_amount}}</p>
                </div>
                <div class="item">
                  <span>联系人：</span>
                  <p>{{currentData.real_name}}</p>
                </div>
                <div class="item">
                  <span>联系电话：</span>
                  <p>{{currentData.mobile}}</p>
                </div>
              </div>
            </div>

            <div id="chart8" class="chart"></div>
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
  name: 'DeviceList',

  components: {
    Box,
    XTable,
    XSelect,
    XModal
  },

  props: ['cabinetList'],

  data () {
    return {
      isShowModal: false,
      value: '1',
      options: [
        {
          value: '2',
          label: '故障检修'
        },
        {
          value: '1',
          label: '正常运行'
        },
        {
          value: '3',
          label: '关闭暂停'
        }
      ],
      columns: [
        {
          name: '类型',
          value: 'type'
        },
        {
          name: '编号',
          value: 'device_id'
        },
        {
          name: '设备名称',
          value: 'cabinet_mark'
        },
        {
          name: '温度',
          value: 'temp'
        },
        {
          name: '网络状态',
          value: 'online_str',
          color: 'rgba(0, 186, 255, 1)'
        },
        {
          name: '设备状态',
          value: 'cabinet_status_str',
          color: 'rgba(0, 186, 255, 1)'
        }
      ],
      currentData: {}
    }
  },

  computed: {
    tableData () {
      return this.cabinetList.filter(item => item.cabinet_status === this.value)
    }
  },

  methods: {
    onModalClose () {
      this.isShowModal = false
    },

    init () {
      // 基于准备好的dom，初始化echarts实例
      echarts.dispose(document.getElementById('chart8'))
      const myChart = echarts.init(document.getElementById('chart8'))

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
            name: '近期使用频率',
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

    optionChange (option) {
      this.value = option.value
    },

    onRowClick (row) {
      this.isShowModal = true

      this.$nextTick(() => {
        this.currentData = row
        this.init()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.device_list_root {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .modal {
    width: 1153px;
    height: 920px;
    background: url('~@/assets/images/equipment-bj.png') no-repeat;
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
                width: 150px;
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
    }
  }
}
</style>
