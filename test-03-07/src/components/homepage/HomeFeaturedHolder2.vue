<template>
  <div class="holder2">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 2"
      :key="product.id"
      :ref="product.id"

      :id="product.id"
      :k="product.k"
      :d="product.d"
      :currentlyPlaying="playingId"
      :setCurrentlyPlaying="setCurrentlyPlaying"
      :product="product"

      class="beat"
      beatInfo="featuredSlot2_beatInfo"
      beatTitle="featuredSlot2_beatTitle"
      beatGenre="featuredSlot2_beatGenre"
      beatArtist="featuredSlot2_beatArtist"
      beatPrice="featuredSlot2_beatPrice"
      beatPlay="featuredSlot2_beatPlay"
    />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import HomeMusicWidget from './HomeMusicWidget.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'HomeFeaturedHolder2',
  components: {
    HomeMusicWidget: HomeMusicWidget,
  },
  computed: {
  ...mapGetters ({
      filteredProducts:'homepageFilteredProducts'
    })
  },
};
</script>

<style>
.holder2 {
  display: grid;
  overflow-x: scroll;
  overflow-y: hidden;
  grid-template-rows: 100%;
  grid-gap: 10px;
  margin-top: 3px;
  grid-auto-columns: 35%;
  grid-auto-flow: column;
}

.beat {
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
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

/* FeaturedSlot 2 Styles */

.featuredSlot2_beatInfo {
  background-color: #A8DADC;
  position: relative;
  z-index: 3;
  width: 70%;
  height: 58%;
}
.featuredSlot2_beatTitle {
  height: 20%;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
}
.featuredSlot2_beatGenre {
  display: none;
}
.featuredSlot2_beatArtist {
  display: none;
}
.featuredSlot2_beatPrice {
  left: 15%;
  margin-top: 10px;

  position: absolute;
  height: 53%;

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
.featuredSlot2_beatPlay {
  right: 15%;
  margin-top: 10px;

  height: 53%;

  border: none;
  background-color: white;
  
  position: absolute;
  width: 30%;
  background-image: url('../../assets/images/play-button.svg');
  background-position: 50% 50%;
  background-size: 45%;
  background-repeat: no-repeat;
  display: inline-block;
}

</style>
