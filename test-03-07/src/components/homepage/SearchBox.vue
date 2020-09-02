<template>
    <div class="searchBox">
        <input type="text" class="searchInput" placeholder="search">
    </div>
</template>

<script>
    export default {
        name: "SearchBox"
    }
</script>

<style scoped>
.searchBox{
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    height: 10%;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
}
    .searchInput{
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        height: 50%;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-align-self: center;
        -ms-flex-item-align: center;
        align-self: center;
        border: 1px solid #000;
        border-radius: 10px;
        font-family: Poppins, sans-serif;
        font-size: 16px;
        line-height: 16px;
        font-weight: 300;
        text-align: center;
    }
</style>