<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in shopList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from "vuex";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(["shopList"])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  /* height: calc(100% - 44px - 49px); */
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>