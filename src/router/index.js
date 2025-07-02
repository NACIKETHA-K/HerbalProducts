
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Productpage from '@/views/Productpage.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component:HomePage
  },
  {
    path:'/product',
    name: 'product',
    component:Productpage
  },
  {
  path: '/product/:name',
  name: 'ProductDetail',
  component: () => import('@/views/ProductDetail.vue') // adjust path as needed
}


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
