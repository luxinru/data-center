<template>
  <div class="user_analysis">
    <Box title="用户分析">
      <template #select>
        <XSelect :value="value" :options="options" @select="onSelect"/>
      </template>

      <div class="user_analysis_container">
        <div class="imgs">
          <img class="bac" src="@/assets/images/icon-bj-1.png" alt="" />
          <img class="content" :src="imgSrc[value]" alt="" />

          <span>{{ name }}</span>
        </div>

        <div class="labels" v-if="value === '3'">
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>18岁以下</span>
            <p>1%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>18~30岁</span>
            <p>21%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>30~40岁</span>
            <p>41%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>40~50岁</span>
            <p>26%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>50岁以上</span>
            <p>11%</p>
          </div>
        </div>

        <div class="labels" v-else-if="value === '4'">
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>总比例</span>
            <p>35%/65%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>18岁以下</span>
            <p>65%/35%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>18~30岁</span>
            <p>29%/71%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>30~40岁</span>
            <p>33%/67%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>40~50岁</span>
            <p>43%/57%</p>
          </div>
          <div class="item">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>50岁以上</span>
            <p>39%/61%</p>
          </div>
        </div>

        <div class="labels" v-else-if="value === '1'">
          <div class="item" v-for="(item, index) in ratingData.data" :key="index">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>{{item.range}}</span>
            <p>{{(Number(item.count) / ratingData.total * 100).toFixed(2)}}%</p>
          </div>
        </div>

        <div class="labels" v-else-if="value === '2'">
          <div class="item" v-for="(item, index) in ratingData.data" :key="index">
            <img class="bac" src="@/assets/images/underline.png" alt="" />
            <img class="arr" src="@/assets/images/weibiaoti.png" alt="" />
            <span>{{item.range}}</span>
            <p>{{(Number(item.count) / ratingData.total * 100).toFixed(2)}}%</p>
          </div>
        </div>
      </div>
    </Box>
  </div>
</template>

<script>
import Box from '@/components/box'
import XSelect from '@/components/x-select.vue'
import request from '@/api/request'
import urls from '@/api/urls'
import userSrc from '@/assets/images/user.png'
import genderSrc from '@/assets/images/gender.png'
import gradeSrc from '@/assets/images/grade.png'
import consumeSrc from '@/assets/images/consume.png'

export default {
  name: 'UserAnalysis',

  components: {
    Box,
    XSelect
  },

  data () {
    return {
      value: '3',
      options: [
        {
          value: '3',
          label: '用户年龄'
        },
        {
          value: '4',
          label: '用户性别'
        },
        {
          value: '1',
          label: '用户等级'
        },
        {
          value: '2',
          label: '消费次数'
        }
      ],
      imgSrc: {
        1: gradeSrc,
        2: consumeSrc,
        3: userSrc,
        4: genderSrc
      },
      userData: []
    }
  },

  computed: {
    name () {
      const finded = this.options.find(item => item.value === this.value)
      return finded.label
    },
    ratingData () {
      return {
        total: this.userData.reduce((a, b) => a + Number(b.count), 0),
        data: this.userData
      }
    }
  },

  // watch: {
  //   value: 'valueChange'
  // },

  mounted () {
    this.valueChange(this.value)
    this.$EventBus.$on('onTimeChange', () => {
      this.valueChange(this.value)
    })
  },

  beforeDestroy () {
    this.$EventBus.$off('onTimeChange')
  },

  methods: {
    valueChange (newVal) {
      this.getData(Number(newVal)).then(res => {
        this.userData = res
      })
    },
    async getData (type) {
      const res = await request({
        url: urls.user_ratio,
        method: 'POST',
        data: {
          type,
          time_range: this.$store.state.time_range
        }
      })
      return res.data.data
    },
    onSelect (data) {
      this.value = data.value
      this.valueChange(this.value)
    }
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
