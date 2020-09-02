<template>
  <div class="container">
    <div class="player">
      <!-- playback time -->
      <p>{{ currentTime }} / {{ duration }}</p>

      <!-- progress bar -->
      <div ref="seekBar" id="seek-bar" :disabled="!loaded">
        <div id="fill" :style="{ width: percentage + '%' }"></div>
      </div>

      <!-- play/pause music button -->
      <div @click="playing ? pause() : play()" :disabled="!loaded">
        <div class="play"></div>
      </div>

      <!-- stop music button -->
      <div @click="stop()" :disabled="!loaded">
        <div>STOP</div>
      </div>

      <!-- loop music button -->
      <div @click="loop ? loop=false : loop=true" :disabled="!loaded">
        <div v-if="loop">UNLOOP SONG</div>
        <div v-else>LOOP SONG</div>
      </div>

      <!-- mute music button -->
      <div @click="mute()" :disabled="!loaded">
        <div v-if="!isMuted">VOLUME HIGH</div>
        <div v-else>VOLUME MUTE</div>
      </div>
    </div>
    <audio crossorigin="anonymous" id="player" ref="player" :loop="loop" :src="product.url" preload></audio>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// Format seconds to '00:00:00' format
const formatTime = (second) =>
  new Date(second * 1000).toISOString().substr(11, 8);

export default {
  name: 'Player',
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      loaded: false,
      playing: this.isPlay,
      paused: false,
      percentage: 0,
      currentTime: '00:00:00',
      audio: undefined,
      totalDuration: 0,
      loop: false,
    };
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.totalDuration) : '';
    },
    ...mapGetters('playbar', {
      product: 'playerCurrentTrack',
      isPlay: 'isPlay',
    }),
  },

  methods: {
    getClickPosition(e) {
      e = e || window.e;

      // get target element
      let target = e.target || e.srcElement;
      if (target.nodeType == 3) target = target.parentNode;
      // set initial progressbar width
      this.wrapperWidth = this.wrapperWidth || target.offsetWidth;

      // get the seek width
      let seekWidth = e.offsetX;

      // change seek position
      this.percentage = (seekWidth / this.wrapperWidth) * 100;
      this.audio.currentTime = Math.floor(
        (this.totalDuration / 100) * this.percentage
      );

      console.log(this.percentage);
      console.log(this.audio.currentTime);
      //   this.audio.currentTime
    },
    detectMouseDown(e) {
      // prevent browser from moving objects, following links etc
      e.preventDefault();

      // start listening to mouse movements
      this.$refs.seekBar.addEventListener(
        'mousemove',
        this.getClickPosition,
        false
      );
    },
    detectMouseUp(e) {
      // stop listening to mouse movements
      this.$refs.seekBar.removeEventListener(
        'mousemove',
        this.getClickPosition,
        false
      );
    },
    windowResize(e) {
      let prog = this;
      setTimeout(() => {
        prog.wrapperWidth = prog.$refs.listenTo.offsetWidth;
      }, 200);
    },

    stop() {
      this.audio.pause();
      this.paused = true;
      this.playing = false;
      this.audio.currentTime = 0;
    },

    play() {
      if (this.playing) return;
      this.audio.play().then((_) => (this.playing = true));
      this.paused = false;
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.audio.muted = this.isMuted;
      this.volumeValue = this.isMuted ? 0 : 75;
    },
    _handleLoaded: function () {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          this.audio.currentTime = 1e101;
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {};
            this.audio.currentTime = 0;
            this.totalDuration = parseInt(this.audio.duration);
            this.loaded = true;
          };
        } else {
          this.totalDuration = parseInt(this.audio.duration);
          this.loaded = true;
        }
        if (this.isPlay) this.audio.play();
      } else {
        throw new Error('Failed to load sound file');
      }
    },
    _handlePlayingUI: function (e) {
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
      this.playing = true;
    },
    _handlePlayPause: function (e) {
      if (e.type === 'play' && this.firstPlay) {
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === 'pause' &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = '00:00:00';
      }
    },
    _handleEnded() {
      this.paused = this.playing = false;
      // this.audio.currentTime = 0;
    },
    init: function () {
      this.audio.addEventListener('timeupdate', this._handlePlayingUI);
      this.audio.addEventListener('loadeddata', this._handleLoaded);
      this.audio.addEventListener('pause', this._handlePlayPause);
      this.audio.addEventListener('play', this._handlePlayPause);
      this.audio.addEventListener('ended', this._handleEnded);

      this.seekBar.addEventListener('click', this.getClickPosition, false);
      this.seekBar.addEventListener('mousedown', this.detectMouseDown, false);
      this.seekBar.addEventListener('mouseup', this.detectMouseUp, false);

      //add a listener that will listen to window resize and modify progress width accordingly
      window.addEventListener('resize', this.windowResize, false);
    },
  },
  mounted() {
    this.audio = this.$refs.player;
    this.seekBar = this.$refs.seekBar;
    this.init();
  },
  beforeDestroy() {
    this.audio.removeEventListener('timeupdate', this._handlePlayingUI);
    this.audio.removeEventListener('loadeddata', this._handleLoaded);
    this.audio.removeEventListener('pause', this._handlePlayPause);
    this.audio.removeEventListener('play', this._handlePlayPause);
    this.audio.removeEventListener('ended', this._handleEnded);

    this.seekBar.removeEventListener('click', this.getClickPosition, false);
    this.seekBar.removeEventListener('mousedown', this.detectMouseDown, false);
    this.seekBar.removeEventListener('mouseup', this.detectMouseUp, false);

    window.removeEventListener('resize', this.windowResize, false);
  },
};
</script>

<style>
.container {
  position: fixed;
  width: 100%;
  height: 50px;
  background: #f2f2f2;
  bottom: 0px;
  z-index: 2;
  padding-bottom: 50px;
}

.play {
  display: absolute;
  position: absolute;
  height: 80%;
  width: 5%;
  background-image: url('../../assets/images/play-button.svg');
  background-position: 50% 50%;
  background-size: 50%;
  background-repeat: no-repeat;
  left: 30%;
  vertical-align: middle;
  margin-bottom: 50px;
}

.pause {
}

#seek-bar {
  width: 40%;
  bottom: 0;
  background-color: #e0e0e0;
  border-radius: 3px;
  height: 10px;
  /* box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2); */
}
#fill {
  display: block;
  height: 10px;
  background-color: #659cef;
  border-radius: 3px;
}
.time {
  margin-top: 3%;
  bottom: 0;
  right: 0;
}
</style>
