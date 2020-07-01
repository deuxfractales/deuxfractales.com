<template>
  <div>
    <router-link to="/cart/checkout">
      <button class="confirm-button">Continue</button>
    </router-link>
  </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
/* style="color: white; text-decoration: none" */
.confirm-button {
  box-sizing: border-box;
  background-color: #16cc9b;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.8rem 2.8rem;
  border-radius: 1.5rem;
}
</style>