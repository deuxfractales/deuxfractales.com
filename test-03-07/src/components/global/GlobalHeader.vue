<template>
    <div class="globalHeader">
        <h1>TYPE BEAT WAREHOUSE</h1>
        <h2>the only all-exclusive beat marketplace</h2>
    </div>
</template>

<script>
    export default {
        name: "GlobalHeader"
    }
</script>

<style scoped>
    .globalHeader {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        height: 70px;
        -webkit-box-pack: center;
        -webkit-justify-content: center;

        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;

        align-items: center;
        font-family: Poppins, sans-serif;

        grid-row-start: span 1;

        grid-row-end: span 1;

        grid-column-start: span 4;

        grid-column-end: span 4;
    }
    h1{
        font-weight: 700;
        font-family: Poppins;
        margin-bottom: 10px;
        font-size: 38px;
        line-height: 44px;
        margin-top: 20px;
    }
    h2{
        margin-bottom: 10px;
        font-size: 38px;
        line-height: 44px;
        margin-top: 20px;
        margin-left: 17px;
        font-weight: 300;
    }
</style>