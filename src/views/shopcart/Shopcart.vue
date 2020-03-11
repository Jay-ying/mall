<template>
  <div class="shopcart">
    <!-- 头部 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{shopCount}})</div>
    </nav-bar>
    <!-- 商品展示部分 -->
    <cart-list></cart-list>
    <!-- 计算总价部分 -->
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import CartList from './childComponents/CartList'
import CartButtomBar from './childComponents/CartButtomBar'

import NavBar from 'components/common/navBar/NavBar'

import {mapGetters} from 'vuex'

export default {
  name: 'Shopcart',
  components: {
    CartList,
    CartButtomBar,
    NavBar
  },
  computed: {
    // ...mapGetters(['cartLength', 'shopList'])
    ...mapGetters({
      shopCount: 'cartLength',
      // shopDetail: 'shopList'
    })
  }
}
</script>

<style scoped>
.shopcart {
  height: 100vh;
}
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    letter-spacing: 1px;
    z-index: 9;
  }
</style>