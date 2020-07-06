const state = {
  items: []
};
const getters = {
  cartProducts(state, getters, rootState, rootGetters) {
    return state.items.map(cartItem => {
      const product = rootState.products.featuredProducts.find(
        product => product.id === cartItem.id
      );
      return {
        name: product.name,
        genre: product.genre,
        price: product.pricing
      };
    });
  },
  cartTotal(state, getters) {
    return getters.cartProducts.reduce(
      (total, product) => (total += parseInt(product.price)),
      0
    );
  },

  cartSize(state) {
    return state.items.length;
  }
};
const actions = {
  async addProductToCart(context, product) {
    const cartItem = context.state.items.find(item => item.id === product.id);
    if (!cartItem) {
      context.commit('pushProductToCart', product.id);
    }
  },

  async deleteItem(context, id) {
    context.commit('deleteItem', id);
  },

  async emptyCart(context) {
    context.commit('emptyCart');
  }
};
const mutations = {
  pushProductToCart(state, productID) {
    state.items.push({
      id: productID
    });
  },

  deleteItem(state, id) {
    const cartItemIndex = state.items.findIndex(item => item.id === id);
    state.items.splice(cartItemIndex, 1);
  },

  emptyCart(state) {
    state.items = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
