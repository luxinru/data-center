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
      <DeviceOverview />
    </div>
    <div class="item">
      <DeviceList />
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

export default {
  name: 'LeftPart',

  components: {
    UserAnalysis,
    CommodityPriceTrend,
    DeviceList,
    DeviceOverview,
    ChannelSource,
    UsageFrequencyRanking
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
