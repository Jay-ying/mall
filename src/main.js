import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import imageLazyLoad from 'vue-lazyload'

import FastClick from 'fastclick'


// 1.导入自定义的插件
import toast from 'components/common/toast'
// 2.安装toast插件
Vue.use(toast)

// 解决移动端点击切换时300s延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(imageLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
