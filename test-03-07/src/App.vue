<template>
  <div class="body">
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
