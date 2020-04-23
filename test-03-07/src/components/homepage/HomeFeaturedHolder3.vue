<template>
  <div class="holder3">
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
    <div class="beat"> serpinski set</div>
  </div>
</template>

<script>
export default {
  name: 'HomeFeaturedHolder3',
};
</script>

<style scoped>
  .holder3{
    width: 100%;
    height: 15vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 4%;
    grid-column-gap: 0.5%;
    grid-template-rows: 15vh 15vh;
  }
  .beat{
    background-color: aquamarine;
  }
</style>
