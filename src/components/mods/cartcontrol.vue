<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!--阻止冒泡 事件.stop-->
    <div class="cart-add" @click.stop="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {mapMutations, mapState} from 'vuex'
  export default {
    props: ['food'],
    data () {
      return {

      }
    },
    methods: {
      ...mapMutations([
        'vxaddCart',
        'vxdecrease'
      ]),
      addCart (event) {
//        _constructed滚动插件添加的
        if (!event._constructed) {
          return false
        }
        if (typeof this.food.count === 'undefined') {
          Vue.set(this.food, 'count', 0)
          Vue.set(this.food, 'active', true)
        }
        this.food.count++
        if (this.food.active) {
          this.vxaddCart(this.food)
          this.food.active = false
          console.log(this.vxfood)
        }
      },
      decrease (event) {
        if (!event._constructed) {
          return false
        }
        this.food.count--
        if (this.food.count === 0) {
          this.decrease(this.food)
        }
      }
    },
    computed: {
      ...mapState([
        'vxfood'
      ])
    }
  }
</script>
