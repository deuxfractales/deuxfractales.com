import axios from 'axios';

const state = {
  products: [],
  featuredProducts: [],
  search: ''
};

const getters = {
  allProducts: state => state.products,
  // featuredProducts: (state) => (f) => {
  //   return state.featuredProducts.filter(
  //     (product) => product.featuredSlot1 === f
  //   );
  // },
  featuredProducts: state => state.featuredProducts,
  search: state => state.search,
  filteredProducts(state) {
    return state.featuredProducts.filter(product => {
      return product.name.toLowerCase().includes(state.search.toLowerCase());
    });
  }
};

const actions = {
  async fetchAll({ commit }) {
    // const response = await axios.get(`http://${process.env.IP}:3001/db/all`);
    const response = await axios.get(`/db/all`);
    commit('setAll', response.data);
  },
  async fetchFeatured({ commit }) {
    // const response = await axios.get(`http://${process.env.IP}:3001/db/f1`);
    const response = await axios.get('/db/f1');
    const price = await axios.get('/db/f2');
    commit('setFeatured', response.data);
    commit('setPrice', price.data);
    console.log(response.data);
  },
  async updateSearchValue({ commit }, payload) {
    commit('updateSearchValue', payload);
  }
};

const mutations = {
  setAll: (state, products) => (state.products = products),
  setFeatured: (state, products) => (state.featuredProducts = products),
  setPrice(state, price) {
    for (let i = 0; i < state.featuredProducts.length; i++) {
      state.featuredProducts[i].pricing = price[i].price;
    }
  },
  updateSearchValue(state, payload) {
    console.log(state.search);
    state.search = payload;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
