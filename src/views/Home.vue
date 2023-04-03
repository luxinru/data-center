<template>
  <div class="home">
    <!-- 背景图片图层 -->
    <div class="bac_imgs">
      <img class="top" src="@/assets/images/top.png" alt="" />
      <img class="bottom" src="@/assets/images/bottom.png" alt="" />
      <img class="left" src="@/assets/images/left.png" alt="" />
      <img class="right" src="@/assets/images/right.png" alt="" />

      <span class="top_title"> 供销江南大数据中心 </span>
    </div>

    <div class="part">
      <LeftPart v-if="type === 1" />
      <leftImgs v-else />
    </div>

    <div class="map">
      <img class="left" src="@/assets/images/left-1.png" alt="" />
      <img class="right" src="@/assets/images/right-1.png" alt="" />

      <div v-if="type === 2" id="provinceMap" class="provinceMap"></div>

      <div class="svg_map" v-if="type === 1 && isShowSvg2Map === false">
        <img class="bac" src="@/assets/images/map.png" alt="" />
        <div id="svgmap" class="svg"></div>
      </div>

      <div v-if="isShowSvg2Map" id="provinceMap" class="provinceMap"></div>

      <div
        class="tooltip"
        v-show="isTooltipShow"
        :style="{ top: y + 150 + 'px', left: x + 'px' }"
      >
        <span class="title"> {{ cityName }} </span>

        <div class="content">
          <div class="item">
            <span class="label">交易额(年)</span>
            <span class="value">{{
              cityName && cityData[cityName] ? cityData[cityName].sum_price : ''
            }}</span>
            <span class="unit">元</span>
          </div>
          <div class="item">
            <span class="label">订单数(年)</span>
            <span class="value">{{
              cityName && cityData[cityName]
                ? cityData[cityName].order_count
                : ''
            }}</span>
            <span class="unit">笔</span>
          </div>
          <div class="item">
            <span class="label">商品数</span>
            <span class="value">{{
              cityName && cityData[cityName]
                ? cityData[cityName].goods_count
                : ''
            }}</span>
            <span class="unit">件</span>
          </div>
          <div class="item">
            <span class="label">商户数</span>
            <span class="value">{{
              cityName && cityData[cityName]
                ? cityData[cityName].merchant_count
                : ''
            }}</span>
            <span class="unit">户</span>
          </div>
          <div class="item">
            <span class="label">门店数</span>
            <span class="value">{{
              cityName && cityData[cityName]
                ? cityData[cityName].store_count
                : ''
            }}</span>
            <span class="unit">个</span>
          </div>
          <div class="item">
            <span class="label">用户数</span>
            <span class="value">{{
              cityName && cityData[cityName]
                ? cityData[cityName].user_count
                : ''
            }}</span>
            <span class="unit">个</span>
          </div>
          <div class="item">
            <span class="label">自提点数</span>
            <span class="value">{{
              cityName && cityData[cityName]
                ? cityData[cityName].post_count
                : ''
            }}</span>
            <span class="unit">个</span>
          </div>
        </div>
      </div>

      <div class="tooltip2" v-if="type === 1 && isShowSvg2Map === false">
        <div class="item">
          <span></span>
          <div>交易额</div>
        </div>
        <div class="item">
          <span></span>
          <div>订单数</div>
        </div>
        <div class="item">
          <span></span>
          <div>商户数</div>
        </div>
      </div>

      <div class="bars">
        <div class="item" v-for="(item, index) in barsList" :key="index">
          <span>
            <CountUp
              v-if="index === 0"
              :startVal="0"
              :endVal="item.value"
              :duration="2"
              :options="{ decimalPlaces: 2, useGrouping: false }"
            ></CountUp>
            <CountUp
              v-else
              :startVal="0"
              :endVal="item.value"
              :duration="2"
              :options="{ useGrouping: false }"
            ></CountUp>
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="footer">
        <el-tooltip
          effect="dark"
          content="交易地图"
          placement="top"
          :hide-after="1000000"
        >
          <div class="item" @click="onFooterClick(1)">
            <img class="bac" src="@/assets/images/base.png" alt="" />
            <img class="icon" src="@/assets/images/Tradingmap.png" alt="" />
          </div>
        </el-tooltip>

        <el-tooltip
          effect="dark"
          content="供销物联网"
          placement="top"
          :hide-after="1000000"
        >
          <div class="item" @click="onFooterClick(2)">
            <img class="bac" src="@/assets/images/base.png" alt="" />
            <img
              class="icon"
              src="@/assets/images/Internetofthings.png"
              alt=""
            />
          </div>
        </el-tooltip>

        <el-tooltip
          effect="dark"
          content="视频列表"
          placement="top"
          :hide-after="1000000"
        >
          <div class="item" @click="onFooterClick(3)">
            <img class="bac" src="@/assets/images/base.png" alt="" />
            <img class="icon" src="@/assets/images/Videolist.png" alt="" />
          </div>
        </el-tooltip>

        <el-tooltip
          effect="dark"
          content="APP演示"
          placement="top"
          :hide-after="0"
        >
          <div class="item" @click="onFooterClick(4)">
            <img class="bac" src="@/assets/images/base.png" alt="" />
            <img class="icon" src="@/assets/images/app.png" alt="" />
          </div>
        </el-tooltip>

        <el-tooltip placement="top">
          <el-date-picker
            v-model="daterange"
            slot="content"
            type="daterange"
            :clearable="false"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <div class="item">
            <img class="bac" src="@/assets/images/base.png" alt="" />
            <img class="icon" src="@/assets/images/date.png" alt="" />
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="part">
      <RightPart v-if="type === 1" />
      <RightImgs v-else />
    </div>

    <XModal v-show="isShowModal3">
      <div class="device_list">
        <div class="title">
          <span>视频列表</span>
          <img src="@/assets/images/close.png" alt="" @click="onModal3Close" />
        </div>

        <div class="content">
          <template v-if="!isFullScreen">
            <div class="item" v-for="index in 30" :key="index">
              <img class="bac" src="@/assets/images/pic-1.png" alt="" />

              <div class="bar">
                <img class="icon" src="@/assets/images/video.png" alt="" />
                <span>宣传视频</span>

                <img
                  class="full"
                  src="@/assets/images/full-screen.png"
                  alt=""
                  @click="isFullScreen = !isFullScreen"
                />
              </div>
            </div>
          </template>

          <div
            v-else
            class="fullscreen"
            :style="{
              width: isFullScreen ? '100%' : '0',
              height: isFullScreen ? '100%' : '0',
            }"
          >
            <img class="bac" src="@/assets/images/pic-1.png" alt="" />
          </div>
        </div>
      </div>
    </XModal>

    <XModal v-show="isShowModal">
      <div class="modal">
        <div class="title">
          <span>自提点详情</span>
          <img
            src="@/assets/images/close.png"
            alt=""
            @click="isShowModal = !isShowModal"
          />
        </div>

        <div class="content">
          <div class="info">
            <div class="details">
              <img src="@/assets/images/pic-7.png" alt="" />

              <div class="labels">
                <div class="item">
                  <span>类型：</span>
                  <p>自提点</p>
                </div>
                <div class="item">
                  <span>名称：</span>
                  <p>名称</p>
                </div>
                <div class="item">
                  <span>商户名称：</span>
                  <p>商户名称</p>
                </div>
                <div class="item">
                  <span>联系姓名：</span>
                  <p>联系姓名</p>
                </div>
                <div class="item">
                  <span>联系电话：</span>
                  <p>联系电话</p>
                </div>
                <div class="item">
                  <span>详细地址：</span>
                  <p>详细地址</p>
                </div>
                <div class="item">
                  <span>营业时间：</span>
                  <p>营业时间</p>
                </div>
                <div class="item">
                  <span>评分：</span>
                  <p>评分</p>
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
import CountUp from 'vue-countup-v2'
import LeftPart from './LeftPart.vue'
import RightPart from './RightPart.vue'
import XModal from '@/components/x-model.vue'
import * as echarts from 'echarts'
import svgMap from '@/assets/images/map.svg'
import request from '@/api/request'
import urls from '@/api/urls'
import leftImgs from './components/leftImgs.vue'
import RightImgs from './components/RightImgs.vue'

export default {
  name: 'Home',

  components: {
    CountUp,
    LeftPart,
    RightPart,
    XModal,
    leftImgs,
    RightImgs
  },

  data () {
    return {
      daterange: '',
      isShowModal: false,
      isShowModal3: false,
      isFullScreen: false,
      barsList: [
        {
          value: 4037969.99,
          label: '交易额'
        },
        {
          value: 18832,
          label: '订单数'
        },
        // {
        //   value: 12,
        //   label: '门店数'
        // },
        {
          value: 5623,
          label: '用户数'
        },
        {
          value: 97,
          label: '商户数'
        },
        {
          value: 3741,
          label: '商品数'
        },
        {
          value: 12,
          label: '设备数'
        }
      ],
      type: 1,
      x: 0,
      y: 0,
      isTooltipShow: false,
      cityName: '',
      isShowSvg2Map: false,
      cityData: {}
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.initSvgMap()
    })

    // todo
    // request({
    //   url: 'http://api.jnysmall.com/open-api/cabinet-list',
    //   params: {
    //     page: 1,
    //     limit: 999
    //   }
    // }).then(res => {
    //   console.log(111, res)
    // })
  },

  watch: {
    daterange (newVal) {
      this.$store.commit({
        type: 'setTimeRange',
        ranges: [
          Math.floor(new Date(newVal[0]).getTime() / 1000),
          Math.floor(new Date(newVal[1]).getTime() / 1000)
        ]
      })
    }
  },

  methods: {
    onFooterClick (type) {
      switch (type) {
        case 1:
          this.isShowSvg2Map = false
          this.type = type
          if (document.getElementById('provinceMap')) {
            const chart = echarts.getInstanceByDom(
              document.getElementById('provinceMap')
            )
            if (chart) {
              echarts.dispose(document.getElementById('provinceMap'))
            }
          }
          this.$nextTick(() => {
            this.initSvgMap()
          })
          break
        case 2:
          this.type = type
          this.isShowSvg2Map = false
          this.$nextTick(() => {
            this.initProvinceMap()
          })
          break
        case 3:
          this.isFullScreen = false
          this.isShowModal3 = true
          break

        case 4:
          window.open('http://shop.gxjnmall.com/')
          break
      }
    },

    onModal3Close () {
      this.isShowModal3 = false
    },

    async initSvgMap () {
      fetch(svgMap)
        .then((response) => response.text())
        .then((svgString) => {
          const chart = echarts.getInstanceByDom(
            document.getElementById('svgmap')
          )
          if (chart) {
            echarts.dispose(document.getElementById('svgmap'))
          }
          echarts.registerMap('svgMap', { svg: svgString })

          const echartObj = echarts.init(document.getElementById('svgmap'))

          const base64png =
            'image://data:image/png;base64,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'

          echartObj.setOption({
            tooltip: {
              show: false
            },

            geo: {
              map: 'svgMap',
              roam: false, // 不开启缩放和平移
              layoutCenter: ['50.15%', '46.38%'],
              layoutSize: '111%',
              label: {
                show: true,
                color: '#fff',
                fontSize: 18,
                backgroundColor: 'rgba(0, 0, 0, 1)',
                padding: [4, 8]
              },
              itemStyle: {
                areaColor: 'transparent',
                borderColor: 'RGBA(122, 177, 233, 1)'
              },
              emphasis: {
                label: {
                  color: 'rgba(189, 62, 13, 1)',
                  backgroundColor: 'rgba(255, 209, 51, 1)',
                  padding: [4, 8]
                },
                itemStyle: {
                  areaColor: 'rgba(9,171,255, 0.7)' // 鼠标选择地图块区域颜色
                }
              }
            },
            series: [
              {
                type: 'map',
                map: 'svgMap',
                layoutCenter: ['50.15%', '46.38%'],
                layoutSize: '111%',
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: 'transparent'
                },
                markPoint: {
                  data: [
                    {
                      name: '南昌市',
                      symbol: base64png,
                      x: 497,
                      y: 167,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '九江市',
                      symbol: base64png,
                      x: 385,
                      y: 72,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '景德镇市',
                      symbol: base64png,
                      x: 752,
                      y: 79,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '上饶市',
                      symbol: base64png,
                      x: 758,
                      y: 152,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '鹰潭市',
                      symbol: base64png,
                      x: 705,
                      y: 220,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '宜春市',
                      symbol: base64png,
                      x: 308,
                      y: 208,
                      symbolSize: [52, 79]
                    },
                    {
                      symbol: base64png,
                      x: 287,
                      y: 275,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '萍乡市',
                      symbol: base64png,
                      x: 93,
                      y: 315,
                      symbolSize: [52, 79]
                    },
                    {
                      symbol: base64png,
                      x: 583,
                      y: 315,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '吉安市',
                      symbol: base64png,
                      x: 280,
                      y: 383,
                      symbolSize: [52, 79]
                    },
                    {
                      name: '赣州市',
                      symbol: base64png,
                      x: 355,
                      y: 532,
                      symbolSize: [52, 79]
                    }
                  ]
                },
                silent: true
              }
            ]
          })
          echartObj.on('mouseover', (params) => {
            this.cityName = params.name
            this.x = params.event.offsetX
            this.y = params.event.offsetY

            if (!this.cityData[params.name]) {
              request({
                url: urls.overview,
                method: 'POST',
                data: {
                  time_range: [1677427200, 1677513600],
                  key: 'city',
                  value: params.name
                }
              })
                .then((res) => res.data.data)
                .then((result) => {
                  this.cityData[params.name] = result[0]
                  this.isTooltipShow = true
                })
            } else {
              this.isTooltipShow = true
            }
          })
          echartObj.on('mouseout', (params) => {
            this.isTooltipShow = false
          })

          echartObj.on('click', (params) => {
            this.isShowSvg2Map = true
            this.isTooltipShow = false
            this.cityName = ''

            this.$nextTick(() => {
              const name = params.name
              const provinceJSON = require(`@/assets/json/jiangxi/${name}.json`)
              const chart = echarts.getInstanceByDom(
                document.getElementById('provinceMap')
              )
              if (chart) {
                echarts.dispose(document.getElementById('provinceMap'))
              }
              const echartObj2 = echarts.init(
                document.getElementById('provinceMap')
              )
              echarts.registerMap(name, provinceJSON)

              request({
                url: '/stats/site/list',
                method: 'POST',
                data: {
                  type: 1,
                  province: '江西省',
                  city: params.name
                }
              }).then((res) => {
                const results = res.data.data
                const base64 =
                  'image://data:image/png;base64,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'
                const markPointData = results.map((result) => {
                  return {
                    name: result.name,
                    coord: [result.lng, result.lat],
                    symbol: base64,
                    symbolSize: 36
                  }
                })
                echartObj2.setOption({
                  tooltip: {
                    // padding: 0,
                    // 数据格式化
                    formatter: function (params, callback) {
                      return params.componentType === 'series'
                        ? params.name + '：' + (params.value || 0)
                        : params.name
                    }
                  },

                  geo: {
                    map: name,
                    roam: false, // 不开启缩放和平移
                    zoom: 1, // 视角缩放比例
                    itemStyle: {
                      borderWidth: 6,
                      // 外层边框
                      borderColor: '#4b9fee',
                      shadowBlur: 16, // 设置阴影大小
                      shadowColor: 'rgba(0,106,250)' // 设置阴影颜色和透明度
                    }
                  },
                  series: [
                    {
                      type: 'map',
                      map: name,
                      zoom: 1, // 视角缩放比例
                      label: {
                        normal: {
                          show: true,
                          fontSize: 18,
                          color: 'rgba(0,0,0,0.7)',
                          textStyle: {
                            color: '#fff' // 地图省份文字颜色
                          },
                          formatter: (param) => {
                            var res = '{xing|} ' + param.name
                            return res
                          },
                          rich: {
                            xing: {
                              height: 8,
                              width: 8,
                              backgroundColor: '#09abff',
                              borderRadius: 50
                            }
                          },
                          shadowBlur: 200, // 设置阴影大小
                          shadowColor: 'rgba(255, 0, 0, 0.3)' // 设置阴影颜色和透明度
                        },
                        emphasis: {
                          textStyle: {
                            color: '#fff'
                          }
                        },
                        select: {
                          textStyle: {
                            color: '#fff'
                          },
                          itemStyle: {
                            areaColor: '#025bc7'
                          }
                        }
                      },
                      roam: false,
                      itemStyle: {
                        areaColor: '#05388e',
                        borderColor: '#0e5eb9',
                        borderWidth: 1
                      },
                      emphasis: {
                        // show: false,
                        itemStyle: {
                          areaColor: '#025bc7'
                        }
                      },
                      select: {
                        label: {
                          color: '#fff'
                        },
                        itemStyle: {
                          areaColor: '#025bc7'
                        }
                      },
                      markPoint: {
                        data: markPointData
                      }
                    }
                  ]
                })
              })

              echartObj2.on('mouseover', (params) => {
                if (params.componentType === 'series') {
                  this.cityName = params.name
                  this.x = params.event.offsetX
                  this.y = params.event.offsetY
                  if (!this.cityData[params.name]) {
                    request({
                      url: urls.overview,
                      method: 'POST',
                      data: {
                        time_range: [1677427200, 1677513600],
                        key: 'city',
                        value: params.name
                      }
                    })
                      .then((res) => res.data.data)
                      .then((result) => {
                        this.cityData[params.name] = result[0]
                        this.isTooltipShow = true
                      })
                  } else {
                    this.isTooltipShow = true
                  }
                }
              })
              echartObj2.on('mouseout', (params) => {
                this.isTooltipShow = false
              })
              echartObj2.on('click', (params) => {
                if (params.componentType === 'markPoint') {
                  this.isShowModal = true
                }
              })
            })
          })
        })
    },

    initProvinceMap (name = '江西省') {
      let points = []

      if (name === '江西省') {
        points = [
          { value: [115.96066, 29.66666], itemStyle: { color: '#00EEFF' } },
          { value: [117.18457, 29.27425], itemStyle: { color: '#00EEFF' } },
          { value: [115.95046, 28.5516], itemStyle: { color: '#00EEFF' } }, // 南昌市
          { value: [117.94946, 28.46063], itemStyle: { color: '#00EEFF' } },
          { value: [117.07557, 28.26579], itemStyle: { color: '#00EEFF' } },
          { value: [116.36454, 27.95489], itemStyle: { color: '#00EEFF' } },
          { value: [114.92354, 27.82358], itemStyle: { color: '#00EEFF' } },
          { value: [114.42356, 27.82086], itemStyle: { color: '#00EEFF' } },
          { value: [113.89369, 27.66475], itemStyle: { color: '#00EEFF' } },
          { value: [115.00051, 27.11973], itemStyle: { color: '#00EEFF' } },
          { value: [114.94051, 25.83518], itemStyle: { color: '#00EEFF' } }
        ]
      }

      const gdCode = [115.95046, 28.5516]
      const codes = []

      if (name === '江西省') {
        points.forEach((item) => {
          codes.push({
            coords: [item.value, gdCode],
            lineStyle: item.lineStyle
          })
        })
      }

      const provinceJSON = require(`@/assets/json/jiangxi/${name}.json`)
      const chart = echarts.getInstanceByDom(
        document.getElementById('provinceMap')
      )
      if (chart) {
        echarts.dispose(document.getElementById('provinceMap'))
      }
      const echartObj = echarts.init(document.getElementById('provinceMap'))
      echarts.registerMap(name, provinceJSON)
      echartObj.setOption({
        tooltip: {
          show: false
        },

        geo: {
          map: name,
          roam: false, // 不开启缩放和平移
          zoom: 1, // 视角缩放比例
          itemStyle: {
            borderWidth: 6,
            // 外层边框
            borderColor: '#4b9fee',
            shadowBlur: 16, // 设置阴影大小
            shadowColor: 'rgba(0,106,250)' // 设置阴影颜色和透明度
          }
        },
        series: [
          {
            type: 'map',
            map: name,
            zoom: 1, // 视角缩放比例
            label: {
              normal: {
                show: true,
                fontSize: 18,
                color: 'rgba(0,0,0,0.7)',
                textStyle: {
                  color: '#fff' // 地图省份文字颜色
                },
                formatter: (param) => {
                  var res = '{xing|} ' + param.name
                  return res
                },
                rich: {
                  xing: {
                    height: 8,
                    width: 8,
                    backgroundColor: '#09abff',
                    borderRadius: 50
                  }
                },
                shadowBlur: 200, // 设置阴影大小
                shadowColor: 'rgba(255, 0, 0, 0.3)' // 设置阴影颜色和透明度
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              },
              select: {
                textStyle: {
                  color: '#fff'
                },
                itemStyle: {
                  areaColor: '#025bc7'
                }
              }
            },
            roam: false,
            itemStyle: {
              areaColor: '#05388e',
              borderColor: '#0e5eb9',
              borderWidth: 1
            },
            emphasis: {
              // show: false,
              itemStyle: {
                areaColor: '#025bc7'
              }
            },
            select: {
              label: {
                color: '#fff'
              },
              itemStyle: {
                areaColor: '#025bc7'
              }
            }
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            showEffectOn: 'render',
            zlevel: 1,
            rippleEffect: {
              number: 3, // 波纹的数量。
              period: 5, // 动画的周期，秒数。
              scale: 17, // 动画中波纹的最大缩放比例。
              brushType: 'fill' // 波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            symbolSize: 2,
            data: points
          },
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.4, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 6 // 图标大小
            },
            lineStyle: {
              normal: {
                color: '#1DE9B6',
                width: 1, // 线条宽度
                opacity: 0.1, // 尾迹线条透明度
                curveness: 0.3 // 尾迹线条曲直度
              }
            },
            data: codes
          }
        ]
      })
      echartObj.on('click', (params) => {
        if (name === '江西省') {
          this.initProvinceMap(params.name)
        }
      })
    }
  }
}
</script>

<style lang="less">
.el-tooltip__popper {
  white-space: nowrap;
  font-size: 25px;
  color: rgba(255, 255, 255, 1);
  padding: 14px 20px;
}

.el-tooltip__popper.is-dark {
  background: rgba(0, 0, 0, 1) !important;
}

.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
  border-top-color: rgba(0, 0, 0, 1);
}

.el-tooltip__popper[x-placement^='top'] .popper__arrow {
  border-top-color: rgba(0, 0, 0, 1);
}

.el-picker-panel {
  background: rgba(3, 22, 57, 0.9);
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  border: 1px solid rgba(21, 61, 130, 1);
}

.el-date-range-picker__content.is-left {
  border-right: 1px solid rgba(21, 61, 130, 1);
}

.el-date-table th {
  border-bottom: solid 1px rgba(21, 61, 130, 1);
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: rgba(17, 51, 109, 0.5);
}

.el-popper[x-placement^='top'] .popper__arrow::after {
  border-top-color: rgba(21, 61, 130, 1);
}

.el-picker-panel__icon-btn {
  font-size: 16px;
  color: #fff;
}

.el-date-range-picker__header div {
  font-size: 20px;
}

.el-date-table {
  font-size: 16px;
}

.el-input__inner {
  background-color: rgba(21, 61, 130, 0.5) !important;
  border: 1px solid rgba(21, 61, 130, 1);

  &:hover {
    border: 1px solid rgba(21, 61, 130, 1);
  }
}

.el-date-editor .el-range-input {
  font-size: 16px;
  color: #fff;
  background-color: transparent;
}

.el-date-editor .el-range-separator {
  color: #fff;
}
</style>

<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/bj.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  padding: 0 50px;

  .bac_imgs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .top {
      position: absolute;
      top: 0;
      width: 100%;
    }

    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .left {
      position: absolute;
      left: 0;
      height: 847px;
    }

    .right {
      position: absolute;
      right: 0;
      height: 847px;
    }

    .top_title {
      position: absolute;
      top: 4px;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 55px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #eff8fc;
      text-shadow: 0px 4px 1px rgba(19, 80, 143, 0.66);
    }
  }

  .part {
    position: relative;
    width: 2000px;
    height: 100%;
    padding: 83px 0 75px;
  }

  .map {
    position: relative;
    flex: 1 0;
    height: calc(100% - 235px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 135px;

    .left {
      position: absolute;
      left: 0;
      height: 790px;
    }

    .right {
      position: absolute;
      right: 0;
      height: 790px;
    }

    .bars {
      position: absolute;
      top: 0;
      width: 100%;
      height: 102px;
      display: grid;
      grid-template-columns: 300px 1fr 1fr 1fr 1fr 1fr;
      grid-column-gap: 10px;
      padding: 0 150px;

      .item {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        border-top: 1px solid #218ff7;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(
          to bottom,
          rgba(33, 143, 247, 0.2),
          rgba(33, 143, 247, 0)
        );

        span {
          &:first-child {
            font-size: 42px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: #0084ff;
          }

          &:nth-child(2) {
            font-size: 22px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
          }
        }

        &:nth-child(2) {
          span {
            &:first-child {
              color: rgba(25, 214, 255, 1);
            }
          }
        }

        &:nth-child(3) {
          span {
            &:first-child {
              color: rgba(55, 255, 201, 1);
            }
          }
        }

        &:nth-child(4) {
          span {
            &:first-child {
              color: rgba(195, 177, 255, 1);
            }
          }
        }

        &:nth-child(5) {
          span {
            &:first-child {
              color: rgba(255, 231, 119, 1);
            }
          }
        }

        &:nth-child(6) {
          span {
            &:first-child {
              color: rgba(25, 214, 255, 1);
            }
          }
        }

        &:nth-child(7) {
          span {
            &:first-child {
              color: rgba(55, 255, 201, 1);
            }
          }
        }
      }
    }

    .svg_map {
      position: relative;
      width: 1000px;
      height: 856px;

      .bac {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .provinceMap {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 3%;
      left: 0;
    }

    .footer {
      position: absolute;
      width: 100%;
      height: 140px;
      bottom: -80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 420px;

      .item {
        position: relative;
        width: 140px;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .bac {
          position: absolute;
          bottom: 0;
          width: 140px;
          height: 140px;
          // animation: blink 5s infinite;
        }

        // @keyframes blink {
        //   0% {
        //     opacity: 1;
        //   }
        //   50% {
        //     opacity: 0.7;
        //   }
        //   100% {
        //     opacity: 1;
        //   }
        // }

        .icon {
          position: absolute;
          // top: 0;
          transition: transform 1s;

          &:hover {
            transform: translateY(-20px);
          }
        }
      }
    }
  }

  .device_list {
    width: 1495px;
    height: 983px;
    background: url('~@/assets/images/video-bj.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    padding: 36px;
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
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 25px;

      .item {
        position: relative;
        width: 100%;
        height: 253px;

        .bac {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .bar {
          position: absolute;
          width: 100%;
          height: 45px;
          display: flex;
          align-items: center;
          padding: 0 13px;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);

          .icon {
            height: 48px;
            cursor: pointer;
          }

          span {
            flex: 1 0;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            margin-left: 5px;
          }

          .full {
            height: 38px;
            cursor: pointer;
          }
        }
      }

      .fullscreen {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        padding: 16px 0;

        .bac {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .tooltip {
    position: absolute;
    width: 706px;
    height: 314px;
    background: url('~@/assets/images/window-1.png') no-repeat;
    background-size: 100% 100%;
    padding: 22px 16px 0 16px;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      height: 50px;
      font-size: 30px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      padding-left: 20px;
    }

    .content {
      margin-top: 10px;
      width: 100%;
      flex: 1 0;
      padding-bottom: 15px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column-gap: 8px;
      grid-row-gap: 10px;

      .item {
        width: 100%;
        background-color: rgba(0, 181, 255, 0.1);
        display: flex;
        align-items: center;
        padding: 0 15px;

        .label {
          font-family: MicrosoftYaHei;
          font-size: 20px;
          color: rgba(255, 255, 255, 1);
        }

        .value {
          flex: 1 0;
          text-align: right;
          font-family: YouSheBiaoTiHei;
          color: rgba(0, 176, 236, 1);
          font-size: 20px;
        }

        .unit {
          font-family: MicrosoftYaHei;
          font-size: 20px;
          color: rgba(255, 255, 255, 1);
          margin-left: 5px;
        }
      }
    }
  }

  .tooltip2 {
    position: absolute;
    bottom: 100px;
    right: 300px;
    width: 142px;
    height: 150px;
    background: url('~@/assets/images/icon-bj-8.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .item {
      margin-top: 16px;
      display: flex;
      align-items: center;

      &:first-child {
        margin-top: 0;
      }

      span {
        width: 12px;
        height: 12px;
      }

      div {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        margin-left: 10px;
      }

      &:nth-child(1) {
        span {
          background-color: #19d6ff;
        }
      }

      &:nth-child(2) {
        span {
          background-color: #ffbd77;
        }
      }

      &:nth-child(3) {
        span {
          background-color: #89f4b9;
        }
      }
    }
  }

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
    }
  }
}
</style>
