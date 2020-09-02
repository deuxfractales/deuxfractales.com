<template>
    <div class="siteHeader">
        <div class="logo" v-tooltip="tooltipContent">
            TYPE BEAT WAREHOUSE: ALL EXCLUSIVES. CURATED CONTENT.
        </div>
        <div class="siteHeaderButtons">
            <ShoppingCartIcon />
            <div class="navlink">sign-in</div>
        </div>
    </div>
</template>

<script>
    import ShoppingCartIcon from "../shoppingcart/ShoppingCartIcon";

    export default {
        name: "Header",
        components: {
            ShoppingCartIcon
        },
    }
</script>

<style scoped>
    .siteHeaderButtons{
        width: 15%;
        display: flex;
        flex-direction: row-reverse;
    }
    .logo{
        font-family: Poppins, sans-serif;
        font-weight: 800;
        font-size: 30px;
        width: 85%;
    }
    .siteHeader{
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .navlink {
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
        align-self: flex-end;
    }
</style>