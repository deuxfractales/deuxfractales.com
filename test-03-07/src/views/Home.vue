<template>
  <div class="page">
    <div class="hero">
      <HomeFeaturedHolder />
      <HomeFeaturedHolder2 />
      <HomeSearchBox />
    </div>
    <HomeFeaturedHolder3 />
    <div v-if="isPlay">
      <Player />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeFeaturedHolder from '../components/homepage/HomeFeaturedHolder';
import HomeFeaturedHolder2 from '../components/homepage/HomeFeaturedHolder2';
import HomeFeaturedHolder3 from '../components/homepage/HomeFeaturedHolder3';
// import ProgressBar from "../components/homepage/ProgressBar";
import Player from '../components/global/Playbar';

import ShoppingCart from '../components/shoppingcart/ShoppingCart';
import HomeSearchBox from '../components/homepage/HomeSearchBox';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    HomeFeaturedHolder3,
    HomeSearchBox,
    HomeFeaturedHolder2,
    HomeFeaturedHolder,
    ShoppingCart,
    Player,
  },
 computed: {
    ...mapGetters('playbar', {
      product: 'playerCurrentTrack',
      isPlay: 'isPlay',
    }),
  },
};
</script>
<style scoped>
.page {
  width: 100%;
}
</style>
