<template>
  <transition name="move">
    <div ref="detailWrapper" class="detailWrapper" v-show="showD">
      <div class="foodDetail">
        <div class="back" @click="showD = !showD">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="foodinfo.image" height="425px" width="100%">
        <div class="info">
          <div class="title">{{foodinfo.name}}</div>
          <div class="desc">
            <span>月售{{foodinfo.sellCount}}</span>
            <span>好评率{{foodinfo.rating}}</span>
          </div>
          <div class="price">￥{{foodinfo.price}}</div>
          <transition name="fade">
            <div v-show="foodinfo.count === 0 || foodinfo.count === undefined" class="shopCart" @click="add($event)">
              <div class="text">加入购物车</div>
            </div>
          </transition>
          <cartcontrol ref="cartcontrol" :food="foodinfo"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="conten">{{foodinfo.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <span @click="classifyclick(item)" class="item" :class="{'active': item.active, 'bad': index === 2, 'badActive': index === 2&&item.active}" v-for="(item, index) in classify">
              {{item.name}}
              <span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch">
            <span class="icon-check_circle" :class="{'on': flag}" @click="ar()"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in commonts">
                <div class="userInfo">
                  <div class="time">{{item.rateTime}}</div>
                  <div class="user">
                    <span>{{item.rateTime}}</span>
                    <span class="avatar"><img :src="item.avatar" width="12px" height="12px" alt=""></span>
                  </div>
                </div>
                <div class="content">
                  <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="text">{{item.text}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import Scroll from 'better-scroll'
  import cartcontrol from './cartcontrol.vue'
  export default {
    props: ['foodinfo'],
    data () {
      return {
        showD: false,
        classify: [
          {name: '全部', count: 0, commont: [], active: true},
          {name: '推荐', count: 0, commont: [], active: false},
          {name: '吐槽', count: 0, commont: [], active: false}
        ],
        commtons: [],
        flag: true
      }
    },
    mounted () {

    },
    methods: {
      showfin () {
//        if (!this.scc) {
//          this.$nextTick(() => {
//            this.scc = new Scroll(this.$refs['detailWrapper'], {click: true})
//          })
//        } else {
//          this.scc.refresh()
//        }
        this.showD = true
//        等DOM更新完在循环
        this.$nextTick(() => {
          this.commtons = this.foodinfo.ratings
          this.foodinfo.ratings.forEach(val => {
            this.classify[0].count++
            this.classify[0].commont.push(val)
            if (val.rateType) {
              this.classify[2].count++
              this.classify[2].commont.push(val)
            } else {
              this.classify[1].count++
              this.classify[1].commont.push(val)
            }
          })
          this.$nextTick(() => {
            if (!this.cs) {
              this.cs = new Scroll(this.$refs['detailWrapper'], {
                click: true
              })
            } else {
              this.cs.refresh()
            }
          })
        })
      },
      add (event) {
        this.$refs['cartcontrol'].addCart(event)
      },
      classifyclick (item) {
        this.commtons = item.commont
        this.classify.forEach(val => {
          val.active = false
        })
        item.active = true
      },
      ar () {
        this.flag = !this.flag
        this.$nextTick(() => {
          this.scc.refresh()
        })
      },
      uptades  () {
        this.$nextTick(() => {
          this.scc.refresh()
        })
      }
    },
    computed: {
      commonts () {
//        1先注册先$nextTick  2DOM更新完 ，3在执行 回掉函数
        this.uptades()
        let arr = []
        if (this.flag) {
          this.commtons.forEach(val => {
            if (val.text.length > 0) {
              arr.push(val)
            }
          })
          return arr
        } else {
//          看全部评价
          return this.commtons
        }
      }
    },
    components: {
      cartcontrol
    }
  }
</script>
