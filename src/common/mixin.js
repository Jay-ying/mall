import {debounce} from './utils';
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
     this.refresh = debounce(this.$refs.scroll.refresh, 500)

     this.itemImageListener = () => {
       this.refresh()
     }

     this.$bus.$on("itemImageLoad", this.itemImageListener)
    //  console.log('我是混入中的内容')
  }
}

// 回到顶部的代码抽取到混入
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // contentScroll(position) {
    //   this.isShowBackTop = (-position.y) > 1000
    // },
    backTopClick() {
      // console.log('返回顶部')
      this.$refs.scroll.scrollTo(0, 0, 100)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}