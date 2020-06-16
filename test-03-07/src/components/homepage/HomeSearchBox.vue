<template>
  <div id="w-node-668c28d507c8-edd6561d" class="search-box">
    <input type="text" v-model="search" placeholder="Search title.." />
  </div>
</template>

<script>
import vuex from '../../mixins/vuex';
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: "HomeSearchBox",
  computed: {
    search: {
      get() {
        return this.$store.getters.search;
      },
      set(search) {
        this.$store.dispatch('updateSearchValue', search);
      }
    },
    ...mapGetters ({
      filteredProducts:'filteredProducts'
      })
  }     
}
</script>

<style scoped>
</style>