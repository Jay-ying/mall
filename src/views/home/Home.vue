<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">Yukino</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" class="toTop"></tab-control>
    <scroll class="scroll" ref="scroll" v-bind:probe-type="3" @scrollPosition="contentScroll" :pull-up-load="true" @pullingUp="loadContent">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl"></tab-control>
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
import { debounce } from "common/utils.js";

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.goodsType].list;
    }
  },
  activated() {
    // console.log('activated')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
  },
  created() {
    // 1.请求多个数据(轮播图等)
    this.getHomeMost();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1.监听GoodsListItem中图片加载完成,由于拿scroll组件，需要在mounted里面拿，加载到dom后才能拿组件
    // console.log(debounce)
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on("itemImageLoad", () => {
      // console.log('---')
      // this.$refs.scroll.refresh()
      refresh()
    })

    // 2.获取tabControl的offsetTop,在mounted里面获取是不对的，因为这时图片还没加载完
    // 经过验证，轮播图的图片影响是最大的，所有进入对应轮播的组件的图片标签那里(homeSwiper)，利用vue监听图片是否加载完成的
    // 方法@load来传对应的事件后再来获取对应的距离顶部的距离，写在下面的方法里面
    // 所有组件都有一个属性$el: 用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)
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
          // 将获取到的数据放入对应的类型以后，需要更新该类型在data里面存储的页数实际值，这样下次才能拿到下一页的数据
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
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },

    // 返回顶部按钮，传入参数，返回到指定的位置
    backTopClick() {
      // console.log('返回顶部')
      this.$refs.scroll.scrollTo(0, 0, 100)
    },
    // 设置滑动到一定距离显示回到顶部按钮，否则隐藏
    contentScroll(position) {
      // console.log(position)
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      
      // 2.决定tabControl是够吸顶(position: fixed)
      this.isTabFixed = (-position.y) >= this.tabOffsetTop
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
    },

    // 获取轮播图组件里监听完图片加载后传来的事件
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    }

    // 封装防抖函数debounce，由于监听30张图片都加载完会很消耗性能，所以利用防抖函数解决问题
    // 该方法已经封装到common/utils.js文件里面 
    // debounce(fnc, delay) {
    //   let timer = null;
    //   return function(...args) {
    //     if(timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       fnc.apply(this, args)
    //     }, delay)
    //   }
    // }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  padding-bottom: 49px;
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  letter-spacing: 1px;
 
  /* 使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
}

/* 由于该方法做的吸顶效果很多浏览器不支持，放弃 */
/* class="tab-control" */
/* #home .tab-control {
  background-color: #fff;
  position: sticky;
  top: 44px;
} */

.toTop {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

/* 第一种方法 */
#home .scroll {
  overflow: hidden;
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
