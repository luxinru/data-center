import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/**
 * 注册自定义指令，点击dom外部事件
 */
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // 判断点击的元素是否是 el 的子元素
      if (!(el === event.target || el.contains(event.target))) {
        // 执行绑定的方法
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
