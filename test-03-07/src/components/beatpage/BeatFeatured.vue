<template>
  <div class="beatGrid2">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 2"
      :key="product.id"
      :ref="product.id"
      class="beat"
      :product="product"
    />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import HomeMusicWidget from '../homepage/HomeMusicWidget.vue';
import { mapGetters } from 'vuex'

export default {
  name: 'HomeFeaturedHolder2',
  components: {
    HomeMusicWidget: HomeMusicWidget,
  },
  computed: {
    ...mapGetters ({
        filteredProducts:'beatspageFilteredProducts'
      })
  },
};
</script>

<style scoped>
.beatGrid2 {
  width: 100%;
  justify-content: center;
  margin-top: 30px;
  display: grid;
  grid-template-columns: 24% 24% 24% 24%;
  grid-column-gap: 1vh;
  grid-template-rows: 30vh;
}
.beat {
  background-color: aqua;
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
</style>