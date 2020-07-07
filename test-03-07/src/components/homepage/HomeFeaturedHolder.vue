<template>
  <div class="featured-holder">
    <div class="h1">
      <!--if no artist is selected then omit the artist's name-->
      Featured *artist's name* Type Beats
    </div>
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 1"
      :key="product.id"
      :ref="product.id"

      :id="product.id"
      :k="product.k"
      :d="product.d"
      :currentlyPlaying="playingId"
      :setCurrentlyPlaying="setCurrentlyPlaying"
      :product="product"
    
      class="beatContainer"
      beatInfo="featuredSlot1_beatInfo"
      beatTitle="featuredSlot1_beatTitle"
      beatGenre="featuredSlot1_beatGenre"
      beatArtist="featuredSlot1_beatArtist"
      beatPrice="featuredSlot1_beatPrice"
      beatPlay="featuredSlot1_beatPlay"

    />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import HomeMusicWidget from './HomeMusicWidget.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'HomeFeaturedHolder',
  components: {
    HomeMusicWidget,
  },
  computed: {
    ...mapGetters ({
        filteredProducts:'homepageFilteredProducts'
      })
  },
  mixins: [vuex],
  created: async function () {
     while (this.$socket.readyState != 1) {
      console.log('Waiting');
      await new Promise((r) => setTimeout(r, 10));
    }
    const refs = this.$refs;
    this.$socket.onmessage = function (res) {
      const jsonData = JSON.parse(res.data);
      const points = jsonData.points;
      const drawTo = jsonData.id;
      refs[drawTo][0].setPoints(points, jsonData.type);
    };
  },
};
</script>

<style>

.p5waveform {
  display: flex;
}

/* FeaturedSlot 1 styles */



.featuredSlot1_beatInfo {
  position: relative;
  left: 0%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  z-index: 3;
  display: -ms-grid;
  display: grid;
  width: 100%;
  height: 100%;
  grid-auto-columns: 1fr;
  grid-column-gap: 11px;
  grid-row-gap: 0px;
  -ms-grid-columns: 2fr 1fr;
  grid-template-columns: 2fr 1fr;
  -ms-grid-rows: 66% 33%;
  grid-template-rows: 66% 33%;
}
.featuredSlot1_beatTitle {
  padding-top: 20px;
  padding-left: 20px;
  font-family: Poppins, sans-serif;
  color: #54426b;
  font-size: 30px;
  line-height: 45px;
  font-style: italic;
  font-weight: 700;
}

.featuredSlot1_beatGenre {
  display: none;
}

.featuredSlot1_beatArtist {
  display: none;
}


.featuredSlot1_beatPrice {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 50%;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-right: 1px solid #54426b;
  border-left: 1px solid #000;
  border-radius: 3px;
  background-color: #457b9d;
  font-family: Poppins, sans-serif;
  color: #fffcf7;
  font-size: 25px;
  text-align: center;
  cursor: pointer;
}

.featuredSlot1_beatPlay {

  display: flex;
  height: 50%;
  background-color: white;
  position: absolute;
  width: 100%;
  background-image: url('../../assets/images/play-button.svg');
  background-position: 50% 50%;
  background-size: 35%;
  background-repeat: no-repeat;
  display: inline-block;
}

.beatContainer {
  position: relative;
  left: 0%;
  top: 0%;
  right: auto;
  bottom: auto;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  grid-row-end: 2;
  grid-row-start: 2;

}
.h1{
  font-size: 20px;
  grid-row-start: 1;
  grid-row-end: 1;
  grid-column-start: 1;
  grid-column-end: 3;
  font-family: Poppins, sans-serif;
  color: #F1FAEE;
  background-color: #e63946;
}

.featured-holder {
  border-radius: 10px;
  display: -ms-grid;
  display: grid;
  grid-auto-columns: 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 0px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 10% 90%;
}

</style>
