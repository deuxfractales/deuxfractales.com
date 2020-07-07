<template>
  <div>
    <vue-p5 ref="p5" class="p5" :style="p5Style" @setup="setup"></vue-p5>
    <div :class="beatInfo">
      <div :class="beatTitle">{{ product.name }}</div>
      <div :class="beatGenre">{{ product.genre }}</div>
      <div :class="beatArtist">{{ product.artist }}</div>

      <!--TODO: change id to class on line 11-->
      <div
        id="w-node-8a1d5bef07c2-edd6561d"
        @click="addProductToCart(product)"
        :class="beatPrice"
      >${{ product.pricing }}</div>
      <!--TODO: change id to class on line 16-->
      <button id="w-node-1f91bc0acfe7-edd6561d" v-on:click="playPause" :class="beatPlay"></button>
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import vuex from '../../mixins/vuex';
import audioPlayback from '../../mixins/audioPlayback';
import p5 from '../../mixins/p5';
import { mapActions } from 'vuex';

export default {
  name: 'HomeMusicWidget',
  props: [
    'product',
    'currentlyPlaying',
    'setCurrentlyPlaying',
    'k',
    'd',
    'beatInfo',
    'beatTitle',
    'beatGenre',
    'beatArtist',
    'beatPrice',
    'beatPlay'
  ],
  components: {
    'vue-p5': VueP5,
  },
  data: function () {
    return {
      p5: undefined,
      points: undefined,
      rgb: { 'r': 168, 'g': 218, 'b': 220 },
      p5Style: { 'background-color': 'rgb(0,0,0)' },
      beatDurationAvailable: false,
      graphic: 'roseCurve'
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
    ...mapActions ({
      addProductToCart: 'cart/addProductToCart'
    }),
    setPoints: function(points, type) {
      this.points = points
      
      if (type == 'png')
        this.renderImage()
      else if (type == 'points')
        this.renderPoints()

      window.requestAnimationFrame(this.drawPoints)
    },
    renderImage: function() {
      const { r,g,b } = this.rgb
      const sketch = this.p5;

      sketch.background(220);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.clear()

      sketch.fill(sketch.color(r,g,b))
      sketch.rect(-sketch.width,-sketch.height,sketch.width*2, sketch.height*2)

      sketch.erase();
      sketch.noErase()
      sketch.noFill();

      const raw = new Image();
      raw.src = 'data:image/png;base64, ' + this.points;

      raw.onload = function() {
        const img = sketch.createImage(sketch.width, sketch.height);
        img.drawingContext.drawImage(raw, 0, 0);
        img.resize(sketch.width, sketch.height);
        sketch.image(img, 0, 0); // draw the image, etc here
      }
    },
    renderPoints: function() {
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
    },
    
  }
};
</script>

<style scoped>
.p5waveform {
  display: flex;
}
.p5 {
  position: absolute;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 2;
}
</style>
