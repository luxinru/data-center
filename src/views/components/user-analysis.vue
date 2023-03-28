<template>
  <div class="user_analysis">
    <Box title="用户分析">
      <div class="user_analysis_container">
        <div class="imgs">
          <img class="bac" src="@/assets/images/icon-bj-1.png" alt="" />
          <img class="content" src="@/assets/images/user.png" alt="" />

          <span>用户年龄</span>
        </div>

        <div class="labels">
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>18岁以下</span>
            <p>20%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>18~30岁</span>
            <p>20%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>30~40岁</span>
            <p>20%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>40~50岁</span>
            <p>20%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>50岁以上</span>
            <p>20%</p>
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'

export default {
  name: 'UserAnalysis',

  components: {
    Box
  }
}
</script>

<style lang="less" scoped>
.user_analysis {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .user_analysis_container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .imgs {
      width: 320px;
      height: 320px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .bac {
        position: absolute;
        width: 320px;
        height: 320px;
      }

      .content {
        position: absolute;
        animation: updown 5s infinite linear;
      }

      @keyframes updown {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
        100% {
          transform: translateY(0px);
        }
      }

      span {
        position: absolute;
        top: 0;
        font-size: 30px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ffffff;

        background: linear-gradient(180deg, #61a0ff 0%, #ffffff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .labels {
      margin-left: 40px;
      width: 260px;
      display: flex;
      flex-direction: column;

      .item {
        width: 100%;
        height: 60px;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 0 0 37px;

        .bac {
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
        }

        .arr {
          position: absolute;
          left: 0;
        }

        span {
          flex: 1 0;
          font-size: 19px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }

        p {
          font-size: 30px;
          font-family: YouSheBiaoTiHei;
          font-weight: 400;
          color: #37e48b;
          line-height: 63px;

          background: linear-gradient(180deg, #95cdff 0%, #d8edff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }
  }
}
</style>
