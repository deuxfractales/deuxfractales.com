<template>
  <div class="navlink">
    <router-link to="/cart">
      <div>
        <div class="icon"></div>
        <span v-if="cartSize > 0" class="badge" id="itemCount">{{ cartSize }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'NavBar',

  computed: {
    ...mapGetters('cart', {
      cartSize: 'cartSize',
    }),
  },
};
</script>

<style scoped>
#itemCount {
  text-decoration: none;
  font-size: 12px;
  background: #3c91c4;
  color: #fff;
  padding: 0 5px;
  vertical-align: top;
  margin-left: -12px;
}

.badge {
  border-radius: 9px;
}

.icon {
  display: inline-block;
  vertical-align: middle;
  background-image: url('../../assets/images/shopping-cart.svg');
  background-size: 100%;
  background-repeat: no-repeat;

  height: 30px;
  width: 30px;
}
</style>
