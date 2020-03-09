<template>
    <div id="w-node-3c6e0d08d641-edd6561d" class="featured-holder">
        <div id="beatContainer" v-for="item in items" :key="item.id">
            <canvas id="p5Canvas"></canvas>
            <div id="beatInfo"></div>
            {{ item }}
        </div>
    </div>
</template>

<script>
    import VueP5 from 'vue-p5'
    export default {
        name: "HomeFeaturedHolder"
    }
</script>

<style scoped>
    #beatContainer{
        width: 100%;
        height: 100%;
    }
#p5Canvas{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}
    #beatInfo{
        position: absolute;
        z-index: 2;
    }
</style>