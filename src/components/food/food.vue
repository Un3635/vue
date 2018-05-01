<template>
  <transition name="tFood">
     <div v-show="showFlag" class="food" ref="listContent">
       <div class="food-content">
         <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide"><i class="icon-chevron-left"></i></div>
         </div>
         <div class="content">
           <h1 class="title">{{food.name}}</h1>
           <div class="detail">
             <span class="sellCount">月售{{food.sellCount}}分</span>
             <span class="rating">好评率{{food.rating}}分</span>
           </div>
            <div class="price">
                <span>￥{{food.price}}</span>
                <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food" @cart-add="add"></cartcontrol>
            </div>
            <div class="buy" v-show="!food.count" @click="addFirst">加入购物车</div>
         </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @onSelectType="selectTypeChange" @onOnlyContent="onlyContentChange"></ratingSelect>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" :key="rating.index" class="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12px" height="12px" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <div class="text">
                <span :class="{'icon-thumbs-up': rating.rateType===0,'icon-thumbs-down':rating.rateType===1}"></span>{{rating.text}}
              </div>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
     </div>
    </div>
  </transition>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import BScroll from 'better-scroll'
import {formatDate} from '@/common/js/date'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingSelect from '@/components/ratingSelect/ratingSelect'

const ALL = 2
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      onlyContent: true,
      selectType: ALL,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show() {
      this.showFlag = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.listContent, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide() {
      this.showFlag = false
    },
    addFirst(event) {
      this.$emit('cart-add', event.target)
      Vue.set(this.food, 'count', 1)
    },
    add() {
      this.$emit('cart-add', event.target)
    },
    selectTypeChange(type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    onlyContentChange(T) {
      this.onlyContent = T
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    cartcontrol,
    split,
    ratingSelect
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
  .food
    position: absolute
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    background:#fff
    z-index: 45
    overflow: hidden
    &.tFood-enter-active,&.tFood-leave-active
      transition: all 0.2s
      transform: translate3d(0,0,0)
    &.tFood-enter,&.tFood-leave-to
      transform: translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        left: 0
        top: 10px
        .icon-chevron-left
          display: block
          padding: 10px
          font-size: 20px
          color: #ffffff
    .content
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        height: 10px
        line-height: 10px
        font-size: 0
        .sellCount,.rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sellCount
          margin-right: 12px
       .price
          margin-top:3px
          height: 24px
          line-height: 24px
          font-weight: 700
          & > span:first-child
            margin-right: 8px
            font-size: 14px
            color: rgb(240,20,20)
          & > span:last-child
            font-size: 20px
            text-decoration: line-through
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        height: 24px
        line-height: 24px
        padding: 0 12px
        font-size: 10px
        box-sizing: border-box
        border-radius: 12px
        color: #ffffff
        background: rgb(0,160,220)
        z-index: 10
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color:rgb(7, 17, 27)
    .text
      line-height: 24px
      margin: 0 8px
      font-size: 12px
      color: rgb(77, 85, 93)
  .rating
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      font-size: 14px
      color:rgb(7, 17, 27)
    .rating-wrapper
      padding: 0 18px
      .rating-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position: absolute
          right: 0
          top: 16px
          line-height: 12px
          font-size: 0
          .name
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size: 10px
            color: rgb(127, 153, 159)
          .avatar
            border-radius: 50%
        .time
          margin-bottom: 6px
          line-height: 12px
          font-size: 10px
          color: rgb(127, 153, 159)
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
          .icon-thumbs-up, .icon-thumbs-down
            margin-right: 4px
            line-height: 16px
            font-size: 12px
          .icon-thumbs-up
            color: rgb(0, 160, 220)
          .icon-thumbs-down
            color: rgb(127, 153, 159)
      .no-rating
        padding:  16px 0
        font-size: 12px
        color: rgb(147, 153, 159)
</style>
