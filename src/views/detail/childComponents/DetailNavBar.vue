<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backToPrev">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" class="title-item" @click="changeTitle(index)" :class="{active: currentIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },

  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },

  methods: {
    changeTitle(index) {
      this.currentIndex = index
    },

    backToPrev() {
      // this.$router.back()
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 13px;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    width: 20px;
    height: 20px;
    margin-top: 12px;
  }
</style>