<template>
  <div v-if="cartSize > 0">
    <Confirmation />
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Confirmation from '../components/checkout/confirmation';
export default {
    components: {
        Confirmation
    },
    computed: {
    ...mapGetters ('cart', {
        cartSize: 'cartSize'
        }),
        
    },
}
</script>

<style>
</style>