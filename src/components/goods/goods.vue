<template>
  <div>
    <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
        <ul>
            <li v-for="(item, key) of goods" :key="key" :class="{current:currentIndex === key}" >
              <span class="text border-1px" @click="selectMenu($event,key)"><iconMap class="icon" v-show="item.type>0" :type="item.type" :iconSize="3"></iconMap>{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
        <ul>
            <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
                <ul>
                    <li v-for="food in item.foods" :key="food.id" class="food-item"  @click="selectFood(food)">
                        <div class="icon">
                            <img width="57" height="57" :src="food.icon">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc" v-show="food.description">{{food.description}}</p>
                            <div class="extra">
                                <span>月售{{food.sellCount}}份</span>
                                <span>好评率{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span>￥{{food.price}}</span>
                                <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                        </div>
                       <div class="cartcontrol-wrapper">
                          <cartcontrol :food="food" @cart-add="onCartAdd"></cartcontrol>
                       </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
  </div>
    <shopCart ref="shopCart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" @cart-add="onCartAdd"></shopCart>
    <food :food="selectedFood" ref="foodDetailWrapper" @cart-add="onCartAdd"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import ShopCart from '@/components/shopCart/shopCart'
import iconMap from '@/components/iconMap/iconMap'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'
let data = require('../../../data.json')
export default{
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: data.goods,
      listHeight: [0],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initScroll().calulateHeight()
    })
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (height2 && this.scrollY >= height1 && this.scrollY < height2) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((goods) => {
        goods.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      })

      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
      return this
    },
    calulateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
      return this
    },
    selectMenu(event, index) {
      if (!event._constructed) {
        return
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook')
      let elem = foodList[index]
      this.foodScroll.scrollToElement(elem, 300)
      return this
    },
    onCartAdd(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopCart._drop(target)
      })
    },
    selectFood(food) {
      this.selectedFood = food
      this.$refs.foodDetailWrapper.show()
    }
  },
  components: {
    iconMap,
    ShopCart,
    cartcontrol,
    food
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
   .goods
    position:absolute
    display: flex
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    z-index: 40
    .menu-wrapper
      flex: 0 0 80px
      background: #f3f5f7
      color: black
      overflow: hidden
      & > ul > li
        display: table
        padding: 0 12px;
        width: 56px
        height: 54px
        line-height: 14px
        text-align: center
        &.current
          position: relative
          margin-top: 10px
          z-index: 10
          font-weight: 700
          background: #fff
          .text
            border-none()
        &:last-child > .text
          border-none()
        .text
          display: table-cell
          vertical-align: middle
          font-size: 12px
          color: rgb(147,153,159)
          border-1px(rgba(7,17,27,0.2))
          .icon
            margin-right: 2px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147,153,179)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px: rgba(7,17,27,0.1)
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          width: 80%
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc,.extra
            height: 10px
            line-height: 10px
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
            font-size: 7px
            overflow: hidden
          .extra > span:first
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
          position:absolute
          right: 0px
          bottom: 12px
</style>
