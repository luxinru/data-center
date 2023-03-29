<template>
  <div class="merchants_leaderboard">
    <Box title="商户排行榜">
      <template #select>
        <XSelect :value="value" :options="options" />
      </template>

      <XTable :columns="columns" :tableData="tableData" />
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'
import XSelect from '@/components/x-select.vue'

export default {
  name: 'MerchantsLeaderboard',

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
          label: '门店金额'
        },
        {
          value: '3',
          label: '自提点金额'
        }
      ],
      columns: [
        {
          name: '名称',
          value: 'b'
        },
        {
          name: '地区',
          value: 'c'
        },
        {
          name: '销量',
          value: 'd',
          isNumber: true
        },
        {
          name: '金额',
          value: 'e',
          isNumber: true
        },
        {
          name: '评分',
          value: 'f'
        }
      ],
      tableData: [
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        },
        {
          b: '南昌自营',
          c: '江西省',
          d: '2',
          e: '789.63',
          f: '95'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.merchants_leaderboard {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
