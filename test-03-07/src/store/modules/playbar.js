const state = {
  isPlay: false,
  playerCurrentTrack: null,
};

const getters = {
  isPlay: (state) => state.isPlay,
  playerCurrentTrack: (state) => state.playerCurrentTrack,
};

const actions = {
  setPlayerCurrentTrack(context, track) {
    context.commit('SET_PLAYER_CURRENT_TRACK', track);
  },
};

const mutations = {
  SET_PLAYER_CURRENT_TRACK(state, track) {
    state.playerCurrentTrack = track;
    state.isPlay = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
