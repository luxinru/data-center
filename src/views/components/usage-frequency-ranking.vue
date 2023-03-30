<template>
  <div class="usage_frequency_ranking">
    <Box title="使用次数排行榜">
      <template #select>
        <XSelect :value="value" :options="options" />
      </template>

      <XTable :columns="columns" :tableData="tableData" autoScrollId="tbody4"/>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'
import XSelect from '@/components/x-select.vue'

export default {
  name: 'UsageFrequencyRanking',

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
          label: '自提柜'
        },
        {
          value: '2',
          label: '零售柜'
        }
      ],
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
