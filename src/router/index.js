import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/mods/goods.vue'
import ratings from '../components/mods/ratings.vue'
import seller from '../components/mods/seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
})
