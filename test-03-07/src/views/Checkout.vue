<template>
  <div>
    <Checkout />
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Checkout from '../components/checkout/checkout';
export default {
    components: {
        Checkout
    }
}
</script>

<style>

</style>