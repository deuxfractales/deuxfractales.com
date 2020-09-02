<template>
    <div class="tagBox">
        <div class="tags">
            <a v-for="artistName in selectedArtists" :key="artistName">
        <span class="tag-rounded selected">
          <a>{{ artistName }}</a>

          <img
                  @click="deleteArtist({artistName, page})"
                  src="../../assets/images/delete-tag.svg"
                  style="vertical-align: middle; height: 19px"
          />
        </span>
            </a>

            <a v-for="artistName in artists" :key="artistName">
        <span class="tag-rounded" @click="selectArtist({artistName, page})">
          <a>{{ artistName }}</a>
        </span>
            </a>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "TagBox",
        data: function () {
            return {
                page: 'homepage',
            };
        },
        computed: {
            ...mapGetters({
                artists: 'homepageArtists',
                selectedArtists: 'homepageSelectedArtists',
            }),
        },
        methods: {
            ...mapActions ({
                selectArtist: 'selectArtist',
                deleteArtist: 'deleteArtist',
            }),
        },
    }
</script>

<style scoped>
    .tagBox {
        height: 30%;
    }
    .tags .tag-rounded.selected {
        background-color: rgb(220, 220, 220);
    }
    .tags .tag-rounded {
        background-color: #457b9d;
        border-radius: 25px;
        padding: 8px 12px;
        font-size: 15px;
        color: #fffcf7;
        transition: all 0.3s ease-in-out;
        font-family: Poppins, sans-serif;
        font-weight: 200
    }

    .tags .tag-rounded:hover {
        cursor: default;
        color: #000000;
        background-color: rgb(220, 220, 220);
    }
    .tags a {
        margin-right: 3px;
        font-size: 15px;
        text-decoration: none;
    }
    .tags span {
        display: inline-block;
        margin-bottom: 5px;
    }
</style>