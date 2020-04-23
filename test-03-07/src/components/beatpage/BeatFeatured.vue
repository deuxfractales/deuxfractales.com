<template>
  <div class="beatGrid2">
      <!-- v-for loop here, this is just for templating-->
      <div class="beat"></div>
      <div class="beat"></div>
      <div class="beat"></div>
      <div class="beat"></div>
  </div>
</template>

<script>
export default {
    name:'BeatFeatured'
}
</script>

<style scoped>
    .beatGrid2{
        width: 100%;
        justify-content: center;
        margin-top: 30px ;
        display: grid;
        grid-template-columns: 24% 24% 24% 24% ;
        grid-column-gap: 1vh;
        grid-template-rows: 30vh;
    }
    .beat{
        background-color: aqua;
    }
</style>