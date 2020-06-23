<template>
  <div class="page">
    <div class="hero">
      <HomeFeaturedHolder/>
      <HomeFeaturedHolder2/>
      <HomeSearchBox />
    </div>
    <HomeFeaturedHolder3/>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeFeaturedHolder from "../components/homepage/HomeFeaturedHolder";
import HomeFeaturedHolder2 from "../components/homepage/HomeFeaturedHolder2";
import HomeFeaturedHolder3 from "../components/homepage/HomeFeaturedHolder3";
import HomeSearchBox from "../components/homepage/HomeSearchBox";
import {mapActions} from "vuex";

export default {
  name: 'Home',
  components: {HomeFeaturedHolder3, HomeSearchBox, HomeFeaturedHolder2, HomeFeaturedHolder},

  // methods: {
  //   ...mapActions(['fetchFeatured', 'fetchAll']),
  // },
  // created() {
  //   this.fetchFeatured();
  // },
}
</script>
<style scoped>
  .page{
    width: 100%;
  }
</style>
