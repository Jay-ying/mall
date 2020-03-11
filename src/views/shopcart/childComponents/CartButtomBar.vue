<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button :is-checked="isSelectAll" class="check-all-btn" @click.native="checkAllClick"></check-button>
      <span>全选</span>
    </div>

    <div class="totlal-price">
      合计:￥{{totlalPrice}}
    </div>
    
    <div class="calculate-price">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import checkButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartButtomBar",
  components: {
    checkButton
  },
  computed: {
    // 筛选出选中的商品，并且计算选中商品的总价格
    totlalPrice() {
      return this.$store.state.cartList.filter(item => item.checked).reduce((prePrice, now) => {
        return prePrice + now.price * now.count
      }, 0).toFixed(2)
    },
    // 计算选中的商品数量，然后显示在去计算的数量里面
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    //  判断商品是否全选，如果全部选择，这全选按钮点亮
    isSelectAll() {
      // 当vuex中没有被选中的商品时，需要将全选按钮变灰，因为下面的方法在没有商品时返回值为true
      if(this.$store.state.cartList.length === 0) return false
      // return !this.$store.state.cartList.some(item => !item.checked)
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  },
  methods: {
    // 点击全选按钮，如果现在商品已经全选，则改为全部不选，且全选按钮变灰
    // 如果有商品没有选择，点击全选按钮以后，改为全部选中商品，且全选按钮变亮
    checkAllClick() {
      if (this.isSelectAll) {
        return this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        return this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.check-all {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 20px 0 3px;
}
.check-all .check-all-btn {
  /* width: 40px; */
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.totlal-price {
  width: 164px;
}
.calculate-price {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #ff8198;
  color: #fff;
}
</style>