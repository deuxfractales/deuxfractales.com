const ctx = new AudioContext();

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
    };
  },
  created: function () {
    const mediaPlayer = this.$refs.mediaPlayer;
    console.log(mediaPlayer);
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
        fftDataStop();
      } else {
        setInterval(this.getFftData, 300);
        console.log(this.getFftData);
        mediaPlayer.play();
      }

      function fftDataStop() {
        clearInterval(this.getFftData);
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
      console.log(dataArray);
    },
  },
};
