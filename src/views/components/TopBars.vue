<template>
  <div
    class="bars"
    :style="{ 'grid-template-columns': barType === 1 ? '' : '1fr 1fr 1fr 1fr' }"
  >
    <template v-if="barType === 1">
      <div class="item" v-for="(item, index) in barsList" :key="index">
        <span>
          <CountUp
            v-if="index === 0"
            :startVal="0"
            :endVal="item.value"
            :duration="2"
            :options="{ decimalPlaces: 2, useGrouping: false }"
          ></CountUp>
          <CountUp
            v-else
            :startVal="0"
            :endVal="item.value"
            :duration="2"
            :options="{ useGrouping: false }"
          ></CountUp>
        </span>
        <span>{{ item.label }}</span>
      </div>
    </template>

    <template v-else>
      <div class="item" v-for="(item, index) in barsList2" :key="index">
        <span>
          <CountUp
            :startVal="0"
            :endVal="item.value"
            :duration="2"
            :options="{ decimalPlaces: 0, useGrouping: false }"
          ></CountUp>
        </span>
        <span>{{ item.label }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import CountUp from 'vue-countup-v2'
import urls from '@/api/urls'
import request from '@/api/request'

export default {
  name: 'TopBars',

  components: {
    CountUp
  },

  props: ['footerType'],

  data () {
    return {
      sum_price: 0,
      goods_count: 0,
      merchant_count: 0,
      order_count: 0,
      post_count: 0,
      store_count: 0,
      user_count: 0,
      barType: 1
    }
  },

  computed: {
    barsList () {
      return [
        {
          value: Number(this.sum_price),
          label: '交易额(年)'
        },
        {
          value: Number(this.order_count),
          label: '订单数(年)'
        },
        // {
        //   value: 12,
        //   label: '门店数'
        // },
        {
          value: Number(this.user_count),
          label: '用户数'
        },
        {
          value: Number(this.merchant_count),
          label: '商户数'
        },
        {
          value: Number(this.goods_count),
          label: '商品数'
        },
        {
          value: Number(this.post_count),
          label: '设备数'
        }
      ]
    },

    barsList2 () {
      return [
        {
          value: 0,
          label: '商品数'
        },
        {
          value: 3000,
          label: '基地数'
        },
        {
          value: 0,
          label: '交易额'
        },
        {
          value: 0,
          label: '订单数'
        }
      ]
    }
  },

  watch: {
    footerType: {
      handler () {
        if (this.footerType === 1 || this.footerType === 2) {
          this.barType = this.footerType
        }
      },
      immediate: true
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {
      const date = new Date()
      const {
        data: { data }
      } = await request({
        url: urls.overview,
        method: 'POST',
        data: {
          time_range: [
            Date.parse(`${date.getFullYear()}/1/1 00:00:00`) / 1000,
            Date.now() / 1000
          ]
        }
      })

      this.sum_price = data[0].sum_price || 0
      this.goods_count = data[0].goods_count || 0
      this.merchant_count = data[0].merchant_count || 0
      this.order_count = data[0].order_count || 0
      this.post_count = data[0].post_count || 0
      this.store_count = data[0].store_count || 0
      this.user_count = data[0].user_count || 0
    }
  }
}
</script>

<style lang="less">
.bars {
  position: absolute;
  top: 0;
  width: 100%;
  height: 102px;
  display: grid;
  grid-template-columns: 300px 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  padding: 0 150px;

  .item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #218ff7;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
      to bottom,
      rgba(33, 143, 247, 0.2),
      rgba(33, 143, 247, 0)
    );

    span {
      &:first-child {
        font-size: 42px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #0084ff;
      }

      &:nth-child(2) {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }

    &:nth-child(2) {
      span {
        &:first-child {
          color: rgba(25, 214, 255, 1);
        }
      }
    }

    &:nth-child(3) {
      span {
        &:first-child {
          color: rgba(55, 255, 201, 1);
        }
      }
    }

    &:nth-child(4) {
      span {
        &:first-child {
          color: rgba(195, 177, 255, 1);
        }
      }
    }

    &:nth-child(5) {
      span {
        &:first-child {
          color: rgba(255, 231, 119, 1);
        }
      }
    }

    &:nth-child(6) {
      span {
        &:first-child {
          color: rgba(25, 214, 255, 1);
        }
      }
    }

    &:nth-child(7) {
      span {
        &:first-child {
          color: rgba(55, 255, 201, 1);
        }
      }
    }
  }
}
</style>
