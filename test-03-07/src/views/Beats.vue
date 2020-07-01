<template>
  <div class="page2">
      <BeatSearch />
      <BeatFeatured />
      <BeatGrid />
  </div>
</template>

<script>
import BeatSearch from '../components/beatpage/BeatSearch.vue'
import BeatFeatured from '../components/beatpage/BeatFeatured.vue'
import BeatGrid from '../components/beatpage/BeatGrid.vue'

export default {
    name: 'Beats',
    components:{BeatSearch,BeatFeatured,BeatGrid},
}
</script>

<style>
  .page2{
    width: 100%;
    margin-top: 7px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
</style>