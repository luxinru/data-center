<template>
  <div class="device_list">
    <Box title="设备列表">
      <template #select>
        <XSelect :value="value" :options="options" />
      </template>

      <XTable :isRank="false" :columns="columns" :tableData="tableData" />
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XTable from '@/components/x-table'
import XSelect from '@/components/x-select.vue'

export default {
  name: 'DeviceList',

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
          label: '故障检修'
        },
        {
          value: '2',
          label: '正常运行'
        },
        {
          value: '3',
          label: '关闭暂停'
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
          name: '温度',
          value: 'e'
        },
        {
          name: '网络状态',
          value: 'f',
          color: 'rgba(0, 186, 255, 1)'
        },
        {
          name: '设备状态',
          value: 'g',
          color: 'rgba(0, 186, 255, 1)'
        }
      ],

      tableData: [
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        },
        {
          b: '0457',
          c: '主控柜',
          d: '江西省南昌市南昌街道',
          e: '25℃',
          f: '正常运行',
          g: '正常运行'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.device_list {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
