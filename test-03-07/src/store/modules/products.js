const state = {
  products: [
    {
      id: 1,
      title: 'product1',
      genre: 'pop',
      artist: 'the wknd',
      featuredSlot1: true,
      url: 'http://localhost:3001/beats/test1',
    },
    {
      id: 2,
      title: 'product2',
      genre: 'hip hop',
      artist: 'drake',
      featuredSlot1: true,
      url: 'http://localhost:3001/beats/test2',
    },
  ],
};
const getters = {
  allProducts: (state) => state.products,
  featuredProducts: (state) => {
    return state.products.filter((product) => product.featuredSlot1);
  },
};
const actions = {
  async fetchProducts({ commit }) {
    const response = await axios.get('http://localhost:3001/db/all');
  },
};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
