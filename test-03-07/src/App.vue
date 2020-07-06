<template>
  <div class="body">
    <Header />
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
import Header from "./components/global/Header";

export default {
  components: {NavBar, Header},
  methods: {
    ...mapActions(['fetchArtists', 'fetchFeatured', 'fetchAll']),
  },
  created() {
    this.fetchArtists();
    this.fetchFeatured();

  },
}
  
</script>
