const ctx = new (window.AudioContext || window.webkitAudioContext)();

let gainNode = ctx.createGain();

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
      if(this.audioState) {
        this.analyzerNode.getByteFrequencyData(this.dataArray);
        const colorFrom = this.dataArray[7]
        this.rgb.r = colorFrom
      }
    },
  },
};
