<template>
  <div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="product" class="content">
      <h2>{{ product.name }}</h2>
      <p>{{ product.id }}</p>
    </div>
  </div>
</template>

<script>

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
    fetchData() {
      this.error = this.product = null;
      this.loading = true;
      const fetchedProduct = this.$route.params.name;
      // replace `getPost` with your data fetching util / API wrapper
      getPost(fetchedProduct, (err, post) => {
        // make sure this request is the last one we did, discard otherwise
        if (this.$route.params.name !== fetchedProduct) return;
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.product = post;
        }
      });
    },
  },
};
</script>

<style></style>
