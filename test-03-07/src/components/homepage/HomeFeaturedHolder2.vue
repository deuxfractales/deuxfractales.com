<template>
  <div class="holder2">
    <div class="beat"> julia set graphic</div>
    <div class="beat"> julia set graphic</div>
    <div class="beat"> julia set graphic</div>
    <div class="beat"> julia set graphic</div>
    <div class="beat"> julia set graphic</div>
  </div>
</template>

<script>
export default {
  name: 'HomeFeaturedHolder2',
};
</script>

<style scoped>
  .holder2{
    display: grid;
    overflow: scroll;
    grid-template-columns: 60% 60% 60% 60% 60%;
    grid-template-rows: 100%;
    grid-gap: 10px;
  }
  .beat{
    background-color: aqua;
  }
</style>
