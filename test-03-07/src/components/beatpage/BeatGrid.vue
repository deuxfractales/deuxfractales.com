<template>
  <div class="beatGrid">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 3"
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
  name: 'BeatGrid',
  components: {
    HomeMusicWidget: HomeMusicWidget,
  },
  computed: {
    ...mapGetters ({
        filteredProducts:'beatspageFilteredProducts'
      })
  },
}
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
</style>