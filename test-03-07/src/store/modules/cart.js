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
        genre: product.genre
      };
    });
  },
  cartTotal(state, getters) {
    return getters.cartProducts.reduce(
      (total, product) => (total += 1), //product.price
      0
    );
  },
  cartSize(state) {
    return state.items.length;
  }
};
const actions = {
  addProductToCart(context, product) {
    const cartItem = context.state.items.find(item => item.id === product.id);
    if (!cartItem) {
      context.commit('pushProductToCart', product.id);
    }
  },

  deleteItem(context, id) {
    context.commit('deleteItem', id);
  },

  emptyCart(context) {
    console.log("asdasd")
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
    console.log('asdasd');
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
