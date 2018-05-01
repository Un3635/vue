<template>
    <span :class="icon"></span>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    type: {
      type: Number
    },
    iconSize: {
      type: Number
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    icon() {
      return this.type >= 0 && this.classMap[this.type] + '_' + this.iconSize
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
  icon()
    display: inline-block
    width: arguments[0]
    height: arguments[1]
    bg-image(arguments[0],arguments[0],arguments[2])

  &.decrease_3
    icon(12px,12px,'decrease_3')
  &.discount_3
    icon(12px,12px,'discount_3')
  &.guarantee_3
    icon(12px,12px,'guarantee_3')
  &.invoice_3
    icon(12px,12px,'invoice_3')
  &.special_3
    icon(12px,12px,'special_3')
  &.decrease_4
    icon(16px,16px,'decrease_4')
  &.discount_4
    icon(16px,16px,'discount_4')
  &.guarantee_4
    icon(16px,16px,'guarantee_4')
  &.invoice_4
    icon(16px,16px,'invoice_4')
  &.special_4
    icon(16px,16px,'special_4')
</style>
