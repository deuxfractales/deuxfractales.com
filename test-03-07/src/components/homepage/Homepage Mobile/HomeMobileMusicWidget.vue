<template>
  <div>
    <vue-p5 ref="p5" class="p5" :style="p5Style" @setup="setup"></vue-p5>
    <div class="beatinfo">
      <div class="mobile-beattitle">{{ product.name }}</div>
      <div class="div-block">

        <div class="mobile-beatartist">Artist{{ product.artist }}</div>
        <div class="mobile-beatgenre">{{ product.genre }}</div>
      </div>
      <div class="p5waveform">
        <audio ref="mediaPlayer" crossorigin="anonymous" controls="true" :src="product.url">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>

      <!-- previous style: id=w-node-1f91bc0acfe7-edd6561dNeed -->
      <button id v-on:click="playPause" class="mobile-playButton">Play/Pause</button>

      <div class="mobile-buyprice">
        <a class="mobile-buybutton">BUY $150</a>
      </div>
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import vuex from '../../../mixins/vuex';
import audioPlayback from '../../../mixins/audioPlayback';
import p5 from '../../../mixins/p5';

export default {
  name: 'HomeMusicWidget',
  props: [
    'product'
  ],
  components: {
    'vue-p5': VueP5,
  },
  data: function () {
    return {
      p5: undefined,
      points: undefined,
      rgb: { 'r': 10, 'g': 100, 'b': 200 },
      p5Style: { 'background-color': 'rgb(0,0,0)' }
    };
  },
  mixins: [vuex, audioPlayback, p5],
  
  created: function() {
  },

  methods: {
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


<style>
@media only screen and (max-width: 600px) {
  audio {
    width: 100%;
    align-self: end;
  }
  .p5waveform {
    position: absolute;
    float: left;
    height: auto;
    width: 65%;
    bottom: 8px;
    left: 3px;
  }
  .beatinfo {
    width: 100%;
  }
  .mobile-beattitle {
    position: absolute;
    height: auto;
    width: auto;
    left: 3px;
    padding-left: 2px;
    font-family: Arial, sans-serif;
    color: pink;
    font-size: 30px;
    line-height: 45px;
    font-weight: 700;
  }
  .mobile-beatgenre {
    position: absolute;
    font-family: Poppins, sans-serif;
    font-size: 20px;
    right: 3px;
    padding: 10px;
    color: pink;
  }
  .mobile-beatartist {
    position: absolute;
    font-family: Poppins, sans-serif;
    font-size: 20px;
    right: 40%;
    display: block;
    color: #ffc0cb;
    line-height: 45px;
  }
  .mobile-buyprice {
    background-color: #54426b;
    font-family: Poppins, sans-serif;
    color: #fffcf7;
    font-size: 25px;
    text-align: center;
    position: absolute;
    bottom: 8px;
    right: 3px;
    height: 17%;
    width: 32%;
    cursor: pointer;
  }
  .mobile-playButton {
    position: absolute;
    bottom: 80px;
    height: 17%;
    width: 32%;
    right: 4px;
    color: #fff;
    background-color: green;
    cursor: pointer;
  }
  .mobile-buybutton {
    background-color: purple;
    border: none;
    color: #fff;
    padding: 15px 32px;
    padding-right: 25px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  }
  .div-block {
    height: 100%;
  }

}
</style>
