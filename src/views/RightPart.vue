<template>
  <div class="LeftPart">
    <div class="item">
      <UserAnalysis />
    </div>
    <div class="item">
      <CommodityPriceTrend />
    </div>
    <div class="item">
      <ChannelSource />
    </div>
    <div class="item">
      <DeviceOverview :overviewData="overviewData" />
    </div>
    <div class="item">
      <DeviceList :cabinetList="cabinetList" />
    </div>
    <div class="item">
      <UsageFrequencyRanking />
    </div>
  </div>
</template>

<script>
import UserAnalysis from './components/user-analysis.vue'
import CommodityPriceTrend from './components/commodity-price-trend.vue'
import ChannelSource from './components/channel-source.vue'
import DeviceOverview from './components/device-overview.vue'
import DeviceList from './components/device-list.vue'
import UsageFrequencyRanking from './components/usage-frequency-ranking.vue'
import request from '@/api/request'
import urls from '@/api/urls'

export default {
  name: 'RightPart',

  components: {
    UserAnalysis,
    CommodityPriceTrend,
    DeviceList,
    DeviceOverview,
    ChannelSource,
    UsageFrequencyRanking
  },

  data () {
    return {
      cabinetList: []
    }
  },

  mounted () {
    this.getCabinetList().then(res => {
      this.cabinetList = res.map(item => ({
        type: '自提柜',
        temp: '-',
        ...item
      }))
    })
  },

  computed: {
    overviewData () {
      return {
        cabinet: {
          counts: this.cabinetList.length,
          use_times: 0,
          counts1: 0,
          counts2: 0,
          counts3: 0
        },
        shop: {
          counts: 0,
          use_times: 0,
          counts1: 0,
          counts2: 0,
          counts3: 0
        }
      }
    }
  },

  methods: {
    async getCabinetList () {
      return await request({
        url: urls.cabinet_list,
        params: {
          page: 1,
          limit: 99999
        }
      }).then(res => res.data.data)
    }
  }
}
</script>

<style lang="less" scoped>
.LeftPart {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 40px;
  .item {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
