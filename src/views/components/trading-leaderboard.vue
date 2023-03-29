<template>
  <div class="trading_leaderboard">
    <Box title="交易排行榜" >
      <template #select>
        <XSelect :value="value" :options="options" />
      </template>

      <XTable />
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'
import XSelect from '@/components/x-select.vue'

export default {
  name: 'TradingLeaderboard',

  components: {
    Box,
    XTable,
    XSelect
  },

  data () {
    return {
      value: '1',
      options: [
        {
          value: '1',
          label: '商品金额'
        },
        {
          value: '2',
          label: '商品销量'
        },
        {
          value: '3',
          label: '商品价格'
        },
        {
          value: '4',
          label: '商品评分'
        }
      ]
    }
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
