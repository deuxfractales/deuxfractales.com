import axios from 'axios';

const state = {
  products: [],
  featuredProducts: [],
};

const getters = {
  allProducts: (state) => state.products,
  // featuredProducts: (state) => (f) => {
  //   return state.featuredProducts.filter(
  //     (product) => product.featuredSlot1 === f
  //   );
  // },
  featuredProducts: (state) => state.featuredProducts,
};

const actions = {
  async fetchAll({ commit }) {
    const response = await axios.get('http://localhost:3001/db/all');
    commit('setAll', response.data);
  },
  async fetchFeatured({ commit }) {
    const response = await axios.get('http://localhost:3001/db/f1');
    commit('setFeatured', response.data);
    console.log(response.data);
  },
};

const mutations = {
  setAll: (state, products) => (state.products = products),
  setFeatured: (state, products) => (state.featuredProducts = products),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
