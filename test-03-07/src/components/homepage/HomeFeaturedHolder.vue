<template>
  <div id="w-node-3c6e0d08d641-edd6561d" class="featured-holder">
    <HomeMusicWidget
      v-for="product in featuredProducts"
      v-if="product.featuredSlot1 === 1"
      :key="product.id"
      :ref="product.id"
      :id="product.id"
      :k="product.k"
      :d="product.d"
      :currentlyPlaying="playingId"
      :setCurrentlyPlaying="setCurrentlyPlaying"
      class="beatcontainer"
      :product="product"
    />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import HomeMusicWidget from './HomeMusicWidget.vue';

export default {
  name: 'HomeFeaturedHolder',
  components: {
    HomeMusicWidget: HomeMusicWidget,
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

<style scoped>
audio {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  align-self: end;
}
.p5waveform {
  display: flex;
}
</style>
