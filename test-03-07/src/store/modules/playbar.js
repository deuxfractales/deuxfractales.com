const state = {
  isPlay: false,
  playerCurrentTime: 0,
  playerDuration: 0,
  playerTracks: [],
  playerCurrentTrack: null,
  playerSeeking: false,
};

const getters = {
  isPlay: (state) => state.isPlay,
  playerCurrentTime: (state) => state.playerCurrentTime,
  playerDuration: (state) => state.playerDuration,
  playerTracks: (state) => state.playerTracks,
  playerCurrentTrack: (state) => state.playerCurrentTrack,
  playerSeeking: (state) => state.playerSeeking,
};

const actions = {
  play(context) {
    context.commit('PLAY');
  },
  pause(context) {
    context.commit('PAUSE');
  },
  setPlayerCurrentTime(context, time) {
    context.commit('SET_PLAYER_CURRENT_TIME', time);
  },
  setPlayerDuration(context, time) {
    context.commit('SET_PLAYER_DURATION', time);
  },
  setPlayerTracks(context, tracks) {
    context.commit('SET_PLAYER_TRACKS', tracks);
  },
  setPlayerCurrentTrack(context, track) {
    context.commit('SET_PLAYER_CURRENT_TRACK', track);
  },
 
  setPlayerSeeking(context, track) {
    context.commit('SET_PLAYER_SEEKING', track);
  },
};

const mutations = {
  PLAY(state) {
    state.isPlay = true;
  },
  PAUSE(state) {
    state.isPlay = false;
  },
  SET_PLAYER_CURRENT_TIME(state, time) {
    state.playerCurrentTime = time;
  },
  SET_PLAYER_DURATION(state, time) {
    state.playerDuration = time;
  },
  SET_PLAYER_TRACKS(state, tracks) {
    state.playerTracks = tracks;
  },
  SET_PLAYER_CURRENT_TRACK(state, track) {
    state.playerCurrentTrack = track;
  },
  SET_PLAYER_SEEKING(state, seeking) {
    state.playerSeeking = seeking;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
