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
  setTogglePlay(context) {
    context.commit('SET_TOGGLE_PLAY');
  },
  setTogglePause(context) {
    context.commit('SET_TOGGLE_PAUSE');
  },
};

const mutations = {
  SET_PLAYER_CURRENT_TRACK(state, track) {
    state.playerCurrentTrack = track;
  },
  SET_TOGGLE_PLAY(state) {
    state.isPlay = true;
    // if (state.playerCurrentTrack != null) {
      // state.isPlay = true;
    // }
      // } else {
    //   state.isPlay = false;
    //   state.isPlay = true;
    // }
  },
  SET_TOGGLE_PAUSE(state) {
    if (state.playerCurrentTrack !== null) {
      state.isPlay = false;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
