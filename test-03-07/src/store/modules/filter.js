import axios from 'axios';
import featuredProduct from './products';

const state = {
  homepageArtists: [],
  homepageSelectedArtists: [],

  beatspageArtists: [],
  beatspageSelectedArtists: [],
};

const getters = {
  // Home page
  homepageArtists: (state) => state.homepageArtists,
  homepageSelectedArtists: (state) => state.homepageSelectedArtists,

  homepageFilteredProducts(state) {
    var featuredProducts = featuredProduct.state.featuredProducts;
    return featuredProducts.filter((product) => {
      return product.related_artist
        .toLowerCase()
        .includes(
          state.homepageSelectedArtists.map((artist) => artist.toLowerCase())
        );
    });
  },

  // Beats page
  beatspageArtists: (state) => state.beatspageArtists,
  beatspageSelectedArtists: (state) => state.beatspageSelectedArtists,

  beatspageFilteredProducts(state) {
    var featuredProducts = featuredProduct.state.featuredProducts;
    return featuredProducts.filter((product) => {
      return product.related_artist
        .toLowerCase()
        .includes(
          state.beatspageSelectedArtists.map((artist) => artist.toLowerCase())
        );
    });
  },
};

const actions = {
  async fetchArtists({ commit }) {
    const response = await axios.get('http://localhost:3001/api/v1/artists');
    commit('setArtists', response.data);
  },

  async selectArtist({ commit }, { artistName, page }) {
    commit('selectArtist', { artistName, page });
  },

  async deleteArtist({ commit }, { artistName, page }) {
    commit('deleteArtist', { artistName, page });
  },
};

const mutations = {
  // populate artsts for home and beats page
  setArtists: (state, artists) => {
    artists.map((artist) => state.homepageArtists.push(artist.artist_name));
    artists.map((artist) => state.beatspageArtists.push(artist.artist_name));
  },

  selectArtist: (state, { artistName, page }) => {
    if (page == 'beatspage') {
      state.beatspageSelectedArtists.push(artistName);
      state.beatspageArtists.splice(
        state.beatspageArtists.indexOf(artistName),
        1
      );
    } else if (page == 'homepage') {
      state.homepageSelectedArtists.push(artistName);
      state.homepageArtists.splice(
        state.homepageArtists.indexOf(artistName),
        1
      );
    }
  },

  deleteArtist(state, { artistName, page }) {
    if (page == 'beatspage') {
      state.beatspageSelectedArtists.splice(
        state.beatspageSelectedArtists.indexOf(artistName),
        1
      );
      state.beatspageArtists.push(artistName);
    } else if (page == 'homepage') {
      state.homepageSelectedArtists.splice(
        state.homepageSelectedArtists.indexOf(artistName),
        1
      );
      state.homepageArtists.push(artistName);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
