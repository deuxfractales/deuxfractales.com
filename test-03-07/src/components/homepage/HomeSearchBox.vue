<template>
  <div id="w-node-668c28d507c8-edd6561d" class="search-box">
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
        <span class="tag-rounded">
          <a @click="selectArtist({artistName, page})">{{ artistName }}</a>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: "HomeSearchBox",
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
.search-box {
  overflow: auto;
}
.tags .tag-rounded.selected {
  background-color: rgb(220, 220, 220);
}
.tags .tag-rounded {
  background-color: rgb(235, 235, 235);
  border-radius: 25px;
  padding: 8px 12px;
  font-size: 15px;
  color: #000000;
  transition: all 0.3s ease-in-out;
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