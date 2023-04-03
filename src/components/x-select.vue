<template>
  <div class="x_select" v-click-outside="onClose">
    <div class="title" @click="onShowContent">
      <span>{{ currentObj?.label || '请选择' }}</span>
      <img :class="{ active: isShow }" src="@/assets/images/arr.png" alt="" />
    </div>

    <div v-if="isShow" class="content">
      <div
        class="item"
        :class="{ active: currentObj?.value === item.value }"
        v-for="(item, index) in options"
        :key="index"
        @click="onSelectItem(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XSelect',

  props: {
    value: {
      type: String || Number,
      default: ''
    },
    options: {
      type: Array,
      default () {
        return [
          {
            value: '1',
            label: 'Option1'
          },
          {
            value: '2',
            label: 'Option2'
          },
          {
            value: '3',
            label: 'Option3'
          }
        ]
      }
    }
  },

  data () {
    return {
      currentObj: {},
      isShow: false
    }
  },

  created () {
    if (this.value) {
      this.currentObj = this.options.find((item) => item.value === this.value)
    }
  },

  methods: {
    onShowContent () {
      this.isShow = !this.isShow
    },

    onSelectItem (data) {
      this.currentObj = data
      this.isShow = false
      this.$emit('update:value', data.value)
      this.$emit('select', data)
    },

    onClose (event) {
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.x_select {
  position: relative;
  width: max-content;
  height: 40px;
  display: flex;
  align-items: center;

  .title {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    span {
      font-size: 19px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #eff8fc;
      line-height: 39px;
    }

    img {
      height: 26px;
      margin-left: 8px;
      transition: transform 0.3s;
    }

    .active {
      transform: rotate(-180deg);
    }
  }
  .content {
    position: absolute;
    top: 40px;
    width: max-content;
    height: max-content;
    padding: 5px;
    background: rgba(3, 22, 57, 0.9);
    border: 1px solid #153d82;
    border-radius: 3px;
    z-index: 3;

    .item {
      padding: 7px 10px;
      text-align: center;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      cursor: pointer;
      border-bottom: 1px solid rgba(17, 51, 109, 0.5);

      &:hover {
        background-color: rgba(17, 51, 109, 0.5);
      }

      &:last-child {
        border-bottom: none;
      }
    }

    .active {
      background-color: rgba(17, 51, 109, 0.5);
      color: rgba(0, 186, 255, 1);
    }
  }
}
</style>
