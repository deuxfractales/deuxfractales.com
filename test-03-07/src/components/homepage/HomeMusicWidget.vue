<template>
  <div>
    <vue-p5 ref="p5" class="p5" :style="p5Style" @setup="setup"></vue-p5>
    <div class="beatinfo">
      <div class="beattitle">{{ $attrs.id }}{{ product.name }}</div>
    
      <div id="w-node-e9c14a1e787a-edd6561d" class="div-block">
        <div class="beatgenre">{{ product.genre }}</div>
        <!--CHANGE TO beatArtist on next css import, needs to be changed in webflow as well-->
        <div class="beattags">{{ product.artist }}</div>
        
      </div>
      <div id="w-node-7b98ada7c7b9-edd6561d" class="p5waveform">    
      </div>
      <div id="w-node-8a1d5bef07c2-edd6561d" class="buyprice">BUY $150</div>
      <!--Need to change buyText to playButton, it's already changed in webflow but needs to be changed here during the next css import-->
      <button
        id="w-node-1f91bc0acfe7-edd6561d"
        v-on:click="playPause"
        class="buytext"
      ></button>
      <ProgressBar v-on:setMediaPlayer="setMediaPlayer($event)" :product="product" :mediaPlayer="mediaPlayer" :currentlyPlaying="currentlyPlaying" :beatDurationAvailable="beatDurationAvailable" />
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import vuex from '../../mixins/vuex';
import audioPlayback from '../../mixins/audioPlayback';
import p5 from '../../mixins/p5';
import ProgressBar from './ProgressBar';

export default {
  name: 'HomeMusicWidget',
  props: [
    'product',
    'currentlyPlaying',
    'setCurrentlyPlaying'
    
  ],
  components: {
    'vue-p5': VueP5,
    'ProgressBar':ProgressBar
  },
  data: function () {
    return {
      p5: undefined,
      points: undefined,
      rgb: { 'r': 10, 'g': 100, 'b': 200 },
      p5Style: { 'background-color': 'rgb(0,0,0)' },
      beatDurationAvailable:false
      

    };
  },
  mixins: [vuex, audioPlayback, p5],

  created: function() {
  },

  methods: {
      setMediaPlayer: function(currentMediaPlayer) {
      this.$refs.mediaPlayer = currentMediaPlayer;
      this.beatDurationAvailable = true; //used to trigger setDuration method in ProgressBar component
    },
    setPoints: function(points) {
      this.points = points
      this.renderPoints()
      window.requestAnimationFrame(this.drawPoints)
    },
    renderPoints: function(points) {
      
      const { r,g,b } = this.rgb
      const sketch = this.p5;

      sketch.background(220);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.clear()

      sketch.fill(sketch.color(r,g,b))

      sketch.rect(-sketch.width,-sketch.height,sketch.width*2, sketch.height*2)

      sketch.erase();

      sketch.stroke(255);
      sketch.strokeWeight(2);
      sketch.beginShape();
      sketch.vertex(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
      this.points.forEach((point) => {
        sketch.vertex(point.x, point.y);
      });
      sketch.endShape(close);

      sketch.noErase()

      sketch.noFill();
      sketch.stroke(255);
      sketch.strokeWeight(1);
      sketch.beginShape();
      sketch.vertex(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
      this.points.forEach((point) => {
        sketch.vertex(point.x, point.y);
      });
      sketch.endShape(close);
    },
    drawPoints: function() {
      this.getFftData()
      this.p5Style['background-color'] = `rgb(${this.rgb.r}, 0, 0)`
      window.requestAnimationFrame(this.drawPoints)
    }
  }
};
</script>

<style scoped>
audio {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  align-self: end;
}
.p5waveform {
  display: flex;
}
</style>
