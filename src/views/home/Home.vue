<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import RecommendView from './childComponents/RecommendView'
import {getHomeMostData} from 'network/home.js'

export default {
  name: 'Home',
  components: {
    NavBar, HomeSwiper, RecommendView
  },
  data() {
    return {
      // result: null
      banners: [],
      recommends: []
    }
  },
  created() {
    getHomeMostData().then(res => {
      console.log(res)
      // this.result = res
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
