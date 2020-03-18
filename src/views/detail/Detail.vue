<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollPosition="contentScroll">
      <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">{{item}}</li>
      </ul> -->
      <detail-swiper :swiper-images="topImages"></detail-swiper>
      <detail-base-info :base-googs="Goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addShop="addShopToCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :is-show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import BackTop from "components/content/backTop/BackTop";
// import Toast from "components/common/toast/Toast"

import {mapActions} from 'vuex'

import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail.js";
import { debounce } from "common/utils";
import { itemListenerMixin , backTopMixin} from "common/mixin.js";

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      Goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      // isShowBackTop: false,
      message: '',
      show: false,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
    // BackTop
  },
  methods: {
    ...mapActions(['addCart']),

    // 监听详情页图片加载完成的时候，刷新scroll，使他重新计算可滚动距离
    // 由于DetailGoodsInfo里面进行了判断，当所有图片加载完成后才进行一次回调
    // 所以这里对获取顶部的距离可以不用进行防抖处理，但是我还是把他写出来看看
    imageLoad() {
      // this.$refs.scroll.refresh()
      this.refresh();

      // 进行了防抖处理，放在下面了,下面是调用封装后的方法
      this.getThemeTopY()
      // this.themeTopY = []
      // this.themeTopY.push(0);
      // this.themeTopY.push(this.$refs.params.$el.offsetTop);
      // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopY);
    },
    // 监听顶部导航传来对应标题的下标
    titleClick(index) {
      console.log(index);
      // 获取每一个板块的Y值，根据下标来对应跳到对应的值
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },

    // backTopClick() {
    //   // console.log('返回顶部')
    //   this.$refs.scroll.scrollTo(0, 0, 100)
    // },

    // 拿到scroll发送过来的事件，来监听对应滚动的距离
    contentScroll(position) {
      // console.log(position)
      // 1.获取y值
      const positionY = -position.y 

      // 2.postionY和主题中值进行对比
      let length = this.themeTopY.length
      // for (let i = 0; i < length; i++) {
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1]) 
      //   || (i === length - 1 && positionY >= this.themeTopY[i]))) {
      //     this.currentIndex = i;
      //     // console.log(this.currentIndex)
      //     this.$refs.detailNavBar.currentIndex = this.currentIndex
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY < this.themeTopY[i+1])) {
          this.currentIndex = i;
          console.log(this.currentIndex)
          this.$refs.detailNavBar.currentIndex = this.currentIndex
        }
      }

      // 3.判断BackTop是否显示
      // this.isShowBackTop = (-position.y) > 1000
      this.listenShowBackTop(position)
    },

    // 拿到子组件传来的事件，将点击的商品加入到购物车
    addShopToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
        product.image = this.topImages[0];
        product.title = this.Goods.title;
        product.desc = this.Goods.desc;
        product.price = this.Goods.realPrice;
        product.iid = this.id;

        // 2.将商品添加到购物车中
        // this.$store.commit('addCart', product)
        // 通过action来进行相关判断后加入商品
        // !!!通过vuex的映射关系可以简化调用actions方法的代码，简写后如下
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res)
        //   // 通过vuex中完成添加后，返回的状态来提示用户商品添加购物车成功
        // })
        this.addCart(product).then(res => {
          // console.log(res)
          // this.show = true;
          // this.message = res
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // }, 1500)

          // console.log(this.$toast)
          this.$toast.show(res, 1500)
          // this.$toast.show()
        })
    }
  },
  created() {
    // 1.保存传来的商品id
    this.id = this.$route.params.id;

    // 2.带上id参数请求包含商品，参数，评论数据
    getDetailData(this.id).then(res => {
      // console.log(res.result);
      const data = res.result;
      // 2.1获取顶部的轮播图图片
      this.topImages = res.result.itemInfo.topImages;

      // 2.2获取商品信息的对象
      this.Goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3获取店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 2.4保存每件商品的详情数据
      this.detailInfo = data.detailInfo;

      // 2.5获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.6取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // ！拿到数据后会给数据赋值，赋值完后会执行一个回调函数$nextTick(() => {})
      // 但是在这里仅仅是渲染了dom(还没有挂载到真实dom)，但是图片还没有加载完，所以拿到的数据不对
      // this.$nextTick(() => {
      //   this.themeTopY.push(0);
      //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopY);
      // });
    });

    // 3.获取推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值(关于顶部标题栏获取对应位置到顶部的距离的相关变量)
    this.getThemeTopY = debounce(() => {
      this.themeTopY = []
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
      console.log(this.themeTopY);
    })
  },
  mounted() {
    // ！！！由于vue具有混入功能，所以可以将生命周期中相同的代码，抽取出来混入，到时候直接调用就可以了，这里抽到了mixin.js里面
    // 监听图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    // this.itemImageListener = () => {
    //   refresh()
    // }
    // this.$bus.$on("itemImageLoad", this.itemImageListener)
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
/* 第二种方法，但是该方法需要将父盒子里面的上下内边距去掉 */
/* height里面的值为计算当前窗口页面的高度，再减去上下导航占的高度，且需要父盒子配合设置100vh */
#detail .content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
/* 这里发生一个很大的问题就是，我详情顶部列表在获取对应位置的组件到顶部的距离的时候，我点击每个标题
跳转的对应的位置，但是总是不对，我研究半天发现是被顶部标题导航挡住了，所以位置获取到这个页面的顶部，但是
不应该啊，我应该获取到的是到父元素scroll组件顶部的距离，所以我怀疑可能是脱标了，然后给scroll加了一个相对定位就好了 */
.content {
  position: relative;
}
</style>