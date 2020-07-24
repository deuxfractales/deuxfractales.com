const state = {
  isPlay: true,
  playerCurrentTrack: null,
  playBackTime: '00:00',
  totalTime: '00:00',
};

const getters = {
  isPlay: (state) => state.isPlay,
  playerCurrentTrack: (state) => state.playerCurrentTrack,
};

const actions = {
  playPause(context, mediaPlayer) {
    context.commit('PLAYPAUSE', mediaPlayer);
  },
  setPlayerCurrentTrack(context, track) {
    context.commit('SET_PLAYER_CURRENT_TRACK', track);
  },
};

const mutations = {
  PLAYPAUSE(state, mediaPlayer) {
    if (state.isPlay) {
      mediaPlayer.pause();
      state.isPlay = false;
    } else {
      mediaPlayer.play();
      state.isPlay = true;
    }
  },
  SET_PLAYER_CURRENT_TRACK(state, track) {
    state.playerCurrentTrack = track;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
