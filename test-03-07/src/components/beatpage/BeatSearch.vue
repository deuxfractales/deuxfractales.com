<template>
  <div class="searchHolder">
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
    name: "BeatSearch",
    data: function () {
      return {
        page: 'beatspage',
      };
    },
    computed: {
        ...mapGetters({
            artists: 'beatspageArtists',
            selectedArtists: 'beatspageSelectedArtists',
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
        


<style>
.searchHolder {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;

  overflow-y: hidden;
  overflow-x: auto;

  white-space: nowrap;
  display: inline-block;
}

.tags span {
  display: inline;
  margin-right: 3px;
  margin-right: 3px;
  font-size: 15px;
  text-decoration: none;
  margin-bottom: 5px;
}
.tags .tag-rounded.selected {
  background-color: rgb(220, 220, 220);
}
.tags .tag-rounded {
  display: inline-block;
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
</style>
