<template>
    <div class="cartControl">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="subCart">
                <span class="icon-minus-sign inner"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-plus-sign" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
    // this.$on('add', this.add)
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 这个时候 this.food.count 是增加了，但是页面的UI并没有改变
      // 因为在新增 或者某个字段的时候，需要用的vue的某个接口
      // 开发一个事件
      this.$emit('cart-add', event.target)
    },
    subCart() {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartControl
    font-size: 0
    & > div
      display: inline-block
      padding: 6px
      line-height:24px
      font-size: 24px
      color: rgb(0,160,220)
    .cart-decrease
      transition: all 0.4s linear
      &.move-enter-active, &.move-leave-active
        opacity: 1
        transform: translate3d(0, 0, 0)
        .inner
          display: inline-block
          line-height: 24px
          font-size: 24px
          color: rgb(0, 160, 220)
          transition: all 0.4s linear
          transform: rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px,0,0)
        .inner
          transform: rotate(180deg)
    .cart-count
      width: 12px
      vertical-align: top
      text-align: center
      line-height: 24px
      font-size: 10px
      color: rgb(147,153,159)
</style>
