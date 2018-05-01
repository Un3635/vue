<template>
  <div class="header">
      <div class="content-wrapper">
          <div class="avatar">
            <img width="64" height="64" :src="seller.avatar">
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
            <div v-if="seller.supports" class="supports">
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
            <div v-if="seller.supports" class="supports-count" @click="showDetail()">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-angle-right"></i>
            </div>
          </div>
      </div>
      <div v-if="seller.bulletin" class="bulletin-wrapper" @click="showDetail()">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-angle-right"></i>
      </div>
      <div class="content-background">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
                <div class="name">{{seller.name}}</div>
                <div class="start-wrapper">
                    <star :size="48" :score="seller.score"></star>
                </div>
                <div class="title-wrapper">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
              </div>
              <ul class="supports-wrapper">
                <li v-for="item in seller.supports" :key="item.key" class="supports-item">
                  <span class="icon" :class="classMap[item.type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title-wrapper">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
              </div>
              <div class="bulletin">
                <span class="content">{{seller.bulletin}}</span>
              </div>
            </div>
          </div>
          <div class="detail-close" @click="hideDetail">
            <i class="icon-remove"></i>
          </div>
      </div>
      </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'

  .header
    position: relative
    width: 100%
    color: #fff
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      background: rgba(7,17,27,0.5)
      .avatar
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        .title
          margin: 2px 0 8px 16px
          & > span
            display: inline-block
          .brand
            vertical-align: top
            width: 30px
            height: 18px
            bg-image(30px,18px,'brand')
          .name
            font-size: 16px
            margin-left: 6px
            line-height: 18px
            font-weight: bold
      .description
        margin-left: 16px
        line-height: 12px
        font-size: 12px
        color: rgb(255,255,255)
      .supports
        margin:10px 0 2px 16px
        & > span
          display: inline-block
        .icon
          vertical-align:top
          width:12px
          height: 12px
          margin-right: 4px
          &.decrease
            bg-image(12px,12px,'decrease_1')
          &.discount
            bg-image(12px,12px,'discount_1')
          &.guarantee
            bg-image(12px,12px,'guarantee_1')
          &.invoice
            bg-image(12px,12px,'invoice_1')
          &.special
            bg-image(12px,12px,'special_1')
        .text
          line-height: 12px
          font-size: 10px
      .supports-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0,0,0,0.2)
        text-align: center
        .count
          font-size: 10px
        .icon-angle-right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      padding: 0 22px 0 12px
      height:28px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7,17,27,0.6)
      .bulletin-title
        display: inline-block
        margin-right: 4px
        margin-top: 8px
        vertical-align: top
        width: 22px
        height: 12px
        bg-image(22px,12px,'bulletin')
      .bulletin-text
        margin-right: 4px
        line-height: 28px
        vertical-align: top
        font-size: 10px
      .icon-angle-right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .content-background
        position: absolute
        left: 0px
        top: 0px
        width: 100%
        height: 100%
        z-index: -1
        filter: 10px
    .detail
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      overflow: auto
      filter: 10px
      background: rgba(7,17,27,0.8)
      transition: all 0.5s
      backdrop-filter: blur(10px)
      z-index: 999
      &.fade-enter-active,&.fade-leave-active
        opacity: 1
      &.fade-enter,&.fade-leave-to
        opacity: 0
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            line-height: 16px
            font-weight: 700
            font-size: 16px
            text-align: center
          .start-wrapper
            margin: 16px auto 0px auto
            text-align: center
          .title-wrapper
            display: flex
            width: 80%
            margin:28px auto 24px auto
            .line
              position: relative
              flex: 1
              top: -7px
              border-bottom: 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding: 0 12px
              height: 14px
              line-height: 14px
              font-weight: 700
              font-size: 14px
          .supports-wrapper
            width: 80%
            margin:0 auto
            span
              display: inline-block
            .icon
              width: 16px
              height: 16px
              margin-right: 6px
              margin-bottom: 12px
              vertical-align: top
              &.decrease
                bg-image(16px,16px,'decrease_2')
              &.discount
                bg-image(16px,16px,'discount_2')
              &.guarantee
                bg-image(16px,16px,'guarantee_2')
              &.invoice
                bg-image(16px,16px,'invoice_2')
              &.special
                bg-image(16px,16px,'special_2')
            .text
              line-height: 16px
              font-size: 12px
          .bulletin
            width: 80%
            margin:auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .detail-close
        position: relative
        font-size: 0
        margin: -64px auto 0 auto
        width: 32px
        height: 32px
        clear: both
        text-align: center;
        font-size: 20px
</style>
