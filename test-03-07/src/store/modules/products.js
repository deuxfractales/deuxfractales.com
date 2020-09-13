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
    // const response = await axios.get(`http://${process.env.IP}:3001/db/all`);
    const response = await axios.get(`http://localhost:3001/api/v1/beats`);
    commit('setAll', response.data);
  },
  async fetchFeatured({ commit }) {
    // const response = await axios.get(`http://${process.env.IP}:3001/db/f1`);
    const response = await axios.get('http://localhost:3001/api/v1/beats');
    commit('setFeatured', response.data);
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
