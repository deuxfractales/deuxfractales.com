<template>
  <div class="holder3">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 3"
      :key="product.id"
      :ref="product.id"
      :product="product"

      class="beat"
      
      beatinfo="beatinfo"
      beattitle="beattitle"
      beatgenre="beatgenre"
      beatartist="beatartist"
      buyprice="buyprice"
      buytext="buytext"
    />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import HomeMusicWidget from './HomeMusicWidget.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'HomeFeaturedHolder3',
  components: {
    HomeMusicWidget: HomeMusicWidget,
  },
  mixins: [vuex],
    computed: {
    ...mapGetters ({
        filteredProducts:'homepageFilteredProducts'
      })
  },
  
};
</script>

<style scoped>
.holder3 {
  width: 100%;
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 4%;
  grid-column-gap: 0.5%;
  grid-template-rows: 15vh 15vh;
}
.beat {
  background-color: aquamarine;
  position: relative;
}
</style>
