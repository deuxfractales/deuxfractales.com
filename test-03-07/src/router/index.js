import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Beats from '../views/Beats'
import Upload from '../views/Upload';
import HomepageMobile from '../views/HomepageMobile';
import ShoppingCart from '../views/ShoppingCart'
import Checkout from '../views/Checkout'
import Confirmation from '../views/Confirmation'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/beats',
    name: 'Beats',
    component: Beats
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/homepageMobile',
    name: 'HomepageMobile',
    component: HomepageMobile
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/cart/confirmation',
    name: 'Confirmation',
    component: Confirmation
  }
];

const router = new VueRouter({
  routes
});

export default router;
