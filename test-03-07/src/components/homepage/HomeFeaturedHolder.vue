<template>
  <div id="w-node-3c6e0d08d641-edd6561d" class="featured-holder">
    <div
      v-for="product in featuredProducts"
      v-if="product.featuredSlot1 === true"
      :key="product.id"
      ref="p5"
      class="beatcontainer"
    >
      <vue-p5 class="p5" @setup="setup"></vue-p5>
      <div class="beatinfo">
        <div class="beattitle">{{ product.title }}</div>
        <div id="w-node-e9c14a1e787a-edd6561d" class="div-block">
          <div class="beatgenre">{{ product.genre }}</div>
          <!--CHANGE TO beatArtist on next css import, needs to be changed in webflow as well-->
          <div class="beattags">{{ product.artist }}</div>
        </div>
        <div id="w-node-7b98ada7c7b9-edd6561d" class="p5waveform">
          <audio
            ref="mediaPlayer"
            crossorigin="anonymous"
            controls="true"
            :src="product.url"
          >
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
        <div id="w-node-8a1d5bef07c2-edd6561d" class="buyprice">BUY $150</div>
        <!--Need to change buyText to playButton, it's already changed in webflow but needs to be changed here during the next css import-->
        <button
          id="w-node-1f91bc0acfe7-edd6561d"
          v-on:click="playPause"
          class="buytext"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import vuex from '../../mixins/vuex';
import audioPlayback from '../../mixins/audioPlayback';
import p5 from '../../mixins/p5';

export default {
  name: 'HomeFeaturedHolder',
  components: {
    'vue-p5': VueP5,
  },
  mixins: [vuex, audioPlayback, p5],
};
</script>

<style scoped>
audio {
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
  align-self: end;
}
.p5waveform {
  display: flex;
}
</style>
