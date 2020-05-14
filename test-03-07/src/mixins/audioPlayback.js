const ctx = new (window.AudioContext || window.webkitAudioContext)();

let gainNode = ctx.createGain();
let analyzerNode = ctx.createAnalyser();
analyzerNode.fftSize = 256;
let bufferLength = analyzerNode.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);

let audio;

export default {
  data: function () {
    return {
      audioSource: undefined,
      audioState: false,
      fftInterval: undefined
    };
  },
  mounted: function () {
    const mediaPlayer = this.$refs.mediaPlayer;
    this.setMediaPlayer(mediaPlayer)
    let source = ctx.createMediaElementSource(mediaPlayer);

    source.connect(analyzerNode);
    analyzerNode.connect(gainNode);
    gainNode.connect(ctx.destination);

    // for (let i = 0; i < bufferLength; i++) {
    //   let barHeight = dataArray[i];
    //   console.log(barHeight);
    // }
  },
  methods: {
    playback: function (elementRef) {
      const mediaPlayer = this.$refs.mediaPlayer;

      if (this.audioState) {
        mediaPlayer.pause();
      } else {
        mediaPlayer.play();
      }

      this.audioState = !this.audioState;
    },
    playPause: function (event) {
      if (event) {
        this.playback(event.target.getAttribute('tag'));
      }
    },
    getFftData: function () {
      analyzerNode.getByteFrequencyData(dataArray);
      const colorFrom = dataArray[7]
      this.rgb.r = colorFrom
    },
  },
};
