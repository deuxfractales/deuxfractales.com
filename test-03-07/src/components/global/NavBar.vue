<template>
  <div class="navbar">
    <router-link to="/" class="navlink">home</router-link>
    <router-link to="/beats" class="navlink">beats</router-link>
    <div class="navlink">ai mixing</div>
    <div class="navlink">custom</div>

  </div>
</template>

<script>
export default {
  name: 'NavBar',


};


</script>

<style scoped>
  .navlink {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 18%;
    height: 5vh;
    margin-right: 1%;
    margin-left: 1%;
    padding-left: 0px;
    flex-direction: column;
    justify-content: center;
    border-radius: 3px;
    background-color: #e4e0e4;
    font-family: Poppins, sans-serif;
    color: #160011;
    font-size: 110%;
    line-height: 40px;
    font-weight: 400;
    text-align: center;
  }

  .navbar {
    display: flex;
    width: 100%;
    margin-top: 5px;
    justify-content: space-evenly;
  }
</style>
