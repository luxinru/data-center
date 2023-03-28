<template>
  <div class="box">
    <div class="title">
      <span>
        {{ title }}
      </span>
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
  overflow: hidden;

  .title {
    width: 100%;
    height: 60px;
    background: url('~@/assets/images/title.png') no-repeat;
    background-size: 100% auto;
    font-size: 36px;
    font-family: YouSheBiaoTiHei;
    font-weight: 400;
    color: #ffffff;
    padding: 0 0 34px 67px;
    display: flex;
    align-items: center;
  }

  .container {
    width: 100%;
    flex: 1 0;
    margin-top: 20px;
    overflow: hidden;
  }
}
</style>
