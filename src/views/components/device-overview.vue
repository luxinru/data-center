<template>
  <div class="device_overview">
    <Box title="设备概览">
      <div class="device_overview_container">
        <div class="part">
          <div class="imgs">
            <img class="bac" src="@/assets/images/icon-bj-2.png" alt="" />
            <img
              class="content"
              src="@/assets/images/Self-extraction.png"
              alt=""
            />
            <span>自提柜</span>
          </div>
          <div class="labels">
            <div class="item">
              <span>设备数量</span>
              <p>{{overviewData.cabinet.counts}}</p>
            </div>
<!--            <div class="item">-->
<!--              <span>使用次数</span>-->
<!--              <p>{{overviewData.cabinet.use_times}}</p>-->
<!--            </div>-->
            <div class="item">
              <span>正常运行</span>
              <p>{{overviewData.cabinet.counts1}}</p>
            </div>
            <div class="item">
              <span>故障检修</span>
              <p>{{overviewData.cabinet.counts2}}</p>
            </div>
            <div class="item">
              <span>关闭暂停</span>
              <p>{{overviewData.cabinet.counts3}}</p>
            </div>
          </div>
        </div>
        <div class="part">
          <div class="imgs">
            <img class="bac" src="@/assets/images/icon-bj-2.png" alt="" />
            <img class="content" src="@/assets/images/retail.png" alt="" />
            <span>零售柜</span>
          </div>
          <div class="labels">
            <div class="item">
              <span>设备数量</span>
              <p>{{overviewData.shop.counts}}</p>
            </div>
<!--            <div class="item">-->
<!--              <span>使用次数</span>-->
<!--              <p>{{overviewData.shop.use_times}}</p>-->
<!--            </div>-->
            <div class="item">
              <span>正常运行</span>
              <p>{{overviewData.shop.counts1}}</p>
            </div>
            <div class="item">
              <span>故障检修</span>
              <p>{{overviewData.shop.counts2}}</p>
            </div>
            <div class="item">
              <span>关闭暂停</span>
              <p>{{overviewData.shop.counts3}}</p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'

export default {
  name: 'DeviceOverview',

  components: {
    Box
  },

  props: ['overviewData'],

  data () {
    return {

    }
  },

  mounted () {
    this.init()
  },

  methods: {
    async init () {

    }
  }
}
</script>

<style lang="less" scoped>
.device_overview {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .device_overview_container {
    width: 100%;
    height: 100%;
    display: flex;

    .part {
      flex: 1 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .imgs {
        position: relative;
        width: 197px;
        height: 219px;
        display: flex;
        align-items: center;
        justify-content: center;

        .bac {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .content {
          margin-left: 10px;
          position: absolute;
          animation: updown 5s infinite linear;
        }

        @keyframes updown {
          0% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(-30px);
          }
          100% {
            transform: translateY(-10px);
          }
        }

        span {
          position: absolute;
          top: 0;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #abec96;

          background: linear-gradient(180deg, #61a0ff 0%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      .labels {
        width: 100%;
        // height: 148px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 16px;

        .item {
          width: 228px;
          height: 42px;
          margin-top: 11px;
          display: flex;
          align-items: center;
          padding: 0 0 0 25px;

          span {
            font-size: 19px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            margin-right: 20px;
          }

          p {
            font-size: 24px;
            font-family: YouSheBiaoTiHei;
            font-weight: 400;
            color: #2bb5fe;
          }

          &:first-child {
            margin-top: 0;
          }

          &:nth-child(1) {
            background: url('~@/assets/images/icon-bj-3.png') no-repeat;
            background-size: 100% 100%;
          }

          &:nth-child(2) {
            background: url('~@/assets/images/icon-bj-4.png') no-repeat;
            background-size: 100% 100%;

            p {
              color: rgba(171, 236, 150, 1);
            }
          }

          &:nth-child(3) {
            background: url('~@/assets/images/icon-bj-5.png') no-repeat;
            background-size: 100% 100%;

            p {
              color: rgba(255, 198, 123, 1);
            }
          }
          &:nth-child(4) {
            background: url('~@/assets/images/icon-bj-3.png') no-repeat;
            background-size: 100% 100%;
          }

          &:nth-child(5) {
            background: url('~@/assets/images/icon-bj-4.png') no-repeat;
            background-size: 100% 100%;

            p {
              color: rgba(171, 236, 150, 1);
            }
          }

          &:nth-child(6) {
            background: url('~@/assets/images/icon-bj-5.png') no-repeat;
            background-size: 100% 100%;

            p {
              color: rgba(255, 198, 123, 1);
            }
          }
        }
      }
    }
  }
}
</style>
