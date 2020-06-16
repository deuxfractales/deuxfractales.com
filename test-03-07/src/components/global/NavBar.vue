<template>
  <div class="navbar">
    <div class="navlink">
      <router-link to="/">home</router-link>
    </div>
    <div class="navlink">beats</div>
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
