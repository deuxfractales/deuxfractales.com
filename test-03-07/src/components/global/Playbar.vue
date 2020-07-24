
<template>
  <div class="container">
    <div ref="seekBar" id="seek-bar" @click="seekProgressBar">
      <div id="fill" :style="{ width: progress + '%' }" @mousedown="drag"></div>
    </div>
    <span class="time">{{ playBackTime }}/{{ totalTime }}</span>
    <audio ref="mediaPlayer" crossorigin="anonymous" :src="product.url" autoplay preload>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
    <div class="pausePlay" @click="playPause($refs.mediaPlayer)"></div>
    <div @click="setDuration()">asd</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import audioPlayback from '../../mixins/audioPlayback';
export default {
  name: 'Player',

  computed: {
    ...mapGetters('playbar', {
      product: 'playerCurrentTrack',
      isPlay: 'isPlay',
    }),
  },

  data: function () {
    return {
      progress: 0,
      playBackTime: '00:00',
      totalTime: '00:00',
      isMouseDown: false,
      beatDurationAvailable:false

    };
  },

  methods: {
    ...mapActions('playbar', {
      playPause: 'playPause',
    }),
    updateProgressBar: function () {
      let mediaPlayer = this.$refs.mediaPlayer;
      if (this.currentlyPlaying == this.product.id) {
        mediaPlayer.addEventListener('timeupdate', (event) => {
          this.updateCurrentTime();

          if (!this.isMouseDown) {
            this.progress =
              (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
          }
        });
      }
    },
    setDuration: function () {
      let mediaPlayer = this.$refs.mediaPlayer;
      mediaPlayer.addEventListener('durationchange', (event) => {
        let totalMinute = parseInt(mediaPlayer.duration / 60) % 60;
        let totalSeconds = (mediaPlayer.duration % 60).toFixed();
        let totalTime =
          (totalMinute < 10 ? '0' + totalMinute : totalMinute) +
          ':' +
          (totalSeconds < 10 ? '0' + totalSeconds : totalSeconds);
        this.totalTime = totalTime;
      });
    },
    drag: function (event) {
      window.addEventListener('mouseup', this.stopDrag);
      this.isMouseDown = true;
      this.$refs.seekBar.addEventListener('mousemove', this.onDragEvent);
    },
    stopDrag: function (event) {
      if (this.isMouseDown) {
        this.isMouseDown = false;
        this.$refs.seekBar.removeEventListener('mousemove', this.onDragEvent);
      }
    },
    onDragEvent: function (event) {
      let mediaPlayer = this.$refs.mediaPlayer;
      let maxLayer = this.$refs.seekBar.clientWidth;
      mediaPlayer.currentTime =
        event.offsetX * (mediaPlayer.duration / maxLayer);
      this.updateCurrentTime();
      this.progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
    },
    seekProgressBar: function (event) {
      let mediaPlayer = this.$refs.mediaPlayer;
      let maxLayer = this.$refs.seekBar.clientWidth;
      mediaPlayer.currentTime =
        event.offsetX * (mediaPlayer.duration / maxLayer);
      this.updateCurrentTime();

      if (!this.isMouseDown) {
        this.progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
      }
    },

    updateCurrentTime: function () {
      let mediaPlayer = this.$refs.mediaPlayer;
      let currentMinute = parseInt(mediaPlayer.currentTime / 60) % 60;
      let currentSeconds = (mediaPlayer.currentTime % 60).toFixed();
      let currentTime =
        (currentMinute < 10 ? '0' + currentMinute : currentMinute) +
        ':' +
        (currentSeconds < 10 ? '0' + currentSeconds : currentSeconds);
      this.playBackTime = currentTime;
    },
  },

  watch: {
    product: [
      {
        handler: 'updateProgressBar',
      },
    ],
    beatDurationAvailable: [
      {
        handler: 'setDuration',
      },
    ],
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

.pausePlay {
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

#seek-bar {
  width: 100%;
  bottom: 0;
  background-color: #e0e0e0;
  padding: 3px;
  border-radius: 3px;
  height: 3px;
  /* box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2); */
}
#fill {
  display: block;
  height: 3px;
  background-color: #659cef;
  border-radius: 3px;
}
.time {
  margin-top: 3%;
  bottom: 0;
  right: 0;
}
</style>
