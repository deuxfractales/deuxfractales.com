<template>
  <div class="px-4 px-lg-0">
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
      integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
      crossorigin="anonymous"
    />
    <div class="container text-white py-5 text-center" v-if="!paidFor && cartSize > 0">
      <!-- Shopping cart table -->

      <h1>Summary</h1>

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

          <tbody v-for="product in products">
            <tr>
              <th scope="row" class="border-0">
                <div class="p-2">
                  <img src alt width="70" class="img-fluid rounded shadow-sm" />
                  <div class="ml-3 d-inline-block align-middle">
                    <h5 class="mb-0 border-0 align">
                      <a href="#" class="text-dark align-middle">{{ product.name }}</a>
                    </h5>
                    <span
                      class="text-muted font-weight-normal font-italic d-block"
                    >Genre: {{ product.genre }}</span>
                  </div>
                </div>
              </th>
              <td class="border-1">
                <strong>${{ product.price }}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h3>Total: ${{ total.toFixed(2) }}</h3>
        <div ref="paypal"></div>
      </div>
    </div>
    <div class="paymentCompletion" v-if="paidFor">
      <h1>Thank You For Shopping With Us</h1>
      <router-link style="color: white;" to="/">
        <button class="btn btn-primary">Continue Shopping</button>
      </router-link>
    </div>
  </div>
</template>

<script>

import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "Checkout",

  data: function() {
    return {
      loaded: false,
      paidFor: false,
    };
  },
  computed: {
    ...mapGetters ('cart', {
        products: 'cartProducts',
        total: 'cartTotal',
        cartSize: 'cartSize'
      }),
      
  },
  mounted: function() {
    const script = document.createElement("script");
    script.src =
      `https://www.paypal.com/sdk/js?client-id=AcfH33GUvo1o4ObrA9TSRyrz4Nure7e7MvrWkR9ef8J0tbomLIl7NzqgYSgs0sKBjRdHdIlXv3-4Psvs`;
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    ...mapActions ({
        emptyCart: 'cart/emptyCart'
    }),
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
               purchase_units: [
                {
                  description: 'Deux fractales product',
                  amount: {
                    currency_code: "USD",
                    value: this.total
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            this.emptyCart();
            console.log(order);

          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }
};
</script>

<style scoped>
</style>