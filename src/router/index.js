import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
Vue.use(Router)
Vue.use(VueResource)

const routes = [
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
]
const router = new Router({
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})
export default router
