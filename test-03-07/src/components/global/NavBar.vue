<template>
  <div class="navbar">
    <router-link to="/" class="navlink">home</router-link>
    <router-link to="/beats" class="navlink">beats</router-link>
    <div class="navlink">ai mixing</div>
    <div class="navlink">custom</div>
    <div class="navlink">sign-in</div>
    <ShoppingCartIcon />
  </div>
</template>

<script>
import ShoppingCartIcon from "../shoppingcart/ShoppingCartIcon";
export default {
  name: 'NavBar',
  components: { 
    ShoppingCartIcon
  },

};


</script>

<style scoped></style>
