<template>
  <div>
    <ShoppingCart />
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import ShoppingCart from '../components/shoppingcart/ShoppingCart';
export default {
    components: {
        ShoppingCart
    }
}
</script>

<style>
</style>