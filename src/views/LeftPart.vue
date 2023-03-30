<template>
  <div class="LeftPart">
    <div class="item">
      <TransactionCategorization />
    </div>
    <div class="item">
      <TradingLeaderboard />
    </div>
    <div class="item">
      <TransactionTrend />
    </div>
    <div class="item">
      <MerchantCategorization />
    </div>
    <div class="item">
      <MerchantsLeaderboard />
    </div>
    <div class="item">
      <MerchantTrend />
    </div>
  </div>
</template>

<script>
import TradingLeaderboard from './components/trading-leaderboard.vue'
import TransactionCategorization from './components/transaction-categorization.vue'
import TransactionTrend from './components/transaction-trend.vue'
import MerchantCategorization from './components/merchant-categorization.vue'
import MerchantsLeaderboard from './components/merchants-leaderboard.vue'
import MerchantTrend from './components/merchant-trend.vue'

export default {
  name: 'LeftPart',

  components: {
    TradingLeaderboard,
    TransactionCategorization,
    TransactionTrend,
    MerchantCategorization,
    MerchantsLeaderboard,
    MerchantTrend
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
