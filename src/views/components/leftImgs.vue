<template>
  <div class="wrapper">
    <vue-seamless-scroll
      :data="imgsList1"
      :class-option="{ limitMoveNum: 4, direction: 2, step: 0.8 }"
      class="warp"
    >
      <ul class="ul-item">
        <li class="li-item" v-for="(item, index) in imgsList1" :key="index">
          <img :src="item.src" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </vue-seamless-scroll>
    <vue-seamless-scroll
      :data="imgsList2"
      :class-option="{ limitMoveNum: 4, direction: 2, step: 0.6 }"
      class="warp"
      style="margin-top: 24px"
    >
      <ul class="ul-item">
        <li class="li-item" v-for="(item, index) in imgsList2" :key="index">
          <img :src="item.src" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </vue-seamless-scroll>
    <vue-seamless-scroll
      :data="imgsList3"
      :class-option="{ limitMoveNum: 4, direction: 2, step: 0.4 }"
      class="warp"
      style="margin-top: 24px"
    >
      <ul class="ul-item">
        <li class="li-item" v-for="(item, index) in imgsList3" :key="index">
          <img :src="item.src" alt="" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  name: 'LeftImgs',

  components: {
    vueSeamlessScroll
  },

  data () {
    return {
      imgsList1: [
        {
          name: '安福火腿',
          src: require('@/assets/images/gongyingshang/安福火腿.jpg')
        },
        {
          name: '崇仁麻鸡',
          src: require('@/assets/images/gongyingshang/崇仁麻鸡.jpg')
        },
        {
          name: '崇仁养殖场',
          src: require('@/assets/images/gongyingshang/崇仁养殖场.jpg')
        },
        {
          name: '丰城冻米糖',
          src: require('@/assets/images/gongyingshang/丰城冻米糖.jpg')
        },
        {
          name: '庐山云雾茶',
          src: require('@/assets/images/gongyingshang/庐山云雾茶.jpg')
        }
      ],
      imgsList2: [
        {
          name: '奉新猕猴桃',
          src: require('@/assets/images/gongyingshang/奉新猕猴桃.jpg')
        },
        {
          name: '赣南脐橙',
          src: require('@/assets/images/gongyingshang/赣南脐橙.jpg')
        },
        {
          name: '高安腐竹',
          src: require('@/assets/images/gongyingshang/高安腐竹.jpg')
        },
        {
          name: '高安牛场',
          src: require('@/assets/images/gongyingshang/高安牛场.jpg')
        },
        {
          name: '麻丘蔬菜基地',
          src: require('@/assets/images/gongyingshang/麻丘蔬菜基地.jpg')
        }
      ],
      imgsList3: [
        {
          name: '井冈山黑猪',
          src: require('@/assets/images/gongyingshang/井冈山黑猪.jpg')
        },
        {
          name: '九江茶饼',
          src: require('@/assets/images/gongyingshang/九江茶饼.jpg')
        },
        {
          name: '军山湖大闸蟹',
          src: require('@/assets/images/gongyingshang/军山湖大闸蟹.jpg')
        },
        {
          name: '黎川茶树菇',
          src: require('@/assets/images/gongyingshang/黎川茶树菇.jpg')
        },
        {
          name: '南安板鸭',
          src: require('@/assets/images/gongyingshang/南安板鸭.jpg')
        }
      ]
    }
  },

  mounted () {
    this.$nextTick(() => {})
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .warp {
    width: 482px * 4;
    margin: 0 auto;
    overflow: hidden;
    ul {
      list-style: none;
      padding: 0;
      margin: 0 auto;
      height: 327px;

      &.ul-item {
        display: flex;
        .li-item {
          position: relative;
          width: 482px;
          height: 327px;
          margin-right: 24px;

          img {
            width: 100%;
            height: 100%;
          }

          span {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 24px;
            padding: 16px 0;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            text-align: center;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
