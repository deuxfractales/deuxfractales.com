<template>
    <div class="InfoFilterNav">
        <SearchBox/>
        <TagBox/>
    </div>
</template>

<script>
    import SearchBox from "../SearchBox";
    import TagBox from "../TagBox";
    export default {
        name: "InfoFilterNav",
        components: {TagBox, SearchBox}
    }
</script>

<style scoped>
    .InfoFilterNav{
        -ms-grid-column-span: 1;
        grid-column-end: 2;
        -ms-grid-column: 1;
        grid-column-start: 1;
        -ms-grid-row-span: 3;
        grid-row-end: 5;
        -ms-grid-row: 2;
        grid-row-start: 2;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }
</style>