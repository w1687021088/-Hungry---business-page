<template>
  <div class="shopCart">
    <div @click="ShowScroll" class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo active">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="badge" v-show="totalPrice > 0">{{totalCount}}</div>
        </div>
        <!--绑定class 判断有没有值，没有值的情况下totalPrice计算出的是0 所有是false  有值时，添加class类名active-->
        <div class="price" :class="{'active': totalPrice}">${{totalPrice}}</div>
        <div class="desc">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="{'enough': totalPrice >= minPrice}">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <transition name="transHeight">
      <div v-show="totalPrice > 0 && show" class="shopcart-list">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span @click="empty()" class="empty">清空</span>
        </div>
        <div class="list-content" ref="listcontent">
          <ul>
            <li class="food" v-for="item in food">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>${{item.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Scroll from 'better-scroll'
  import cartcontrol from './cartcontrol.vue'
  export default {
    props: ['deliveryPrice', 'minPrice', 'food'],
    data () {
      return {
        show: false
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.food.forEach(food => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let acount = 0
        this.food.forEach(food => {
          acount += food.count
        })
        return acount
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `还差起步价$${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还需$${this.minPrice - this.totalPrice}元起送`
        } else if (this.totalPrice >= this.minPrice) {
          return `去结算`
        }
      }
    },
    methods: {
      empty () {
        this.food.forEach(val => {
          val.count = 0
        })
        this.show = false
      },
      ShowScroll () {
        this.show = !this.show
        if (!this.sc) {
          this.$nextTick(() => {
//          new 一个obj时必须赋值
            this.sc = new Scroll(this.$refs['listcontent'], {click: true})
          })
        } else {
//        强制计算高度
          this.sc.refresh()
        }
      }
    },
    components: {
      cartcontrol
    }
  }
//  计算属性的函数可以用来 使用  if (this.totalPrice === 0) {
//  es6语法  字符串拼接  `string${变量}string$`    es5.1  "string"+变量+"string"
</script>
