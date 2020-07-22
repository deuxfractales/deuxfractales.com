<template>
    <div class="GlobalNavBar">
        <router-link to="/" class="navlink">beats</router-link>
        <div class="navlink">ai mixing</div>
        <div class="navlink">custom production</div>
        <div class="navlink">cart</div>
        <div class="navlink">about us</div>

    </div>
</template>

<script>
    export default {
        name: "GlobalNavBar"
    }
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
.GlobalNavBar{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    margin-top: 0px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-grid-row: span 1;
    grid-row-start: span 1;
    -ms-grid-row-span: 1;
    grid-row-end: span 1;
    -ms-grid-column: span 3;
    grid-column-start: span 3;
    -ms-grid-column-span: 3;
    grid-column-end: span 3;
}
</style>