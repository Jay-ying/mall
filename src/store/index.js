import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import actions from './action'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: mutations,
  actions: actions,
  getters,
  modules: {

  }
})

// 3.导出vuex 
export default store
