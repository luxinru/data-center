<template>
  <div class="transaction_categorization">
    <Box title="交易分类">
      <template #select>
        <XSelect :value="value" :options="options"/>
      </template>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XSelect from '@/components/x-select.vue'

export default {
  name: 'TransactionCategorization',

  components: {
    Box,
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
          label: '商品数量'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.transaction_categorization {
  width: 100%;
  height: 100%;
}
</style>
