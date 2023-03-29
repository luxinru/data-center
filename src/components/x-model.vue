<template>
  <!-- <div class="x_model">
  </div> -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'XModel',

  props: {},

  data () {
    return {
    }
  },

  created () {},

  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
/* 弹窗背景遮罩 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
}

/* 弹窗内容容器 */
.modal-wrapper {
  transition: all 0.3s ease;
}

/* 弹窗容器 */
.modal-container {
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
}

/* 弹窗动画样式 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
