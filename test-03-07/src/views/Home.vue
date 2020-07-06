<template>
  <div class="page">
    <div class="hero">
      <HomeFeaturedHolder />
      <HomeFeaturedHolder2 />
      <HomeSearchBox />
    </div>
    <HomeFeaturedHolder3 />
  </div>
</template>

<script>
// @ is an alias to /src

import HomeFeaturedHolder from "../components/homepage/HomeFeaturedHolder";
import HomeFeaturedHolder2 from "../components/homepage/HomeFeaturedHolder2";
import HomeFeaturedHolder3 from "../components/homepage/HomeFeaturedHolder3";
import ProgressBar from "../components/homepage/ProgressBar";
import ShoppingCart from "../components/shoppingcart/ShoppingCart";
import HomeSearchBox from "../components/homepage/HomeSearchBox";
import {mapActions} from "vuex";

export default {
  name: 'Home',
  components: {
    HomeFeaturedHolder3, 
    HomeSearchBox, 
    HomeFeaturedHolder2, 
    HomeFeaturedHolder, 
    ShoppingCart
  },
}
</script>
<style scoped>
.page {
  width: 100%;
}
.hero {
  display: -ms-grid;
  display: grid;
  width: 98%;
  margin-top: 5px;
  margin-right: 0%;
  margin-left: 0%;
  justify-content: center;
  justify-items: stretch;
  grid-auto-columns: 1fr;
  grid-column-gap: 1vw;
  grid-row-gap: 1vh;
  grid-template-areas: '.';
  grid-template-columns: 28% 70%;
  grid-template-rows: 51vh 22vh;
}
</style>
