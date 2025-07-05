
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import Productpage from '@/views/Productpage.vue';
import CartPage from '@/views/CartPage.vue';
import CartPayment from '@/views/CartPayment.vue';
import PaymentFinal from '@/views/PaymentFinal.vue';


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
},
{
  path:'/cart',
  name:'Cart',
component:CartPage
},
{
  path:'/payment',
  name:'payment',
component:CartPayment
}
,
{
  path:'/paymentstatus',
  name:'paymentstatus',
component:PaymentFinal
}
,


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
