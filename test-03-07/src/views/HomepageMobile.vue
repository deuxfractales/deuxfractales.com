<template>
  <div class="page">
    <div class="hero-mobile">
      <HomeMobileFeaturedHolder />
    </div>
    <div class="hero-mobile">
      <HomeMobileFeaturedHolder />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeMobileFeaturedHolder from "../components/homepage/Homepage Mobile/HomeMobileFeaturedHolder";

import {mapActions} from "vuex";

export default {
  name: 'HomeMobile',
  components: { HomeMobileFeaturedHolder},
  methods: {
    ...mapActions(['fetchFeatured', 'fetchAll']),
  },
  created() {
    this.fetchFeatured();
  },
}
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .page {
    width: 100%;
  }
  .hero-mobile {
    /* border: 4px solid red; */
    overflow: hidden;
    position: relative;
    /* width: 100%; */
    /* display: -ms-grid; */
    /* display: grid; */
    width: 100%;
    height: 400px;
    margin-top: 10px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    justify-items: stretch;
    grid-auto-columns: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    grid-template-areas: '.';
    -ms-grid-columns: 28% 0px 70%;
    grid-template-columns: 28% 70%;
    /* grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr)); */
    -ms-grid-rows: 51vh 0px 10vh;
    grid-template-rows: 51vh 10vh;
  }
}
</style>
