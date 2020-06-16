<template>
  <div class="px-4 px-lg-0">
    <div class="container text-white py-5 text-center">
      <!-- Shopping cart table -->
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
        integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
        crossorigin="anonymous"
      />
      <h1>Shopping Cart</h1>

      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="border-0 bg-light">
                <div class="p-2 px-3 text-uppercase">Product</div>
              </th>
              <th scope="col" class="border-0 bg-light">
                <div class="py-2 text-uppercase">Price</div>
              </th>
            </tr>
          </thead>

          <tbody v-if="cartSize > 0">
            <tr v-for="product in products">
              <th scope="row" class="border-0">
                <div class="p-2">
                  <img src alt width="70" class="img-fluid rounded shadow-sm" />
                  <div class="ml-3 d-inline-block align-middle">
                    <h5 class="mb-0">
                      <a href="#" class="text-dark d-inline-block align-middle">{{ product.name }}</a>
                    </h5>
                    <span
                      class="text-muted font-weight-normal font-italic d-block"
                    >Genre: {{ product.genre }}</span>
                  </div>
                </div>
              </th>
              <td class="border-0 align-middle">
                <strong>${{ product.price }}</strong>
              </td>
              <td class="border-0 align-middle">
                <a href="#" @click="deleteItem(product.id)" class="text-dark">
                  <i class="fa fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Coupon -->
        <label for="coupon">Coupon:</label>
        <input />
        <router-link style="color: white; text-decoration: none" to="/cart/confirmation">
          <button v-if="cartSize > 0" class="btn btn-primary">Checkout</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    computed: {
        ...mapGetters ('cart', {
            products: 'cartProducts',
            total: 'cartTotal',
            cartSize: 'cartSize'
        }),
        
    },
    methods: {
        ...mapActions({
            deleteItem: 'cart/deleteItem',
        })
    }
}
</script>

<style>
</style>