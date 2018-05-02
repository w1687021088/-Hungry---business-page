<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="item in datas.goods">
          <span class="text">
            <span class="iconMap" v-show="item.type>0" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in datas.goods" class=" food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="showinfo(food)">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px" alt="商品"/>
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}份</span>
                  <span class="rating">{{food.rating}}</span>
                  <div class="price">
                    <span class="newPrice">${{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop :food="food" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shop>
    <!--引用别的vue模板到本页中，本页可以使用引用的vue模板的任何东西-->
    <foodDetail :foodinfo="foodinfo" ref="foodDetail"></foodDetail>
    <!--<div class="shopCart"></div>-->
    <!--<div class="detailWrapper"></div>-->
  </div>
</template>
<script>
  import icon from './icon.js'
  import shop from './shop.vue'
  import foodDetail from './foodDetail.vue'
  import cartcontrol from './cartcontrol.vue'
  import Scroll from 'better-scroll'
  export default {
    props: ['datas'],
    data () {
      return {
        foodinfo: {},
        icon: icon
      }
    },
    computed: {
      food () {
        let arr = []
        this.datas.goods.forEach(goods => {
          goods.foods.forEach(foods => {
            if (foods.count > 0) {
              arr.push(foods)
            }
          })
        })
        return arr
      }
    },
    components: {
      shop,
      cartcontrol,
      foodDetail
    },
    mounted () {
      // dom更新完之后 === window.onload
      // dom更新完 => new Scroll() => ajax获取到了数据 => dom
      this.$nextTick(() => {
        this.scroll()
      })
    },
    methods: {
      scroll () {
        /* eslint-disable no-new */
        new Scroll(this.$refs['foodsWrapper'], {
          click: true
        })
        new Scroll(this.$refs['menuWrapper'], {
          click: true
        })
      },
      showinfo (val) {
        // --引用别的vue模板到本页中，本页可以使用引用的vue模板的任何东西  showD
        this.foodinfo = val
//        坑 来的，谨记：当点击一下执行showinfo函数时，执行foodDetail模板里面showfin函数
        this.$refs['foodDetail'].showfin()
      }
    }
  }
</script>
