<template>
  <div class="bars">
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
  </div>
</template>

<script>
import CountUp from 'vue-countup-v2'

export default {
  name: 'TopBars',
  components: {
    CountUp
  },
  data () {
    return {
      barsList: [
        {
          value: 4037969.99,
          label: '交易额'
        },
        {
          value: 18832,
          label: '订单数'
        },
        // {
        //   value: 12,
        //   label: '门店数'
        // },
        {
          value: 5623,
          label: '用户数'
        },
        {
          value: 97,
          label: '商户数'
        },
        {
          value: 3741,
          label: '商品数'
        },
        {
          value: 12,
          label: '设备数'
        }
      ]
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
    background-image: linear-gradient(to bottom,
    rgba(33, 143, 247, 0.2),
    rgba(33, 143, 247, 0));

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
