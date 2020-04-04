const ctx = new AudioContext();
let audio;

export default {
  data: function () {
    return {
      audioSource: undefined,
      audioState: false,
    };
  },
  methods: {
    playback: function () {
      const mediaPlayer = this.$refs.mediaPlayer;
      let source = ctx.createMediaElementSource(mediaPlayer);
      let analyzerNode = ctx.createAnalyser();
      let gainNode = ctx.createGain();

      source.connect(analyzerNode);
      analyzerNode.connect(gainNode);
      gainNode.connect(ctx.destination);

      analyzerNode.fftSize = 256;
      let bufferLength = analyzerNode.frequencyBinCount;
      let dataArray = new Uint8Array(bufferLength);
      analyzerNode.getByteFrequencyData(dataArray);

      if (this.audioState) mediaPlayer.pause();
      else {
        mediaPlayer.play();
      }

      this.audioState = !this.audioState;

      for (let i = 0; i < bufferLength; i++) {
        let barHeight = dataArray[i];
        console.log(barHeight);
      }
    },
    playPause: function (event) {
      if (event) {
        this.playback();
      }
    },
  },
};
