<template>
  <ul class="yn-ul" ref="yn-ul" @mousemove.capture="showEl" @mouseleave="hideEl" >
    <slot></slot>
    <span class="yn-label" ref="yn-label"></span>
  </ul>
</template>

<script>
  export default {
    data () {
      return {}
    },
    methods: {
      showEl (e) {
        let s = e.clientX || e.pageX
        let x = 0
        let w = ''
        let h = this.$refs['yn-ul'].clientHeight - this.$refs['yn-label'].clientHeight
        for (let child of this.$refs['yn-ul'].children) {
          if (child.offsetLeft + child.offsetWidth >= s) {
            w = child.offsetWidth
            x = child.offsetLeft - this.$refs['yn-ul'].offsetLeft
            break
          }
        }
        this.$refs['yn-label'].style = `width:${w}px;left:${x}px;top:${h}px;opacity: 1`
      },
      hideEl (e) {
        this.$refs['yn-label'].style.width = '0'
        this.$refs['yn-label'].style.opacity = '0'
      }
    }
  }
</script>

<style scoped>
  .yn-label{
    height: 2px;
    background: #dfb741;
    position: relative;
    -webkit-transition: all .2s;
    display: block;
    opacity: 0;
    width: 0;
  }
</style>
