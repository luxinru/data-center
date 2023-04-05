<template>
  <div class="footer">
    <el-tooltip
      effect="dark"
      content="交易地图"
      placement="top"
      :hide-after="1000000"
    >
      <div class="item" @click="onFooterClick(1)">
        <img class="bac" src="@/assets/images/base.png" alt="" />
        <img class="icon" src="@/assets/images/Tradingmap.png" alt="" />
      </div>
    </el-tooltip>

    <el-tooltip
      effect="dark"
      content="供销物联网"
      placement="top"
      :hide-after="1000000"
    >
      <div class="item" @click="onFooterClick(2)">
        <img class="bac" src="@/assets/images/base.png" alt="" />
        <img class="icon" src="@/assets/images/Internetofthings.png" alt="" />
      </div>
    </el-tooltip>

    <el-tooltip
      effect="dark"
      content="视频列表"
      placement="top"
      :hide-after="1000000"
    >
      <div class="item" @click="onFooterClick(3)">
        <img class="bac" src="@/assets/images/base.png" alt="" />
        <img class="icon" src="@/assets/images/Videolist.png" alt="" />
      </div>
    </el-tooltip>

    <el-tooltip effect="dark" content="APP演示" placement="top" :hide-after="0">
      <div class="item" @click="onFooterClick(4)">
        <img class="bac" src="@/assets/images/base.png" alt="" />
        <img class="icon" src="@/assets/images/app.png" alt="" />
      </div>
    </el-tooltip>

    <el-tooltip placement="top">
      <el-date-picker
        v-model="daterange"
        slot="content"
        type="daterange"
        :clearable="false"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <div class="item">
        <img class="bac" src="@/assets/images/base.png" alt="" />
        <img class="icon" src="@/assets/images/date.png" alt="" />
      </div>
    </el-tooltip>

    <XModal
      v-show="isShowMobileModal"
      @close="isShowMobileModal = !isShowMobileModal"
    >
      <div class="mobile" v-if="isShowMobileModal">
        <iframe :src="url" frameborder="0"></iframe>
      </div>
    </XModal>
  </div>
</template>

<script>
import XModal from '@/components/x-model.vue'

export default {
  name: 'FooterTools',

  components: {
    XModal
  },

  data () {
    return {
      daterange: [
        Date.parse(
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/1`
        ),
        Date.parse(
          `${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }/${new Date().getDate()}`
        )
      ],
      isShowModal: false,
      isFullScreen: false,
      isShowMobileModal: false,
      url: ''
    }
  },
  watch: {
    daterange: {
      handler (newVal) {
        this.$store.commit({
          type: 'setTimeRange',
          ranges: [
            Math.floor(new Date(this.daterange[0]).getTime() / 1000),
            Math.floor(new Date(this.daterange[1]).getTime() / 1000)
          ]
        })
        this.$EventBus.$emit('onTimeChange')
      },
      immediate: true
    }
  },
  methods: {
    onFooterClick (type) {
      switch (type) {
        case 1:
          this.$emit('showDataMap1')
          break
        case 2:
          this.$emit('showDataMap2')
          break
        case 3:
          // this.isFullScreen = false
          // this.isShowModal = true
          this.$emit('showVideoList')
          break

        case 4:
          this.url = 'http://shop.gxjnmall.com/'
          this.isShowMobileModal = true
          break
      }
    },
    onModalClose () {
      this.isShowModal = false
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  width: 100%;
  height: 140px;
  bottom: -80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 420px;

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

.device_list {
  width: 1495px;
  height: 983px;
  background: url('~@/assets/images/video-bj.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  padding: 36px;
  overflow: hidden;

  .title {
    width: 100%;
    height: 67px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 40px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #ffffff;
      margin-left: 36px;
    }

    img {
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .content {
    position: relative;
    width: 100%;
    flex: 1 0;
    overflow: hidden;
    padding: 16px 0;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;

    .item {
      position: relative;
      width: 100%;
      height: 253px;

      .bac {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .bar {
        position: absolute;
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        padding: 0 13px;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.8);

        .icon {
          height: 48px;
          cursor: pointer;
        }

        span {
          flex: 1 0;
          font-size: 20px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          margin-left: 5px;
        }

        .full {
          height: 38px;
          cursor: pointer;
        }
      }
    }

    .fullscreen {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      padding: 16px 0;

      .bac {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.mobile {
  width: 375px;
  height: 667px;
  transform: scale(1.5);

  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
