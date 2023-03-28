<template>
  <div class="usage_frequency_ranking">
    <Box title="使用次数排行榜">
      <XTable :columns="columns" :tableData="tableData" />
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'

export default {
  name: 'UsageFrequencyRanking',

  components: {
    Box,
    XTable
  },

  data () {
    return {
      columns: [
        {
          name: '编号',
          value: 'b'
        },
        {
          name: '类型',
          value: 'c'
        },
        {
          name: '地址',
          value: 'd'
        },
        {
          name: '使用次数',
          value: 'e',
          color: 'rgba(0, 186, 255, 1)'
        }
      ],

      tableData: [
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        },
        {
          b: '0457',
          c: '自提柜',
          d: '江西省南昌市南昌街道',
          e: '56'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.usage_frequency_ranking {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
