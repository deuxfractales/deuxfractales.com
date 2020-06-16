<template>
  <div class="navlink">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <router-link to="/cart">
      <i class="fa fa-shopping-cart" style="font-size:30px">({{ cartSize }})</i>
    </router-link>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: 'NavBar',

  computed: {
      ...mapGetters ('cart', {
          cartSize: 'cartSize'
      })
  }
};
</script>

<style scoped>
</style>
