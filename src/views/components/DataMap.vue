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
          <span class="label">交易额(年)</span>
          <span class="value">{{ currentHoverData.sum_price }}</span>
          <span class="unit">元</span>
        </div>
        <div class="item">
          <span class="label">订单数(年)</span>
          <span class="value">{{ currentHoverData.order_count }}</span>
          <span class="unit">笔</span>
        </div>
        <div class="item">
          <span class="label">商品数</span>
          <span class="value">{{ currentHoverData.prod_count }}</span>
          <span class="unit">件</span>
        </div>
        <div class="item">
          <span class="label">商户数</span>
          <span class="value">{{ currentHoverData.merchant_count }}</span>
          <span class="unit">户</span>
        </div>
        <div class="item">
          <span class="label">门店数</span>
          <span class="value">{{ currentHoverData.store_count }}</span>
          <span class="unit">个</span>
        </div>
        <div class="item">
          <span class="label">用户数</span>
          <span class="value">{{ currentHoverData.user_count }}</span>
          <span class="unit">个</span>
        </div>
        <div class="item">
          <span class="label">自提点数</span>
          <span class="value">{{ currentHoverData.post_count }}</span>
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

    <XModal v-show="isShowModal">
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
              <img src="@/assets/images/pic-7.png" alt="" />

              <div class="labels">
                <div class="item">
                  <span>类型：</span>
                  <p>{{shopTypes[currentShopData.type]}}</p>
                </div>
                <div class="item">
                  <span>名称：</span>
                  <p>{{currentShopData.name}}</p>
                </div>
                <div class="item">
                  <span>商户名称：</span>
                  <p>{{currentShopData.merchant_name}}</p>
                </div>
                <div class="item">
                  <span>联系姓名：</span>
                  <p>{{currentShopData.linkName}}</p>
                </div>
                <div class="item">
                  <span>联系电话：</span>
                  <p>{{currentShopData.phone}}</p>
                </div>
                <div class="item">
                  <span>详细地址：</span>
                  <p>{{currentShopData.addr}}</p>
                </div>
                <div class="item">
                  <span>营业时间：</span>
                  <p>{{currentShopData.time}}</p>
                </div>
                <div class="item">
                  <span>评分：</span>
                  <p>{{currentShopData.score}}</p>
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
import * as echarts from 'echarts'
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

    this.getHoverData('province', '江西省').then(result => {
      this.cityData = result
    })
  },
  methods: {
    async getHoverData (key, value) {
      return await request({
        url: urls.overview,
        method: 'POST',
        data: {
          time_range: [1677427200, 1677513600],
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
      }).then(res => res.data.data)
      const promise2 = request({
        url: urls.site_list,
        method: 'POST',
        data: {
          type: 2, // 门店
          province: '江西省',
          city
        }
      }).then(res => res.data.data)
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
        this.getHoverData('province', '江西省').then(result => {
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
    setChartOption1 (echartObj) {
      const base64png =
        'image://data:image/png;base64,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'

      const markPointData = [
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
              data: markPointData
            },
            silent: true
          }
        ]
      })
    },
    onChartObj1Mouseover (params) {
      this.cityName = params.name
      this.x = params.event.offsetX
      this.y = params.event.offsetY

      this.isTooltipShow = true
      const item = this.cityData.find(it => it.city === params.name)
      this.currentHoverData = item || {
        sum_price: '',
        merchant_count: '',
        order_count: '',
        post_count: '',
        prod_count: '',
        store_count: '',
        user_count: ''
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
        const echartObj2 = echarts.init(
          document.getElementById('provinceMap')
        )
        echarts.registerMap(name, provinceJSON)
        this.cityData = await this.getHoverData('city', name)

        const shops = await this.getShops(params.name)
        this.setChartOption2(echartObj2, name, shops)

        echartObj2.on('mouseover', this.onChartObj2Mouseover)
        echartObj2.on('mouseout', (params) => {
          this.isTooltipShow = false
        })
        echartObj2.on('click', this.onChartObj2Click)
      })
    },
    setChartOption2 (echartObj, name, shops) {
      const mdBase64 =
        'image://data:image/png;base64,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'
      const ztdBase64 = 'image://data:image/png;base64,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'
      const markPointData1 = shops[0].map((shop) => {
        return {
          name: shop.name,
          coord: [shop.lng, shop.lat],
          symbol: ztdBase64,
          symbolSize: 36,
          id: shop.id,
          type: shop.type
        }
      })
      const markPointData2 = shops[1].map((shop) => {
        return {
          name: shop.name,
          coord: [shop.lng, shop.lat],
          symbol: mdBase64,
          symbolSize: 36,
          id: shop.id,
          type: shop.type
        }
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
              data: [...markPointData1, ...markPointData2]
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
        const item = this.cityData.find(it => it.area === params.name)
        this.currentHoverData = item || {
          sum_price: '',
          merchant_count: '',
          order_count: '',
          post_count: '',
          prod_count: '',
          store_count: '',
          user_count: ''
        }
      }
    },
    onChartObj2Click (params) {
      if (params.componentType === 'markPoint') {
        console.log(params)
        this.isShowModal = true
        request({
          url: urls.site_detail,
          method: 'POST',
          data: {
            id: 1,
            time_range: this.$store.state.time_range
          }
        }).then(res => res.data.data)
          .then(result => {
            this.currentShopData = {
              id: params.data.id,
              name: params.data.name,
              type: params.data.type,
              ...result
            }
          })
      }
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
</style>
