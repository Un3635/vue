<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="block positive" :class="{'active': d_selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active': d_selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active': d_selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch" :class="{on:d_onlyContent}" @click="totalCount($event)">
      <span class="icon-ok-sign"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  data() {
    return {
      d_selectType: this.selectType, // ①创建props属性selectType的副本--d_selectType
      d_onlyContent: this.onlyContent
    }
  },
  watch: {
    selectType(type) {
      this.d_selectType = type // ②监听外部对props属性selectType的变更，并同步到组件内的data属性d_selecType中
    },
    onlyContent(T) {
      this.d_onlyContent = T
    },
    d_selectType(type) {
      this.$emit('onSelectType', type)
    },
    d_onlyContent(T) {
      this.$emit('onOnlyContent', T)
    }
  },
  methods: {
    select(type, event) {
      this.d_selectType = type
    },
    totalCount(event) {
      this.d_onlyContent = !this.d_onlyContent
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negative() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .ratingSelect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0px
      .block
        display: inline-block
        padding: 8px 12px
        line-height: 16px
        margin-right: 8px
        border-radius: 1px
        font-size: 12px
        color: rgb(77,85,93)
        &.active
          color: #ffffff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive
          background: rgba(0, 160, 220,0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      font-size: 0px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      &.on
        .icon-ok-sign
          color: #00c850
      & > span
        display: inline-block
        vertical-align: top
      .icon-ok-sign
        margin-right: 4px
        font-size: 24px
      .text
        font-size:12px
</style>
