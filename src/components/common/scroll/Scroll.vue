<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 当滚动标签里面含有div类似的标签拥有点击事件的时候，必须设置该属性，点击才有效果
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    console.log(this.scroll);
    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // console.log(position)
        this.$emit("scrollPosition", position);
      });
    }

    // 3.监听滚动到底部，然后执行上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('上拉加载更多')
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 封装监听滑动的x,y坐标
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    // 封装点击第一次加载更多后，必须执行的函数才能完成第二次加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 封装请求数据后刷新scroll，使他重新计算滚动距离，避免卡在第一次计算的位置不动
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("refresh函数被调用了");
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
};
</script>

<style scoped>
</style>