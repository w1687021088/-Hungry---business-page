<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num">{{datas.seller.score}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">高于周边商家{{datas.seller.rankRate}}</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :score="datas.seller.serviceScore" :size="36"></star>
            <span class="num">{{datas.seller.serviceScore}}</span>
          </div>
          <div class="foodScore">
            <span class="text">商品评分</span>
            <star :score="datas.seller.serviceScore" :size="36"></star>
            <span class="num">{{datas.seller.serviceScore}}</span>
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
        <div class="classify">
          <span class="item"
            :class="{'active': item.active, 'bad': index === 2, 'badActive': item.active && index === 2}"
            @click="evel(item)"
            v-for="(item, index) in classify">
            {{item.name}}
            <span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch" @click="show = !show">
          <span class="icon-check_circle" :class="{'on': show}"></span>
          <span class="text">只看有内容的评价</span>
        </div>
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="item in comment">
              <div class="avatar">
                <img :src="item.avatar" height="28px" width="28"/>
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{item.username}}</span>
                  <span class="rateTime">{{item.rateTime}}</span>
                </div>
                <div class="star-wrapper">
                  <star :size="24" :score="item.score"></star>
                  <span class="deliveryTime">{{item.deliveryTime}}分钟到达</span>
                </div>
                <div class="text">{{item.text}}</div>
                <div class="recommend">
                  <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                  <span class="dish" v-for="dish in item.recommend">{{dish}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Scroll from 'better-scroll'
  import star from './star.vue'
  export default {
    props: ['datas'],
    data () {
      return {
        ratings: [],
        classify: [
          {name: '全部', count: 0, commont: [], active: true},
          {name: '推荐', count: 0, commont: [], active: false},
          {name: '吐槽', count: 0, commont: [], active: false}
        ],
        show: true,
        commonts: []
      }
    },
    methods: {
      evel (item) {
        this.classify.forEach(val => {
          val.active = false
        })
        item.active = true
        this.commonts = item.commont
      }
    },
    computed: {
      comment () {
        if (this.show) {
          let arr = []
          this.commonts.forEach(val => {
            if (val.text.length > 0) {
              arr.push(val)
            }
          })
          return arr
        } else {
          return this.commonts
        }
      }
    },
    mounted () {
      // mounted 是在DOM更新后 在执行
      axios.get('/static/data.json').then(res => {
        this.ratings = res.data.ratings
        this.commonts = res.data.ratings
        this.ratings.forEach(val => {
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
          this.scc = new Scroll(this.$refs['ratingsWrapper'], {click: true})
        })
      })
    },
    activated () {},
    components: {
      star
    }
  }
</script>
