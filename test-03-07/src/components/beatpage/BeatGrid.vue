<template>
  <div class="beatGrid">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 3"
      :key="product.id"
      :ref="product.id"
      :id="product.id"
      :k="product.k"
      :d="product.d"
      :currentlyPlaying="playingId"
      :setCurrentlyPlaying="setCurrentlyPlaying"
      :product="product"
      class="beat"
      beatInfo="featuredSlot3_beatInfo"
      beatTitle="featuredSlot3_beatTitle"
      beatGenre="featuredSlot3_beatGenre"
      beatArtist="featuredSlot3_beatArtist"
      beatPrice="featuredSlot3_beatPrice"
      beatPlay="featuredSlot3_beatPlay"
    />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import HomeMusicWidget from '../homepage/HomeMusicWidget.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'BeatGrid',
  components: {
    HomeMusicWidget: HomeMusicWidget,
  },
  computed: {
    ...mapGetters({
      filteredProducts: 'beatspageFilteredProducts',
    }),
  },
};
</script>

<style scoped>
.beatGrid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  /* auto grow rows based on search results */
  grid-template-rows: 200px 200px 200px;
  grid-gap: 10px 10px;
}
.beat {
  background-color: aquamarine;
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
}

/* FeaturedSlot 3 Styles */

.featuredSlot3_beatInfo {
  background-color: white;
  position: relative;
  z-index: 3;
  width: 70%;
  height: 58%;
}
.featuredSlot3_beatTitle {
  height: 20%;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
}
.featuredSlot3_beatGenre {
  display: none;
}
.featuredSlot3_beatArtist {
  display: none;
}
.featuredSlot3_beatPrice {
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

.featuredSlot3_beatPlay {
  right: 15%;
  margin-top: 10px;

  height: 50%;
  width: 30%;

  border: none;
  background-color: white;

  position: absolute;
  background-image: url('../../assets/images/play-button.svg');
  background-position: 50% 50%;
  background-size: 45%;
  background-repeat: no-repeat;
  display: inline-block;
}
</style>
