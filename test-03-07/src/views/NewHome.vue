<template>
  <div class="grid">
    <GlobalHeader />
    <GlobalNavBar />
    <InfoFilterNav />
    <ProductGrid>
      <HomeMusicWidget
        v-for="product in filteredProducts"
        v-if="product.featuredSlot1 === 1"
        :key="product.id"
        :ref="product.id"
        :id="product.id"
        :k="product.k"
        :d="product.d"
        :product="product"
        class="beat"
      />
      <HomeMusicWidget
        v-for="product in filteredProducts"
        v-if="product.featuredSlot1 === 2"
        :key="product.id"
        :ref="product.id"
        :id="product.id"
        :k="product.k"
        :d="product.d"
        :product="product"
        class="beat"
      />
      <HomeMusicWidget
        v-for="product in filteredProducts"
        v-if="product.featuredSlot1 === 3"
        :key="product.id"
        :ref="product.id"
        :id="product.id"
        :k="product.k"
        :d="product.d"
        :product="product"
        class="beat"
      />
    </ProductGrid>
    <div v-if="isPlay">
      <Player />
    </div>
  </div>
</template>

<script>
import InfoFilterNav from '../components/homepage/holder/InfoFilterNav';
import GlobalHeader from '../components/global/GlobalHeader';
import GlobalNavBar from '../components/global/GlobalNavBar';
import HomeMusicWidget from '../components/homepage/HomeMusicWidget';
import vuex from '../mixins/vuex';
import { mapGetters } from 'vuex';
import ProductGrid from '../components/homepage/holder/ProductGrid';
import Player from '../components/global/Playbar';

export default {
  name: 'NewHome',
  components: {
    ProductGrid,
    HomeMusicWidget,
    GlobalNavBar,
    GlobalHeader,
    InfoFilterNav,
    Player,
  },
  computed: {
    ...mapGetters({
      filteredProducts: 'homepageFilteredProducts',
      isPlay: 'playbar/isPlay',
    }),
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
.beat {
  position: relative;
  height: 100%;
}

</style>
