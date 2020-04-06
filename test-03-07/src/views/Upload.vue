<template>
  <div class="formsection">
    <div class="formholder">
      <form v-on:submit.prevent="onSubmit">
        <h3>Add Mp3 File</h3>
        <input type="file" placeholder="mp3 file" v-on:change="handleMp3" />
        <h3>Add Wav File</h3>
        <input type="file" placeholder="mp3 file" />
        <h3>Add Stems in ZIP file</h3>
        <input type="file" placeholder="mp3 file" />
      </form>
      <button v-on:click="nextStep">Next Steps</button>
    </div>
    <transition name="fade">
      <div v-if="showNextStep" class="formholder">
        <h1>Hello</h1>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Upload',
  data: function () {
    return {
      showNextStep: false,
      mp3: '',
      wav: '',
      stems: '',
    };
  },
  methods: {
    nextStep: function () {
      this.showNextStep = true;
      this.submitFiles();
    },
    handleMp3: function (event) {
      console.log(event.target.files[0]);
      this.mp3 = event.target.files[0];
    },
    submitFiles: function () {
      // TODO:Fix 'submitFiles' function
      let formData = new FormData();

      formData.append('mp3', this.mp3);
      axios
        .post('http://localhost:3001/post/mp3', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.formsection {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 70vh;
  margin-top: 10vh;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.formholder {
  width: 40%;
  background-color: #d6d6d6;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
</style>
