<template>
    <div class="start" :class="startType">
        <span class="star-item" v-for="itemClass in itemClasses" :class="itemClass" :key="itemClass.index"></span>
    </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    startType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let results = []
      let score = Math.floor(this.score * 2) / 2
      let isHalf = score % 1 !== 0
      let onCount = Math.floor(score)
      for (let i = 0; i < onCount; i++) {
        results.push(CLS_ON)
      }
      if (isHalf) {
        results.push(CLS_HALF)
      }
      while (results.length < LENGTH) {
        results.push(CLS_OFF)
      }
      return results
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .start
    display:inline-block
    font-size: 0
    .star-item
      display:inline-block
      background-repeat: no-repeat
  .star-48
    .star-item
      margin-right: 22px
      width: 20px
      height: 20px
    &:last-child
      margin-right: 0
    .on
      bg-image(20px,20px,'star48_on')
    .half
      bg-image(20px,20px,'star48_half')
    .off
      bg-image(20px,20px,'star48_off')
  .star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
    &:last-child
      margin-right: 0
    .on
      bg-image(15px,15px,'star36_on')
    .half
      bg-image(15px,15px,'star36_half')
    .off
      bg-image(15px,15px,'star36_off')
  .star-24
    .star-item
      margin-right: 3px
      width: 10px
      height: 10px
    &:last-child
      margin-right: 0
    .on
      bg-image(10px,10px,'star36_on')
    .half
      bg-image(10px,10px,'star36_half')
    .off
      bg-image(10px,10px,'star36_off')
</style>
