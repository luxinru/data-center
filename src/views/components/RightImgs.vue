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
          name: '南丰蜜桔',
          src: require('@/assets/images/gongyingshang/南丰蜜桔.jpg')
        },
        {
          name: '鄱阳湖银鱼',
          src: require('@/assets/images/gongyingshang/鄱阳湖银鱼.jpg')
        },
        {
          name: '三江口蔬菜基地',
          src: require('@/assets/images/gongyingshang/三江口蔬菜基地.jpg')
        },
        {
          name: '遂川县狗牯脑茶',
          src: require('@/assets/images/gongyingshang/遂川县狗牯脑茶.jpg')
        },
        {
          name: '泰和乌鸡',
          src: require('@/assets/images/gongyingshang/泰和乌鸡.jpg')
        }
      ],
      imgsList2: [
        {
          name: '万年贡米',
          src: require('@/assets/images/gongyingshang/万年贡米.jpg')
        },
        {
          name: '万载百合粉',
          src: require('@/assets/images/gongyingshang/万载百合粉.jpg')
        },
        {
          name: '向塘基地',
          src: require('@/assets/images/gongyingshang/向塘基地.jpg')
        },
        {
          name: '向塘蔬菜基地',
          src: require('@/assets/images/gongyingshang/向塘蔬菜基地.jpg')
        },
        {
          name: '宜春茶油',
          src: require('@/assets/images/gongyingshang/宜春茶油.jpg')
        }
      ],
      imgsList3: [
        {
          name: '宜丰闽笋',
          src: require('@/assets/images/gongyingshang/宜丰闽笋.jpg')
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
