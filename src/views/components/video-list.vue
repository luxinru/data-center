<template>
  <div class="video_list">
    <div class="title">
      <span>视频列表</span>
      <img src="@/assets/images/close.png" alt="" @click="onModalClose" />
    </div>

    <div class="content">
      <template v-if="!isFullScreen">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="onFullScreen(item)"
        >
          <video class="bac" :src="item.url"></video>

          <div class="bar">
            <img class="icon" src="@/assets/images/video.png" alt="" />
            <span>{{ item.name }}</span>

            <img class="full" src="@/assets/images/full-screen.png" alt="" />
          </div>
        </div>
      </template>

      <div
        v-else
        class="fullscreen"
        :style="{
          width: isFullScreen ? '100%' : '0',
          height: isFullScreen ? '100%' : '0',
        }"
      >
        <video class="bac" controls autoplay :src="currentVideo.url"></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoList',

  components: {},

  data () {
    return {
      isFullScreen: false,
      list: [
        // {
        //   name: '20220529供销江南宣传视频',
        //   url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/20220529%E4%BE%9B%E9%94%80%E6%B1%9F%E5%8D%97%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4'
        // },
        {
          name: '20220824央视新闻东方时空',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/20220824%E5%A4%AE%E8%A7%86%E6%96%B0%E9%97%BB%E4%B8%9C%E6%96%B9%E6%97%B6%E7%A9%BA.mp4'
        },
        {
          name: '20221217央视一套',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/20221217%E5%A4%AE%E8%A7%86%E4%B8%80%E5%A5%97.mp4'
        },
        {
          name: '20221217央视四套',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/20221217%E5%A4%AE%E8%A7%86%E5%9B%9B%E5%A5%97.mp4'
        },
        {
          name: '20221217江西卫视',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/20221217%E6%B1%9F%E8%A5%BF%E5%8D%AB%E8%A7%86.mp4'
        },
        {
          name: '20221219央视13套',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/20221219%E5%A4%AE%E8%A7%8613%E5%A5%97.mp4'
        },
        {
          name: '220518央视13套完整版',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/220518%E5%A4%AE%E8%A7%8613%E5%A5%97%E5%AE%8C%E6%95%B4%E7%89%88.mp4'
        },
        {
          name: '20220529供销江南宣传视频',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/221122%E5%A4%AE%E8%A7%8613%E5%A5%97.mp4'
        },
        {
          name: '“供销江南” 保供铁军',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/%E2%80%9C%E4%BE%9B%E9%94%80%E6%B1%9F%E5%8D%97%E2%80%9D%20%E4%BF%9D%E4%BE%9B%E9%93%81%E5%86%9B.mp4'
        },
        {
          name: '综合22年12月17日多频道央视报道视频',
          url: 'https://gxjn.oss-cn-hangzhou.aliyuncs.com/big-screen/videos/%E7%BB%BC%E5%90%8822%E5%B9%B412%E6%9C%8817%E6%97%A5%E5%A4%9A%E9%A2%91%E9%81%93%E5%A4%AE%E8%A7%86%E6%8A%A5%E9%81%93%E8%A7%86%E9%A2%91.mp4'
        }
      ],
      currentVideo: {}
    }
  },

  computed: {},

  methods: {
    onModalClose () {
      if (this.isFullScreen) {
        this.isFullScreen = !this.isFullScreen
        return
      }
      this.$emit('onModalClose')
    },

    onFullScreen (video) {
      this.currentVideo = video
      this.isFullScreen = true
    }
  }
}
</script>

<style lang="less" scoped>
.video_list {
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
      cursor: pointer;

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
</style>
