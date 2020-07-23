import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import cart from './modules/cart';
import filter from './modules/filter';
import playbar from './modules/playbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart,
    products,
    filter,
    playbar,
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {},
});
