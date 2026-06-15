import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import ShoppingBasket from '../views/ShoppingBasket.vue'
import Product from '../views/Product.vue'

const routes = [
  {
    path: '/',
    name: 'Home', 
    component: Home
  },
  {
    path: '/basket',
    name: 'Basket',
    component: ShoppingBasket
  },
  {
    path: '/products',
    name: 'Product',
    component: Product
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
