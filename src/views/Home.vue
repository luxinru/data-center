<template>
  <div class="home">
    <!-- 背景图片图层 -->
    <div class="bac_imgs">
      <img class="top" src="@/assets/images/top.png" alt="" />
      <img class="bottom" src="@/assets/images/bottom.png" alt="" />
      <img class="left" src="@/assets/images/left.png" alt="" />
      <img class="right" src="@/assets/images/right.png" alt="" />

      <span class="top_title"> 供销江南大数据中心 </span>
    </div>

    <div class="part">
      <LeftPart />
    </div>

    <div class="map">
      <img class="left" src="@/assets/images/left-1.png" alt="" />
      <img class="right" src="@/assets/images/right-1.png" alt="" />

      <div class="bars">
        <div class="item" v-for="(item, index) in barsList" :key="index">
          <span>
            <CountUp
              v-if="index === 0"
              :startVal="0"
              :endVal="item.value"
              :duration="2"
              :options="{ decimalPlaces: 2 }"
            ></CountUp>
            <CountUp
              v-else
              :startVal="0"
              :endVal="item.value"
              :duration="2"
            ></CountUp>
          </span>
          <span>{{ item.label }}</span>
        </div>
      </div>

      <div class="svg_map">
        <img class="bac" src="@/assets/images/map.png" alt="" />
        <!-- <img class="svg" src="@/assets/images/map.svg" alt=""> -->
      </div>

      <div class="footer">
        <div class="item">
          <img class="bac" src="@/assets/images/base.png" alt="" />
          <img class="icon" src="@/assets/images/Tradingmap.png" alt="" />
        </div>

        <div class="item">
          <img class="bac" src="@/assets/images/base.png" alt="" />
          <img class="icon" src="@/assets/images/Internetofthings.png" alt="" />
        </div>

        <div class="item">
          <img class="bac" src="@/assets/images/base.png" alt="" />
          <img class="icon" src="@/assets/images/Videolist.png" alt="" />
        </div>

        <div class="item">
          <img class="bac" src="@/assets/images/base.png" alt="" />
          <img class="icon" src="@/assets/images/date.png" alt="" />
        </div>
      </div>
    </div>

    <div class="part">
      <RightPart />
    </div>
  </div>
</template>

<script>
import CountUp from 'vue-countup-v2'
import LeftPart from './LeftPart.vue'
import RightPart from './RightPart.vue'

export default {
  name: 'Home',
  components: {
    CountUp,
    LeftPart,
    RightPart
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
        {
          value: 12,
          label: '门店数'
        },
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
  },

  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/images/bj.jpg') no-repeat;
  background-size: 100% 100%;
  display: flex;
  padding: 0 50px;

  .bac_imgs {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .top {
      position: absolute;
      top: 0;
      width: 100%;
    }

    .bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
    }

    .left {
      position: absolute;
      left: 0;
      height: 847px;
    }

    .right {
      position: absolute;
      right: 0;
      height: 847px;
    }

    .top_title {
      position: absolute;
      top: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 63px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #eff8fc;
      text-shadow: 0px 4px 1px rgba(19, 80, 143, 0.66);
      margin-top: 5px;
    }
  }

  .part {
    position: relative;
    width: 2000px;
    height: 100%;
    padding: 83px 0 75px;
  }

  .map {
    position: relative;
    flex: 1 0;
    height: calc(100% - 235px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 135px;

    .left {
      position: absolute;
      left: 0;
      height: 790px;
    }

    .right {
      position: absolute;
      right: 0;
      height: 790px;
    }

    .bars {
      position: absolute;
      top: 0;
      width: 100%;
      height: 102px;
      display: grid;
      grid-template-columns: 300px 180px 1fr 1fr 1fr 1fr 1fr;
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

    .svg_map {
      position: relative;
      width: 953px;
      height: 725px;

      .bac {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
      }
    }

    .footer {
      position: absolute;
      width: 100%;
      height: 140px;
      bottom: -80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 450px;

      .item {
        position: relative;
        width: 140px;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .bac {
          position: absolute;
          bottom: 0;
          width: 140px;
          height: 140px;
          // animation: blink 5s infinite;
        }

        // @keyframes blink {
        //   0% {
        //     opacity: 1;
        //   }
        //   50% {
        //     opacity: 0.7;
        //   }
        //   100% {
        //     opacity: 1;
        //   }
        // }

        .icon {
          position: absolute;
          // top: 0;
          transition: transform 1s;

          &:hover {
            transform: translateY(-20px);
          }
        }
      }
    }
  }
}
</style>
