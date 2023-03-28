<template>
  <div class="trading_leaderboard">
    <Box title="交易排行榜" >
      <XTable />
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'

export default {
  name: 'TradingLeaderboard',

  components: {
    Box,
    XTable
  }
}
</script>

<style lang="less" scoped>
.trading_leaderboard {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
