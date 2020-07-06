<template>
  <div>
    <!-- Header -->
    <header class="container">
      <h1>Checkout</h1>
      <span class="count">{{ cartSize }} items in the bag</span>
    </header>
    <!-- End Header -->

    <!-- Product List -->
    <section class="container">
      <div v-if="cartSize > 0">
        <ul class="products">
          <li class="row" v-for="product in products">
            <div class="col left">
              <!-- <div class="thumbnail">
                <a href="#">
                  <img :src="product.image" :alt="product.name" />
                </a>
              </div> -->
              <div class="detail">
                <div class="name">
                  <a href="#">{{ product.name }}</a>
                </div>
                <div class="price">${{ product.price }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-else class="empty-product">
        <h3>There are no products in your cart.</h3>
        <router-link to="/">
          <button class="continue-shopping">Continue Shopping</button>
        </router-link>
      </div>
    </section>
    <!-- End Product List -->

    <!-- Summary -->
    <section class="container" v-if="cartSize > 0">
      <div class="summary">
        <ul>
          <li>
            Subtotal <span>${{ cartTotal }}</span>
          </li>

          <li class="total">
            Total <span>${{ cartTotal }}</span>
          </li>
        </ul>
      </div>
      <!-- <paypal :amount="cartTotal" :items="products" /> -->

      <Paypal :products="products" :total="cartTotal"/>
    </section>
    <!-- End Summary -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import Paypal from './paypal'

export default {
  name: 'Checkout',
  components: {"Paypal": Paypal},

  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
      cartTotal: 'cartTotal',
      cartSize: 'cartSize',
    }),
  },
};
</script>

<style scoped>
.checkout-button {
  box-sizing: border-box;
  background-color: #16cc9b;
  color: #fff;
  font-size: 1rem;
  padding: 0.8rem 2.8rem;
  border-radius: 1.5rem;
}
.continue-shopping {
  box-sizing: border-box;
  background-color: #16cc9b;
  color: #fff;
  font-size: 1rem;
  padding: 0.8rem 2.8rem;
  border-radius: 1.5rem;
}
.promo-button {
  box-sizing: border-box;
  background-color: #16cc9b;
  color: #fff;
  font-size: 1rem;
  padding: 0.8rem 2.8rem;
  border-radius: 1.5rem;
}
img {
  max-width: 100%;
  vertical-align: middle;
  border-radius: 4px;
}
a {
  text-decoration: none;
  color: #333;
}
button {
  background-color: #16cc9b;
  border: 2px solid #16cc9b;
  color: #fff;
  transition: all 0.25s linear;
  cursor: pointer;
}
ul {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
input {
  transition: all 0.25s linear;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
input {
  outline: 0;
}
.container {
  width: 90%;
  margin: 0 auto;
  overflow: auto;
}
header.container {
  margin-bottom: 1.5rem;
}
header .count {
  float: right;
  color: #333;
  height: 20px;
  line-height: 20px;
}
.products {
  border-top: 1px solid #ddd;
}
.products > li {
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;
}
.row {
  position: relative;
  overflow: auto;
  width: 100%;
}
.col,
.remove {
  float: left;
}
.col.left {
  width: 70%;
}
.col.right {
  width: 30%;
  position: absolute;
  right: 0;
  top: calc(50% - 30px);
}
.detail {
  padding: 0 0.5rem;
  line-height: 2.2rem;
}
.detail .name {
  font-size: 1.2rem;
}
.detail .price {
  font-size: 1.5rem;
}
.remove {
  width: 50%;
  text-align: center;
}
.remove {
  background-image: url(../../assets/images/delete-tag.svg);
  background-size: 100%;
  background-repeat: no-repeat;
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  width: 20px;
}
.checkout,
.promotion,
.summary {
  float: left;
  width: 100%;
  margin-top: 1.5rem;
}
.promotion > label {
  float: left;
  width: 100%;
  margin-bottom: 1rem;
}
.promotion > input {
  float: left;
  width: 80%;
  font-size: 1rem;
  padding: 0.5rem 0 0.5rem 1.8rem;
  border: 2px solid #16cc9b;
  border-radius: 2rem 0 0 2rem;
}
.promotion > button {
  float: left;
  width: 20%;
  height: 2.4rem;
  border-radius: 0 2rem 2rem 0;
}
.summary {
  font-size: 1.2rem;
  text-align: right;
}
.summary ul li {
  padding: 0.5rem 0;
}
.summary ul li span {
  display: inline-block;
  width: 30%;
}
.summary ul li.total {
  font-weight: 700;
}
.checkout {
  text-align: right;
}
.checkout > button {
  font-size: 1.2rem;
  padding: 0.8rem 2.8rem;
  border-radius: 1.5rem;
}
.empty-product {
  text-align: center;
}
.empty-product > button {
  font-size: 1.3rem;
  padding: 10px 30px;
  border-radius: 5px;
}
@media all and (max-width: 599px) {
  .thumbnail img {
    display: none;
  }
}
@media all and (min-width: 600px) {
  html {
    font-size: 14px;
  }
  .container {
    width: 75%;
    max-width: 960px;
  }
  .detail,
  .thumbnail {
    float: left;
  }
  .thumbnail {
    width: 35%;
  }
  .detail {
    width: 65%;
  }
  .promotion,
  .summary {
    width: 50%;
  }
  .checkout {
    width: 100%;
  }
  .checkout,
  .summary {
    text-align: right;
  }
}
@media all and (min-width: 992px) {
  html {
    font-size: 16px;
  }
}
</style>
