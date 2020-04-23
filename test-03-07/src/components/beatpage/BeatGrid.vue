<template>
    <div class="beatGrid">
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
        <div class="beat"></div>
    </div>
</template>

<script>
export default {
    name:'BeatGrid'
}
</script>

<style scoped>
    .beatGrid{
        margin-top: 20px ;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
        /* auto grow rows based on search results */
        grid-template-rows: 200px 200px 200px;
        grid-gap: 10px 10px ;
    }
    .beat{
        background-color: aquamarine;
    }
</style>