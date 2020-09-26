<template>
  <div class="post">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="product" class="content">
      <h2>Name: {{ product.name }}</h2>
      <h2>Genre: {{ product.genre }}</h2>
      <h2>Plays: {{ product.plays }}</h2>
      <h2>Producer: {{ product.producer }}</h2>
      <h2>Cost: ${{ product.pricing }}</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Beats',
  data: function () {
    return {
      loading: false,
      product: null,
      error: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    async fetchData() {
      this.error = this.product = null;
      this.loading = true;
      const fetchedProduct = this.$route.params.name;
      console.log('asdas');
      this.product = await axios
        .get(`http://localhost:3001/api/v1/beats/${fetchedProduct}`)
        .then((response) => (this.product = response.data));
      console.log(this.product);
      this.loading = false;
      // return this.getPost(fetchedProduct);
      // replace `getPost` with your data fetching util / API wrapper
      getPost(fetchedProduct, (err, post) => {
        console.log('asdas');
        // make sure this request is the last one we did, discard otherwise
        if (this.$route.params.name !== fetchedProduct) return;
        if (err) {
          this.error = err.toString();
        } else {
        }
      });
    },
  },
};
</script>

<style></style>
