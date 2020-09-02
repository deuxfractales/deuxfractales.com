<template>
  <div>
<!--    <GlobalHeader/>-->
<!--    <NavBar />-->
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

/*.w-layout-grid {*/
/*  display: -ms-grid;*/

/*  grid-auto-columns: 1fr;*/
/*  -ms-grid-columns: 1fr 1fr;*/
/*  grid-template-columns: 1fr 1fr;*/
/*  -ms-grid-rows: auto auto;*/
/*  grid-template-rows: auto auto;*/

/*}*/

.grid {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-areas: ". . . ." ". . . ." ". Area Area Area" ". Area Area Area" ". Area Area Area" ". Area Area Area";
    -ms-grid-columns: 0.75fr 1fr 1fr 1fr;
    grid-template-columns: 0.75fr 1fr 1fr 1fr;
    -ms-grid-rows: 1fr 1fr 3.75fr 2.5fr 2.5fr auto;
    grid-template-rows: 1fr 1fr 3.75fr 2.5fr 2.5fr auto;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
}
</style>
<script>
import {mapActions} from "vuex";

import NavBar from "./components/global/NavBar";
import Header from "./components/global/Header";
import GlobalHeader from "./components/global/GlobalHeader";

export default {
  components: {GlobalHeader, NavBar, Header},
  methods: {
    ...mapActions(['fetchArtists', 'fetchFeatured', 'fetchAll']),
  },
  created() {
    this.fetchArtists();
    this.fetchFeatured();

  },
}
  
</script>
