import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Upload from '../views/Upload';
import HomepageMobile from '../views/HomepageMobile';
import ShoppingCart from '../views/ShoppingCart';
import Checkout from '../views/Checkout';
import Confirmation from '../views/Confirmation';
import BeatDetails from '../views/BeatDetail';
import ProducerDetails from '../views/ProducerDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  },
  {
    path: 'beats/:name/',
    name: 'beatDetails',
    component: BeatDetails,
    props: true,
  },
  {
    path: 'producers/:name/',
    name: 'producerDetails',
    component: ProducerDetails,
    props: true,
  },
  {
    path: '/homepageMobile',
    name: 'HomepageMobile',
    component: HomepageMobile,
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppingCart,
  },
  {
    path: '/cart/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/cart/confirmation',
    name: 'Confirmation',
    component: Confirmation,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
