<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   },
  // },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
      show(message="添加商品成功", duration=1500) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        }, duration)
      }
    }
}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    padding: 10px 12px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
  }
</style>