// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 这里是主文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // 传递一个参数: 让页面默认显示的模板 return
  render: h => h(App)
})
// template: '<App/>',components: { App }
