<template>
  <div>
    <!-- <vue-p5 ref="p5" class="p5" :style="p5Style" @setup="setup"></vue-p5> -->
    <div class="beatInfo">
      <div class="beatTitle">
        <!-- should acctually be: '/product.artist/' + 'product.name' -->

        <router-link
          class="productLink"
          :to="{ name: 'beatDetails', params: { name: product.name } }"
          >{{ product.name }}</router-link
        >
      </div>
      <div class="beatGenre">{{ product.genre }}</div>
      <div class="beatArtist">{{ product.producer }}</div>

      <!--TODO: change id to class on line 11-->
      <div
        id="w-node-8a1d5bef07c2-edd6561d"
        @click="addProductToCart(product)"
        class="beatPrice"
      >
        ${{ product.pricing }}
      </div>

      <div class="controls">
        <div
          v-if="isPlay && playerCurrentTrack.id === product.id"
          @click="
            setPlayerCurrentTrack(product);
            setTogglePause();
          "
          class="pause"
        ></div>
        <div
          v-else
          @click="
            setPlayerCurrentTrack(product);
            setTogglePlay();
          "
          class="play"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import vuex from '../../mixins/vuex';
import audioPlayback from '../../mixins/audioPlayback';
import p5 from '../../mixins/p5';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeMusicWidget',
  props: ['product', 'k', 'd'],
  components: {
    'vue-p5': VueP5,
  },
  data: function () {
    return {
      p5: undefined,
      points: undefined,
      rgb: { r: 168, g: 218, b: 220 },
      p5Style: { 'background-color': 'rgb(0,0,0)' },
      graphic: 'roseCurve',
    };
  },
  mixins: [vuex, audioPlayback, p5],

  created: function () {},

  computed: {
    ...mapGetters({
      isPlay: 'playbar/isPlay',
      playerCurrentTrack: 'playbar/playerCurrentTrack',
    }),
  },
  methods: {
    ...mapActions({
      addProductToCart: 'cart/addProductToCart',
      setPlayerCurrentTrack: 'playbar/setPlayerCurrentTrack',
      setTogglePlay: 'playbar/setTogglePlay',
      setTogglePause: 'playbar/setTogglePause',
    }),
    play: function () {
      console.log('asdasd');
      this.isPlay = true;
      console.log(this.isPlay);
    },

    pause: function () {
      console.log('asdasd');
      this.isPlay = false;
      console.log(this.isPlay);
    },
    setPoints: function (points, type) {
      this.points = points;

      if (type == 'png') this.renderImage();
      else if (type == 'points') this.renderPoints();

      window.requestAnimationFrame(this.drawPoints);
    },
    renderImage: function () {
      const { r, g, b } = this.rgb;
      const sketch = this.p5;

      sketch.background(220);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.clear();

      sketch.fill(sketch.color(r, g, b));
      sketch.rect(
        -sketch.width,
        -sketch.height,
        sketch.width * 2,
        sketch.height * 2
      );

      sketch.erase();
      sketch.noErase();
      sketch.noFill();

      const raw = new Image();
      raw.src = 'data:image/png;base64, ' + this.points;

      raw.onload = function () {
        const img = sketch.createImage(sketch.width, sketch.height);
        img.drawingContext.drawImage(raw, 0, 0);
        img.resize(sketch.width, sketch.height);
        sketch.image(img, 0, 0); // draw the image, etc here
      };
    },
    renderPoints: function () {
      const { r, g, b } = this.rgb;
      const sketch = this.p5;

      sketch.background(220);
      sketch.translate(sketch.width / 2, sketch.height / 2);
      sketch.clear();

      sketch.fill(sketch.color(r, g, b));

      sketch.rect(
        -sketch.width,
        -sketch.height,
        sketch.width * 2,
        sketch.height * 2
      );

      sketch.erase();

      sketch.stroke(255);
      sketch.strokeWeight(2);
      sketch.beginShape();
      sketch.vertex(
        this.points[this.points.length - 1].x,
        this.points[this.points.length - 1].y
      );
      this.points.forEach((point) => {
        sketch.vertex(point.x, point.y);
      });
      sketch.endShape(close);

      sketch.noErase();

      sketch.noFill();
      sketch.stroke(255);
      sketch.strokeWeight(1);
      sketch.beginShape();
      sketch.vertex(
        this.points[this.points.length - 1].x,
        this.points[this.points.length - 1].y
      );
      this.points.forEach((point) => {
        sketch.vertex(point.x, point.y);
      });
      sketch.endShape(close);
    },
    drawPoints: function () {
      this.getFftData();
      this.p5Style['background-color'] = `rgb(${this.rgb.r}, 0, 0)`;
      window.requestAnimationFrame(this.drawPoints);
    },
  },
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
.p5waveform {
  display: flex;
}

.h1 {
  font-size: 20px;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 3;
  font-family: Poppins, sans-serif;
  color: #f1faee;
  background-color: #e63946;
}

.beatInfo {
  background-color: white;
  width: 60%;
  height: 60%;
  position: absolute;
  z-index: 2;
  margin: 0 auto;
  position: absolute;
  top: 20%;
  left: 20%;
}
.beatTitle {
  height: 20%;
  /* width: 100%; */
  /* padding-left: 40%; */
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
}
.beatGenre {
  display: none;
}
.beatArtist {
  display: none;
}
.beatPrice {
  left: 15%;
  margin-top: 10px;

  position: absolute;
  height: 50%;

  width: 30%;
  background-color: #54426b;
  background-image: url('../../assets/images/add-to-cart.svg');
  background-position: 50% 50%;
  background-size: 45%;
  background-repeat: no-repeat;
  display: inline-block;

  /* To get rid of text */
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
}

.play {
  min-width: 100%;
  min-height: 100%;
  float: right;
  margin-bottom: 10px;

  border: none;

  position: absolute;
  background-image: url('../../assets/images/playbar/play.svg');
  background-position: 50% 50%;
  background-size: 20%;
  background-repeat: no-repeat;
  display: inline-block;
}

.pause {
  margin: 0 auto;

  width: 100%;
  height: 100%;

  border: none;

  position: absolute;
  background-image: url('../../assets/images/playbar/pause.svg');
  background-position: 50% 50%;
  background-size: 20%;
  background-repeat: no-repeat;
  display: inline-block;
}

.productLink {
  text-decoration: none;
  color: black;
}

.productLink:hover {
  color: red;
}
</style>
