<template>
  <div class="star" :class="'star-' + size">
    <span  class="star-item" :class="item" v-for="item in ster"></span>
  </div>
</template>
<script>
  export default {
    props: ['score', 'size'],
    computed: {
      ster () {
        let arr = []
        let ttar = Math.floor(this.score)
        let masil = (this.score - ttar) >= 0.5
        for (let i = 0; i < ttar; i++) {
          arr.push('on')
        }
        if (masil) {
          arr.push('half')
        }
        while (arr.length < 5) {
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>
<style>

</style>
