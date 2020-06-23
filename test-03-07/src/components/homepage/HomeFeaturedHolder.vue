<template>
  <div id="w-node-3c6e0d08d641-edd6561d" class="featured-holder">
    <HomeMusicWidget
      v-for="product in filteredProducts"
      v-if="product.featuredSlot1 === 1"
      :key="product.id"
      :ref="product.id"

      :product="product"

      class="beatcontainer"
      
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
  name: 'HomeFeaturedHolder',
  components: {
    HomeMusicWidget: HomeMusicWidget,
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

<style scoped>
.beatcontainer {
  border-radius: 10px;
}

audio {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  align-self: end;
}

.p5waveform {
  display: flex;
}


.beatinfo {
  background-color: rgb(255, 0, 0);
  
}

</style>
