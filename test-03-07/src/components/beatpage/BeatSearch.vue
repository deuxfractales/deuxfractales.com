<template>
<div class="searchHolder">
    <input type="text" placeholder="Search for Artists or Genres" class="beatSearchBar">
</div>
  
</template>

<script>
export default {
    name:'BeatSearch'
}
</script>

<style>
.searchHolder{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
}
.beatSearchBar{
    width: 80%;
    border-radius: 3px;
    padding: 10px;
    border-color: #160011;
}
</style>