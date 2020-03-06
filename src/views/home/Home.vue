<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">十里淘花</div>
    </nav-bar>
    <scroll class="scroll" ref="scroll" v-bind:probe-type="3" @scrollPosition="contentScroll" :pull-up-load="true" @pullingUp="loadContent">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-List :goods="showGoods"></goods-List>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComponents/HomeSwiper";
import RecommendView from "./childComponents/RecommendView";
import featureView from "./childComponents/FeatureView";

import NavBar from "components/common/navBar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

import { getHomeMostData, getHomeGoodsData } from "network/home.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    featureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      goodsType: "pop",
      isShowBackTop: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.goodsType].list;
    }
  },
  created() {
    // 1.请求多个数据(轮播图等)
    this.getHomeMost();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 1.网络请求数据部分
    // 1.1请求多个数据(轮播图等)
    getHomeMost() {
      getHomeMostData()
        .then(res => {
          // console.log(res);
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 1.2请求商品数据
    getHomeGoods(type) {
      // 每次进入函数后，需要将商品的页数+1，这样下次才能拿到新的数据
      const pages = this.goods[type].page + 1;
      getHomeGoodsData(type, pages)
        .then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          // 第一次上拉加载更多后，想要继续实行这个效果，必须调用这个函数，是通过获取到scroll组件
          // 然后调用定义在该组件里面的finishPullUp方法
          this.$refs.scroll.finishPullUp()
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 2.事件监听数据部分,点击谁,就将当前的数据类型改为谁
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.goodsType = "pop";
          break;
        case 1:
          this.goodsType = "new";
          break;
        case 2:
          this.goodsType = "sell";
          break;
      }
    },

    // 返回顶部按钮，传入参数，返回到指定的位置
    backTopClick() {
      // console.log('返回顶部')
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 设置滑动到一定距离显示回到顶部按钮，否则隐藏
    contentScroll(position) {
      // console.log(position)
      if(-position.y > 1000) {
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    },

    // 监听加载更多，若触发事件，该继续拿到请求的数据渲染到页面
    loadContent() {
      console.log('加载更多');
      this.getHomeGoods(this.goodsType)

      // better-scroll在设置以后会计算可滚动区域，但是由于标签要加载，但是图片是异步的会后加载
      // 所以导致图片加载出来以后，高度就比之前计算的高度大很多，而better-scroll并不会进行新的计算
      // 这样就导致了我们在往上拉的过程中，拉一段距离就没法拉动了，卡在之前计算距离的地方了
      // 所以为了避免这一情况，我们在点击加载更多的时候，需要调用一个方法，使得better-scroll重新计算可滚动距离
      // 该方法封装在scroll组件里面，通过获取该组件来调用它的方法
      this.$refs.scroll.refresh()
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  padding-bottom: 49px;
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  letter-spacing: 1px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
#home .tab-control {
  background-color: #fff;
  position: sticky;
  top: 44px;
}
/* 第一种方法 */
#home .scroll {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 0;
}
/* 第二种方法，但是该方法需要将#home里面的上下内边距去掉 */
/* height里面的值为计算当前窗口页面的高度，再减去上下导航占的高度，且需要父盒子配合设置100vh */
/* #home .scroll {
  height: calc(100% - 93px); 
  overflow: hidden;
  margin-top: 44px;
} */
</style>
