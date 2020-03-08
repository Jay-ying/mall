<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :swiperImages="topImages"></detail-swiper>
      <detail-base-info :baseGoogs="Goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
import DetailParamInfo from "./childComponents/DetailParamInfo"

import Scroll from "components/common/scroll/Scroll";

import { getDetailData, Goods, Shop, GoodsParam } from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      Goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
  created() {
    // 1.保存传来的商品id
    this.id = this.$route.params.id;

    // 2.带上id参数请求数据
    getDetailData(this.id).then(res => {
      console.log(res.result);
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
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
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
  height: calc(100% - 44px); 
  overflow: hidden;
}
</style>