<template>
    <div class="grid">
        <GlobalHeader/>
        <GlobalNavBar/>
        <InfoFilterNav/>
        <ProductGrid>
            <HomeMusicWidget
                    v-for="product in filteredProducts"
                    v-if="product.featuredSlot1 === 1"
                    :key="product.id"
                    :ref="product.id"

                    :id="product.id"
                    :k="product.k"
                    :d="product.d"
                    :currentlyPlaying="playingId"
                    :setCurrentlyPlaying="setCurrentlyPlaying"
                    :product="product"

                    class="beatContainer"
                    beatInfo="featuredSlot1_beatInfo"
                    beatTitle="featuredSlot1_beatTitle"
                    beatGenre="featuredSlot1_beatGenre"
                    beatArtist="featuredSlot1_beatArtist"
                    beatPrice="featuredSlot1_beatPrice"
                    beatPlay="featuredSlot1_beatPlay"

            />
        </ProductGrid>

    </div>
</template>

<script>
    import InfoFilterNav from "../components/homepage/holder/InfoFilterNav";
    import GlobalHeader from "../components/global/GlobalHeader";
    import GlobalNavBar from "../components/global/GlobalNavBar";
    import HomeMusicWidget from "../components/homepage/HomeMusicWidget";
    import vuex from '../mixins/vuex';
    import { mapGetters } from 'vuex'
    import ProductGrid from "../components/homepage/holder/ProductGrid";
    export default {
        name: "NewHome",
        components: {ProductGrid, HomeMusicWidget, GlobalNavBar, GlobalHeader, InfoFilterNav},
        computed: {
            ...mapGetters ({
                filteredProducts:'homepageFilteredProducts'
            })
        },
        mixins: [vuex],
        created: async function () {
            while (this.$socket.readyState != 1) {
                console.log('Waiting');
                await new Promise((r) => setTimeout(r, 10));
            }
            const refs = this.$refs;
            this.$socket.onmessage = function (res) {
                const jsonData = JSON.parse(res.data);
                const points = jsonData.points;
                const drawTo = jsonData.id;
                refs[drawTo][0].setPoints(points, jsonData.type);
            };
        },
    }
</script>

<style scoped>

</style>
