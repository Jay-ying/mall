<template>
  <tab-bar>
    <!-- <router-view></router-view> -->
    <!-- 不传颜色就使用默认值 -->
    <tab-bar-item path="/home" activeColor="#ff5777">
      <!-- 在webpack.base.conf.js里面配置了别名路径(alias),但是在template里面用的时候前面必须加~,通过import引用的可以不用加 -->
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#ff5777">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" activeColor="#ff5777">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#ff5777">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt />
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";

export default {
  name: "MainTabBar",
  // 注意这里的components我少写了s，内容可以显示，但是没有css效果，且在页面检查时f12也显示的组件标签
  // 我还以为哪里类名写错了，导致css不显示，以后要细心啊
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>