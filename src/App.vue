<template>
  <div id="app">
    <vheader :seller="datas.seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :datas="datas" ref="abc"></router-view>
  </div>
</template>

<script>
  import vheader from './components/mods/header.vue'
  import axios from 'axios'
  export default {
    name: 'app',
    data () {
      return {
        datas: {
          // 商户信息
          seller: {},
          // 商品数量
          goods: [],
          // 评论
          ratings: []
        }
      }
    },
    mounted () {
      axios.get('/static/data.json').then(res => {
        this.datas.seller = res.data.seller
        this.datas.goods = res.data.goods
        this.datas.ratings = res.data.ratings
//        console.log(this.$refs.abc)
//        this.$nextTick(() => {
//          this.$refs.abc.scroll()
//        })
      })
    },
    components: {
      vheader
    }
  }
</script>

<style>
  /*
  <style scoped>
   scoped 当写上style 当前这个模板和当前模板下的所有的字模板应用这个样式
  */
  .tab .tab-item  a.router-link-exact-active {
    color: indianred;
    font-weight: bold;
  }
</style>
