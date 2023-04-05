<template>
  <div>
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
          <span class="label">交易额</span>
          <span class="value">{{ currentHoverData.sum_price || 0 }}</span>
          <span class="unit">元</span>
        </div>
        <div class="item">
          <span class="label">订单数</span>
          <span class="value">{{ currentHoverData.order_count || 0 }}</span>
          <span class="unit">笔</span>
        </div>
        <div class="item">
          <span class="label">商品数</span>
          <span class="value">{{ currentHoverData.prod_count || 0 }}</span>
          <span class="unit">件</span>
        </div>
        <div class="item">
          <span class="label">商户数</span>
          <span class="value">{{ currentHoverData.merchant_count || 0 }}</span>
          <span class="unit">户</span>
        </div>
        <div class="item">
          <span class="label">门店数</span>
          <span class="value">{{ currentHoverData.store_count || 0 }}</span>
          <span class="unit">个</span>
        </div>
        <div class="item">
          <span class="label">用户数</span>
          <span class="value">{{ currentHoverData.user_count || 0 }}</span>
          <span class="unit">个</span>
        </div>
        <div class="item">
          <span class="label">自提点数</span>
          <span class="value">{{ currentHoverData.post_count || 0 }}</span>
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

    <div class="tooltip2" v-if="type === 1 && isShowSvg2Map">
      <div class="item1">
        <span></span>
        <div>自提点</div>
      </div>
      <div class="item1">
        <span></span>
        <div>门&emsp;店</div>
      </div>
    </div>

    <XModal v-show="isShowModal" @close="isShowModal = !isShowModal">
      <div class="modal">
        <div class="title">
          <span>详情</span>
          <img
            src="@/assets/images/close.png"
            alt=""
            @click="isShowModal = !isShowModal"
          />
        </div>

        <div class="content">
          <div class="info">
            <div class="details">
              <img
                :src="currentShopData.logo"
                width="365"
                height="338"
                style="color: white"
                alt="商户图片"
              />

              <div class="labels">
                <div class="item">
                  <span>类型：</span>
                  <p>{{ currentShopData.type === 2 ? '门店' : '提货点' }}</p>
                </div>
                <div class="item">
                  <span>名称：</span>
                  <p>{{ currentShopData.name }}</p>
                </div>
                <div class="item">
                  <span>商户名称：</span>
                  <p>{{ currentShopData.merchant_name }}</p>
                </div>
                <div class="item">
                  <span>联系姓名：</span>
                  <p>{{ currentShopData.real_name }}</p>
                </div>
                <div class="item">
                  <span>联系电话：</span>
                  <p>{{ currentShopData.mobile }}</p>
                </div>
                <div class="item">
                  <span>详细地址：</span>
                  <p>{{ currentShopData.address }}</p>
                </div>
                <div class="item">
                  <span>营业时间：</span>
                  <p>{{ currentShopData.sale_time }}</p>
                </div>
                <!-- <div class="item">
                  <span>订单数量：</span>
                  <p>{{ currentShopData.order_count }}</p>
                </div> -->
              </div>
            </div>

            <div id="chart11" class="chart"></div>
          </div>

          <div class="chat" id="chat3">
            <div class="title">用户评价</div>

            <div
              class="chat_item"
              v-for="(item, index) in currentShopData.comments"
              :key="index"
            >
              <div class="user">
                <img :src="item.avatar || defaultHeadSrc" alt="" />
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
import * as echarts from 'echarts'
import 'echarts-gl'
import svgMap from '@/assets/images/map.svg'
import request from '@/api/request'
import urls from '@/api/urls'
import XModal from '@/components/x-model.vue'
import Axios from 'axios'

export default {
  name: 'DataMap',
  props: ['type'],
  components: {
    XModal
  },
  data () {
    return {
      shopTypes: ['', '自提点', '门店'],
      x: 0,
      y: 0,
      isShowModal: false,
      isShowSvg2Map: false,
      daterange: '',
      isTooltipShow: false,
      cityName: '',
      cityData: [],
      currentHoverData: {},
      currentShopData: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initSvgMap()
    })
  },
  methods: {
    async getHoverData (key, value) {
      const date = new Date()
      return await request({
        url: urls.overview,
        method: 'POST',
        data: {
          time_range: [Date.parse(`${date.getFullYear()}/1/1 00:00:00`) / 1000, Date.now() / 1000],
          key,
          value
        }
      }).then((res) => res.data.data)
    },
    async getShops (city) {
      const promise1 = request({
        url: urls.site_list,
        method: 'POST',
        data: {
          type: 1, // 自提点
          province: '江西省',
          city
        }
      }).then((res) => res.data.data)
      const promise2 = request({
        url: urls.site_list,
        method: 'POST',
        data: {
          type: 2, // 门店
          province: '江西省',
          city
        }
      }).then((res) => res.data.data)
      return await Axios.all([promise1, promise2])
    },
    showDataMap1 () {
      this.isShowSvg2Map = false
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
        this.getHoverData('province', '江西省').then((result) => {
          this.cityData = result
        })
      })
    },
    showDataMap2 () {
      this.isShowSvg2Map = false
      this.$nextTick(() => {
        this.initProvinceMap()
      })
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
          this.setChartOption1(echartObj)
          echartObj.on('mouseover', this.onChartObj1Mouseover)
          echartObj.on('mouseout', (params) => {
            this.isTooltipShow = false
          })

          echartObj.on('click', this.onChartObj1Click)
        })
    },
    async setChartOption1 (echartObj) {
      const option = {
        tooltip: {
          show: false
        },

        geo: {
          map: 'svgMap',
          roam: false, // 不开启缩放和平移
          layoutCenter: ['50.15%', '46.38%'],
          layoutSize: '111%',
          label: {
            normal: {
              show: true,
              color: '#fff',
              padding: [4, 8],
              formatter: (param) => {
                return '{bg| ' + param.name + '}'
              },
              rich: {
                bg: {
                  height: 44,
                  backgroundColor: {
                    image: require('@/assets/images/font-2.png')
                  },
                  align: 'center',
                  fontSize: 20,
                  padding: [0, 0, 0, 16]
                }
              }
            },
            emphasis: {
              show: true,
              formatter: (param) => {
                return '{bg1| ' + param.name + '}'
              },
              rich: {
                bg1: {
                  height: 100,
                  backgroundColor: {
                    image: require('@/assets/images/font-1.png')
                  },
                  align: 'center',
                  fontSize: 20,
                  color: 'rgba(189, 62, 13, 1)',
                  padding: [-18, 0, 0, 0]
                }
              }
            }
          },
          itemStyle: {
            areaColor: 'transparent',
            borderColor: 'RGBA(122, 177, 233, 1)'
          },
          emphasis: {
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
              data: []
            },
            silent: true
          }
        ]
      }

      echartObj.setOption(option)

      this.cityData = await this.getHoverData('province', '江西省')

      const arrSumPrice = this.cityData.map((item) => item.sum_price ? Number(item.sum_price) : 0)
      const arrOrderCount = this.cityData.map((item) => item.order_count ? Number(item.order_count) : 0)
      const arrMerchantCount = this.cityData.map((item) => item.merchant_count ? Number(item.merchant_count) : 0)

      const maxSumPrice = Math.max(...arrSumPrice)
      const maxOrderCount = Math.max(...arrOrderCount)
      const maxMerchantCount = Math.max(...arrMerchantCount)

      const markPointData = []
      const mapObj = {
        南昌市: [497, 169],
        九江市: [385, 74],
        景德镇市: [752, 81],
        上饶市: [758, 154],
        鹰潭市: [705, 222],
        宜春市: [308, 210],
        萍乡市: [93, 317],
        吉安市: [280, 385],
        赣州市: [355, 524]
      }
      this.cityData.forEach((item) => {
        const div0 = document.createElement('div')
        const maxHeight = 300
        const h1 = item.merchant_count ? maxHeight * item.merchant_count / maxMerchantCount : 0
        const h2 = item.sum_price ? maxHeight * item.sum_price / maxSumPrice : 0
        const h3 = item.order_count ? maxHeight * item.order_count / maxOrderCount : 0
        div0.innerHTML = '<div style="display: flex; align-items: flex-end;">' +
          '<div style="width: 60px; height: ' + h1 + 'px; background: linear-gradient(to bottom, rgb(137, 244, 185), rgb(33, 143, 247)); margin-right: 15px"></div>' +
          '<div style="width: 60px; height: ' + h2 + 'px; background: linear-gradient(to bottom, rgb(25, 214, 255), rgb(33, 143, 247)); margin-right: 15px"></div>' +
          '<div style="width: 60px; height: ' + h3 + 'px; background: linear-gradient(to bottom, rgb(255, 189, 119), rgb(33, 143, 247))"></div>' +
          '</div>'
        const svgStr = "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='320'>" +
          "<foreignObject width='100%' height='100%'>" +
          "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>" +
          div0.innerHTML +
          '</div>' +
          '</foreignObject>' +
          '</svg>'

        const symbol = `image://data:image/svg+xml;charset=utf-8,${encodeURI(svgStr)}`
        markPointData.push({
          name: item.city,
          symbol,
          x: mapObj[item.city][0],
          y: mapObj[item.city][1],
          symbolSize: [52, 79]
        })
      })

      option.series[0].markPoint.data = markPointData

      echartObj.setOption(option)
    },
    onChartObj1Mouseover (params) {
      this.cityName = params.name
      this.x = params.event.offsetX
      this.y = params.event.offsetY

      this.isTooltipShow = true
      const item = this.cityData.find((it) => it.city === params.name)
      this.currentHoverData = item || {
        sum_price: 0,
        merchant_count: 0,
        order_count: 0,
        post_count: 0,
        prod_count: 0,
        store_count: 0,
        user_count: 0
      }
    },
    onChartObj1Click (params) {
      this.isShowSvg2Map = true
      this.isTooltipShow = false
      this.cityName = ''

      this.$nextTick(async () => {
        const name = params.name
        const provinceJSON = require(`@/assets/json/jiangxi/${name}.json`)
        const chart = echarts.getInstanceByDom(
          document.getElementById('provinceMap')
        )
        if (chart) {
          echarts.dispose(document.getElementById('provinceMap'))
        }
        const echartObj2 = echarts.init(document.getElementById('provinceMap'))
        echarts.registerMap(name, provinceJSON)

        this.setChartOption2(echartObj2, name, [])

        echartObj2.on('mouseover', this.onChartObj2Mouseover)
        echartObj2.on('mouseout', (params) => {
          this.isTooltipShow = false
        })
        echartObj2.on('click', this.onChartObj2Click)

        // 获取自提点、门店数据
        const shops = await this.getShops(params.name)
        this.setChartOption2(echartObj2, name, shops)

        this.cityData = await this.getHoverData('city', name)
      })
    },
    setChartOption2 (echartObj, name, shops) {
      const mdBase64 =
        'image://data:image/png;base64,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'
      const ztdBase64 =
        'image://data:image/png;base64,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'
      const markPointData = []
      shops.forEach((shopArr) => {
        const data = shopArr.map((shop) => ({
          name: shop.name,
          coord: [shop.lng, shop.lat],
          symbol: shop.type === 1 ? ztdBase64 : mdBase64,
          symbolSize: 24,
          id: shop.id,
          type: shop.type
        }))
        markPointData.push(...data)
      })
      echartObj.setOption({
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
                  return '{xing|} ' + param.name
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
    },
    onChartObj2Mouseover (params) {
      if (params.componentType === 'series') {
        this.cityName = params.name
        this.x = params.event.offsetX
        this.y = params.event.offsetY
        this.isTooltipShow = true
        const item = this.cityData.find((it) => it.area === params.name)
        this.currentHoverData = item || {
          sum_price: 0,
          merchant_count: 0,
          order_count: 0,
          post_count: 0,
          prod_count: 0,
          store_count: 0,
          user_count: 0
        }
      }
    },
    onChartObj2Click (params) {
      if (params.componentType === 'markPoint') {
        this.isShowModal = true
        request({
          url: urls.site_detail,
          method: 'POST',
          data: {
            id: params.data.id,
            time_range: this.$store.state.time_range
          }
        })
          .then((res) => res.data.data)
          .then((result) => {
            this.currentShopData = {
              type: params.data.type,
              ...result
            }

            this.init(this.currentShopData.trend || [])
            this.autoScroll()
          })
      }
    },

    autoScroll () {
      const scrollContainer = document.getElementById('chat3')

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
      echarts.dispose(document.getElementById('chart11'))
      const myChart = echarts.init(document.getElementById('chart11'))

      const dates = []
      const counts = []
      const prices = []
      data.forEach((item) => {
        dates.push(item.date)
        counts.push(Number(item.order_count))
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
            name: '近期订单趋势',
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
            data: counts
          },
          {
            name: '近期交易额趋势',
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
            data: prices
          }
        ]
      })
    },

    initProvinceMap (name = '江西省') {
      let points = []

      if (name === '江西省') {
        points = [
          { value: [115.96066, 29.66666] }, // 九江市
          { value: [117.18457, 29.27425] }, // 景德镇市
          { value: [115.95046, 28.5516] }, // 南昌市
          { value: [117.94946, 28.46063] }, // 上饶市
          { value: [117.07557, 28.26579] }, // 鹰潭市
          { value: [116.36454, 27.95489] }, // 抚州市
          { value: [114.92354, 27.82358] }, // 新余市
          { value: [114.42356, 27.82086] }, // 宜春市
          { value: [113.89369, 27.66475] }, // 萍乡市
          { value: [115.00051, 27.11973] }, // 吉安市
          { value: [114.94051, 25.83518] } // 赣州市
        ]
      }

      const codes = []

      switch (name) {
        case '江西省':
          codes.push(
            /**
             * 九江
             */
            {
              coords: [
                [115.96066, 29.66666],
                [115.95046, 28.5516]
              ]
            },
            {
              coords: [
                [115.96066, 29.66666],
                [114.42356, 27.82086]
              ]
            },
            {
              coords: [
                [115.96066, 29.66666],
                [117.94946, 28.46063]
              ]
            },
            {
              coords: [
                [115.96066, 29.66666],
                [117.94946, 28.46063]
              ]
            },
            /**
             * 景德镇
             */
            {
              coords: [
                [117.18457, 29.27425],
                [117.94946, 28.46063]
              ]
            },
            /**
             * 上饶
             */
            {
              coords: [
                [117.94946, 28.46063],
                [115.96066, 29.66666]
              ]
            },
            {
              coords: [
                [117.94946, 28.46063],
                [117.18457, 29.27425]
              ]
            },
            {
              coords: [
                [117.94946, 28.46063],
                [115.95046, 28.5516]
              ]
            },
            {
              coords: [
                [117.94946, 28.46063],
                [117.07557, 28.26579]
              ]
            },
            {
              coords: [
                [117.94946, 28.46063],
                [116.36454, 27.95489]
              ]
            },
            /**
             * 南昌
             */
            {
              coords: [
                [115.95046, 28.5516],
                [115.96066, 29.66666]
              ]
            },
            {
              coords: [
                [115.95046, 28.5516],
                [114.42356, 27.82086]
              ]
            },
            {
              coords: [
                [115.95046, 28.5516],
                [117.94946, 28.46063]
              ]
            },
            {
              coords: [
                [115.95046, 28.5516],
                [116.36454, 27.95489]
              ]
            },
            /**
             * 鹰潭
             */
            {
              coords: [
                [117.07557, 28.26579],
                [116.36454, 27.95489]
              ]
            },
            {
              coords: [
                [117.07557, 28.26579],
                [117.94946, 28.46063]
              ]
            }
            /**
             * 抚州
             */
            // {
            //   coords: [
            //     [117.07557, 28.26579],
            //     [117.94946, 28.46063]
            //   ]
            // }
          )
          break
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

<style lang="less" scoped>
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

  .item1 {
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
        background-color: #89f4b9;
      }
    }

    &:nth-child(2) {
      span {
        background-color: #19d6ff;
      }
    }
  }
}

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
</style>
