<template>
  <div class="holder2">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 2"
      :key="product.id"
      :ref="product.id"
      :product="product"

      class="beat"
      
      beatinfo="featuredSlot2_beatinfo"
      beattitle="featuredSlot2_beattitle"
      beatgenre="featuredSlot2_beatgenre"
      beatartist="featuredSlot2_beatartist"
      buyprice="featuredSlot2_buyprice"
      pauseButton="featuredSlot2_pause-button"
      audio="featuredSlot2_audio"
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

<style scoped>
.holder2 {
  display: grid;
  overflow-x: scroll;
  overflow-y: hidden;
  /* grid-template-columns: 35%; */
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

.beat > div {
  height: 100%;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  -ms-grid-rows: 35% 65%;
  grid-template-rows: 35% 65%;
}
</style>
