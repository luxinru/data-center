<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: YouSheBiaoTiHei;
  src: url('~@/assets/fonts/YouSheBiaoTiHei-2.woff2');
}

#app {
  width: 5824px;
  height: 1352px;
  overflow: hidden;
}

* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 10px;
  background: rgba(49, 147, 248, 0.1);
}

/* 设置滚动条滑块的颜色和形状 */
::-webkit-scrollbar-thumb {
  background-color: rgba(49, 147, 248, 0.2);
  border-radius: 12px;
}

html,
body {
  margin: 0;
  padding: 0;
}
</style>
