<template>
  <div class="formsection">
    <div class="formholder">
      <form v-on:submit.prevent="onSubmit">
        <h3>Add Mp3 File</h3>
        <label class="submit-button">
          <input type="file" placeholder="MP3 file" v-on:change="handleMp3" />
          <span>Choose File</span>
        </label>

        <h3>Add Wav File</h3>
        <label class="submit-button">
          <input type="file" placeholder="WAV file" v-on:change="handleMp3" />
          <span>Choose File</span>
        </label>

        <h3>Add Stems in ZIP file</h3>
        <label class="submit-button">
          <input type="file" placeholder="ZIP file" v-on:change="handleMp3" />
          <span>Choose File</span>
        </label>
      </form>
      <button class="next-step" v-on:click="nextStep">Next Steps</button>
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
      let formData = new FormData();

      formData.append('mp3', this.mp3);
      axios
        .post(`http://${process.env.VUE_APP_IP}:3001/post/mp3`, formData, {
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
  background-color: #fff6f6;
  margin: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.next-step {
  /* Position */
  position: absolute;
  bottom: 0;

  /* Button Styles */
  background: #575ed8;
  color: #fff;
  font-size: 18px;
  border: 0;
  padding: 12px 0;
  width: 100%;
  border-radius: 0 0 2px 2px;
}

h3 h1 {
  font-family: Arial, sans-serif;
}

.submit-button {
  text-align: center;
  user-select: none;
  display: inline-block;
  margin: 0.5rem 0.5rem 1rem 0.5rem;
  clear: both;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  text-transform: initial;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  padding: 0 1rem;
  height: 36px;
  line-height: 36px;
  color: #fff;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  background: #454cad;
  border-color: #454cad;
  cursor: pointer;
}

input[type='file'] {
  display: none;
}
</style>
