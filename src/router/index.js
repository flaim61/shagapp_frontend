import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import Product from '../views/Product.vue'
import User from '../views/User.vue'
import Cart from '../views/Cart.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:id',
      name: 'category',
      component: Category
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/user/',
      name: 'user',
      component: User
    },
    {
      path: '/cart/',
      name: 'cart',
      component: Cart
    },
  ]
})

export default router
