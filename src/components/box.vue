<template>
  <div class="box">
    <div class="title">
      <span class="name">
        {{ title }}
      </span>

      <div class="select">
        <slot name="select"></slot>
      </div>
    </div>

    <div class="container"><slot /></div>
  </div>
</template>

<script>
export default {
  name: 'Box',

  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    height: 60px;
    background: url('~@/assets/images/title.png') no-repeat;
    background-size: 100% auto;
    padding: 0 16px 0 67px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name {
      margin-bottom: 34px;
      font-size: 36px;
      font-family: YouSheBiaoTiHei;
      font-weight: 400;
      color: #ffffff;
    }

    .select {
      flex: 1 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 12px;
    }
  }

  .container {
    width: 100%;
    flex: 1 0;
    margin-top: 20px;
    overflow: hidden;
  }
}
</style>
