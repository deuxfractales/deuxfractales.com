<template>
  <div id="mobile-box" class="mobile-featured-holder">
    <HomeMobileMusicWidget
      v-for="product in featuredProducts"
      v-if="product.featuredSlot1 === 1"
      :key="product.id"
      :ref="product.id"
      class="beatcontainer"
      :product="product"
    />
  </div>
</template>

<script>
import vuex from '../../../mixins/vuex';
import HomeMobileMusicWidget from './../Homepage Mobile/HomeMobileMusicWidget';

export default {
  name: 'HomeMobileFeaturedHolder',
  components: {
    HomeMobileMusicWidget,
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

      refs[drawTo][0].setPoints(points)
    };
  },
};
</script>


<style >
@media only screen and (max-width: 600px) {
  audio {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    align-self: end;
  }
  .p5waveform {
    display: flex;
  }

  .mobile-featured-holder {
    height: 100%;
    width: 50%;
    position: absolute;
    display: grid;
    width: 100%;
  }
}
</style>
