const ctx = new (window.AudioContext || window.webkitAudioContext)();

let gainNode = ctx.createGain();

export default {
  data: function () {
    return {
      audioSource: undefined,
      fftInterval: undefined,
     
    };
  },

  mounted: function () {
    const mediaPlayer = this.$refs.mediaPlayer;
    this.setMediaPlayer(mediaPlayer)

    this.analyzerNode = ctx.createAnalyser();
    this.analyzerNode.fftSize = 256;

    let source = ctx.createMediaElementSource(mediaPlayer);
    this.bufferLength = this.analyzerNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    source.connect(this.analyzerNode);
    this.analyzerNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    // for (let i = 0; i < bufferLength; i++) {
    //   let barHeight = dataArray[i];
    //   console.log(barHeight);
    // }
  },

  watch: {
    currentlyPlaying: function (playingId) {
      const mediaPlayer = this.$refs.mediaPlayer;
       
      if (playingId != this.$attrs.id) {
        mediaPlayer.pause();
      } else {
        mediaPlayer.play(); 
      }

      this.setCurrentlyPlaying(this.currentlyPlaying)
    }
  },

  methods: {
    playback: function () {
      const mediaPlayer = this.$refs.mediaPlayer;

      if (this.currentlyPlaying != this.$attrs.id) {
        mediaPlayer.play();
        this.currentlyPlaying = this.$attrs.id; 
      } else {
        mediaPlayer.pause();
        this.currentlyPlaying = null;
      }
      
      this.setCurrentlyPlaying(this.currentlyPlaying)
    },

    playPause: function (event) {
      if (event) {
        this.playback(event.target.getAttribute('tag'));
        
      }
    },
    getFftData: function () {
      if(this.audioState) {
        this.analyzerNode.getByteFrequencyData(this.dataArray);
        const colorFrom = this.dataArray[7]
        this.rgb.r = colorFrom
      }
    },
  },
};
