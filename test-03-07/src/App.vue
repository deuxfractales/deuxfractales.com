<template>
  <div class="body">
    <NavBar/>
    <router-view/>
  </div>
</template>

<style>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
</style>
<script>
  import NavBar from "./components/global/NavBar";
  export default {
    components: {NavBar}
  }
</script>
