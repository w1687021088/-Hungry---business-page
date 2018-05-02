<template>
  <div class="header">
    <!--头部-->
    <div class="content-wrapper">
      <!--logo-->
      <div class="avater">
        <img :src="seller.avatar" width="64px" height="64px"/>
      </div>
      <!--商户名称-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name namesa">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
        <div class="supports">
          <div class="supports_desc">
            <span class="icon decrease"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <!--点击显示-->
      <div @click="show = !show" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div @click="show = !show" class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <!--隐藏显示区-->
    <transition name="fade">
      <div class="detail" v-show="show">
        <!--隐藏内容-->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <!--评分(星星)-->
            <div class="star-wrapper">
              <star :score="seller.score" :size="48"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">{{seller.youhuixx}}</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li v-for="key in seller.supports" class="support-item">
                <span class="icon" :class="icon[key.type]"></span>
                <span class="text">{{key.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">{{seller.shangjiagonggao}}</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <!--关闭图标-->
        <div class="detail-close" @click="show = !show">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from './star.vue'
  import icon from './icon.js'
  export default {
    props: ['seller'],
    data () {
      return {
        icon: icon,
        show: false
      }
    },
    components: {
      star
    }
  }
</script>
<style>
  .namesa{
    color: #00a0dc;
  }
</style>
