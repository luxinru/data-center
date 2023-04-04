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
      <LeftPart v-if="type === 1" />
      <leftImgs v-else />
    </div>

    <div class="center-part">
      <img class="left" src="@/assets/images/left-1.png" alt="" />
      <img class="right" src="@/assets/images/right-1.png" alt="" />
      <data-map ref="dataMapRef" :type="type" />
      <top-bars />
      <footer-tools
        @showDataMap1="showDataMap1"
        @showDataMap2="showDataMap2"
        @showVideoList="showVideoList"
      />
    </div>

    <div class="part">
      <RightPart v-if="type === 1" />
      <RightImgs v-else />
    </div>

    <XModal v-show="isShowVideoModal">
      <VideoList v-if="isShowVideoModal" @onModalClose="onModalClose" />
    </XModal>
  </div>
</template>

<script>
import LeftPart from './LeftPart.vue'
import RightPart from './RightPart.vue'
import XModal from '@/components/x-model.vue'
import leftImgs from './components/leftImgs.vue'
import RightImgs from './components/RightImgs.vue'
import DataMap from './components/DataMap.vue'
import TopBars from './components/TopBars.vue'
import FooterTools from './components/FooterTools.vue'
import VideoList from './components/video-list.vue'

export default {
  name: 'Home',

  components: {
    LeftPart,
    RightPart,
    XModal,
    leftImgs,
    RightImgs,
    DataMap,
    TopBars,
    FooterTools,
    VideoList
  },

  data () {
    return {
      isShowVideoModal: false,
      type: 1
    }
  },

  methods: {
    showDataMap1 () {
      this.type = 1
      this.$refs.dataMapRef.showDataMap1()
    },

    showDataMap2 () {
      this.type = 2
      this.$refs.dataMapRef.showDataMap2()
    },

    showVideoList () {
      this.isShowVideoModal = true
    },
    onModalClose () {
      this.isShowVideoModal = false
    }
  }
}
</script>

<style lang="less">
.el-tooltip__popper {
  white-space: nowrap;
  font-size: 25px;
  color: rgba(255, 255, 255, 1);
  padding: 14px 20px;
}

.el-tooltip__popper.is-dark {
  background: rgba(0, 0, 0, 1) !important;
}

.el-tooltip__popper[x-placement^='top'] .popper__arrow::after {
  border-top-color: rgba(0, 0, 0, 1);
}

.el-tooltip__popper[x-placement^='top'] .popper__arrow {
  border-top-color: rgba(0, 0, 0, 1);
}

.el-picker-panel {
  background: rgba(3, 22, 57, 0.9);
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  border: 1px solid rgba(21, 61, 130, 1);
}

.el-date-range-picker__content.is-left {
  border-right: 1px solid rgba(21, 61, 130, 1);
}

.el-date-table th {
  border-bottom: solid 1px rgba(21, 61, 130, 1);
}

.el-date-table td.in-range div,
.el-date-table td.in-range div:hover,
.el-date-table.is-week-mode .el-date-table__row.current div,
.el-date-table.is-week-mode .el-date-table__row:hover div {
  background-color: rgba(17, 51, 109, 0.5);
}

.el-popper[x-placement^='top'] .popper__arrow::after {
  border-top-color: rgba(21, 61, 130, 1);
}

.el-picker-panel__icon-btn {
  font-size: 16px;
  color: #fff;
}

.el-date-range-picker__header div {
  font-size: 20px;
}

.el-date-table {
  font-size: 16px;
}

.el-input__inner {
  background-color: rgba(21, 61, 130, 0.5) !important;
  border: 1px solid rgba(21, 61, 130, 1);

  &:hover {
    border: 1px solid rgba(21, 61, 130, 1);
  }
}

.el-date-editor .el-range-input {
  font-size: 16px;
  color: #fff;
  background-color: transparent;
}

.el-date-editor .el-range-separator {
  color: #fff;
}
</style>

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
      top: 4px;
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 55px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #eff8fc;
      text-shadow: 0px 4px 1px rgba(19, 80, 143, 0.66);
    }
  }

  .part {
    position: relative;
    width: 2000px;
    height: 100%;
    padding: 83px 0 75px;
  }

  .center-part {
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
  }
}
</style>
