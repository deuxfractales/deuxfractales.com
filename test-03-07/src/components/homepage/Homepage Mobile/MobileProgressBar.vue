<template>
  <div class="container">
      <div ref="seekBar" id="seek-bar" v-on:click="seekProgressBar">
        <div id="fill" :style="{ width: progress + '%' }" @mousedown="drag"></div>
      </div>
       <span class="time">{{playBackTime}}/{{totalTime}}</span>
      <audio ref="mediaPlayer" crossorigin="anonymous" :src="product.url">
        Your browser does not support the
        <code>audio</code> element.
      </audio>
  </div>
</template>
<script>

export default {
  
  name: 'MobileProgressBar',
  props: ['product','currentlyPlaying','beatDurationAvailable'],

  mounted: function () {

    this.$emit('setMediaPlayer', this.$refs.mediaPlayer); // sets the mediaplayer in HomeMusicWidget Component so audioPlayback mixin can access the mediaplayer 
 
  },

  data: function () {
    return {
      progress: 0,
      playBackTime: '00:00',
      totalTime: '00:00',
      isMouseDown: false,
    };
  },

  methods: {

   
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
      mediaPlayer.currentTime = event.offsetX * (mediaPlayer.duration / maxLayer);  
      this.updateCurrentTime();
      this.progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
    },
    seekProgressBar: function (event) {
      let mediaPlayer = this.$refs.mediaPlayer;
      let maxLayer = this.$refs.seekBar.clientWidth;
      mediaPlayer.currentTime = event.offsetX * (mediaPlayer.duration / maxLayer);
      this.updateCurrentTime();
      
      if (!this.isMouseDown) {
        this.progress = (mediaPlayer.currentTime / mediaPlayer.duration) * 100;
      }

    },
    updateProgressBar: function () {
      let mediaPlayer = this.$refs.mediaPlayer;
      if (this.currentlyPlaying == this.product.id) {
        mediaPlayer.addEventListener('timeupdate', (event) => {
           
          this.updateCurrentTime();

          if (!this.isMouseDown) {
            this.progress =(mediaPlayer.currentTime / mediaPlayer.duration) * 100;
          }
        });
      }
     
    },
    setDuration: function () {
      let mediaPlayer = this.$refs.mediaPlayer;
      mediaPlayer.addEventListener("durationchange",(event)=>{
        let totalMinute = parseInt(mediaPlayer.duration / 60) % 60;
        let totalSeconds = (mediaPlayer.duration % 60).toFixed();
        let totalTime =
          (totalMinute < 10 ? '0' + totalMinute : totalMinute) +':' +(totalSeconds < 10 ? '0' + totalSeconds : totalSeconds);
          this.totalTime = totalTime; 
      })
    },

    updateCurrentTime: function(){
      let mediaPlayer = this.$refs.mediaPlayer;
      let currentMinute = parseInt(mediaPlayer.currentTime / 60) % 60;
      let currentSeconds = (mediaPlayer.currentTime % 60).toFixed();
      let currentTime =(currentMinute < 10 ? '0' + currentMinute : currentMinute) +':' +(currentSeconds < 10 ? '0' + currentSeconds : currentSeconds);
      this.playBackTime = currentTime;
    },

  },

  watch: {
    currentlyPlaying: [
      {
        handler: 'updateProgressBar',
      },
    ],
    beatDurationAvailable: [
      {
        handler: 'setDuration',
      },
    ],
  
  }

};
</script>

<style>

.container{
  display: flex;
  grid-column:span 2;
}

#seek-bar {
  margin-top: 3%;
  width: 100%;
  background-color: #e0e0e0;
  padding: 3px;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  #fill {
  display: block;
  height: 15px;
  background-color: #659cef;
  border-radius: 3px;
  }

  .time{
  margin-top: 3%;
  }


</style>
