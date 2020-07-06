<template>
  <div class="body">
    <div class="logo">
      TYPE BEAT WAREHOUSE
    </div>
    <NavBar />
    <router-view />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
  .logo{
    font-family: Poppins, sans-serif;
    font-weight: 800;
    font-size: 30px;
  }
</style>
<script>
import {mapActions} from "vuex";

import NavBar from "./components/global/NavBar";
export default {
  components: {NavBar},
  methods: {
    ...mapActions(['fetchArtists', 'fetchFeatured', 'fetchAll']),
  },
  created() {
    this.fetchArtists();
    this.fetchFeatured();

  },
}
  
</script>
