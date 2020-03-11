<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scope>
  .check-button {
    /* background-color: #aaa; */
    border-radius: 50%;
    border: 2px solid #aaa;
  }

  .check {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>