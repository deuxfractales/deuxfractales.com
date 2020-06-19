<template>
  <div class="formsection">
    <div class="formholder">
      <form ref="form" enctype="multipart/form-data" method="POST" on:submit.prevent="onSubmit">
        <div v-if="formSubmitted">
          <ul>
            <li v-for="message in invalidFormMessages" v-bind:key="message">{{message}}</li>
          </ul>
        </div>

        <h1 style="text-align:center">Upload Beat</h1>
        <div>
          <h3>Add Mp3 File</h3>
          <label
            v-bind:style="!mp3File && formSubmitted  ? 'background: #FF0000;' : ''"
            class="submit-button"
            required
          >
            <input
              ref="mp3File"
              type="file"
              style="display:none;"
              placeholder="MP3 file"
              accept=".mp3, .mp4"
              v-on:change="handleMp3"
            />
            <span>Choose File</span>
          </label>
          <span>{{this.mp3File.name}}</span>

          <h3>Add Wav File</h3>
          <label
            v-bind:style="!wavFile && formSubmitted  ? 'background: #FF0000;' : ''"
            class="submit-button"
          >
            <input
              required
              ref="wavFile"
              type="file"
              style="display:none;"
              placeholder="WAV file"
              accept=".wav"
              v-on:change="handleWav"
            />
            <span>Choose File</span>
          </label>
          <span>{{this.wavFile.name}}</span>

          <h3>Add Stems in ZIP file</h3>
          <label
            v-bind:style="!zipFile && formSubmitted  ? 'background: #FF0000;' : ''"
            class="submit-button"
          >
            <input
              ref="zipFile"
              type="file"
              style="display:none;"
              placeholder="ZIP file"
              accept=".zip"
              v-on:change="handleZip"
            />
            <span>Choose File</span>
          </label>
          <span>{{this.zipFile.name}}</span>
          <div>
            <div></div>
          </div>
          <div>
            <h3>Beat Name</h3>
          </div>
          <input
            placeholder="What is the name of your beat?"
            v-bind:style="!beatName && formSubmitted ? 'box-shadow: 0 0 3px #FF0000;' : '' "
            name="beatInput"
            v-model="beatName"
            type="text"
            required
          />
        </div>

        <div>
          <div>
            <h3>Genre</h3>
          </div>
          <select
            v-bind:style="!genre && formSubmitted  ? 'box-shadow: 0 0 3px #FF0000;' : '' "
            ref="genreSelect"
            v-model="genre"
            requred
          >
            <option disabled selected value>Choose Genre</option>
            <option :genre="genre" v-for="genre in genreOptions" v-bind:key="genre">{{genre}}</option>
          </select>
        </div>

        <div>
          <div>
            <h3>Related Artist</h3>
          </div>
          <select
            v-bind:style="!relatedArtist && formSubmitted  ? 'box-shadow: 0 0 3px #FF0000;' : '' "
            ref="relatedArtistSelect"
            v-model="relatedArtist"
            required
          >
            <option disabled selected="selected" value>Choose Related Artist</option>
            <option
              :relatedArtist="relatedArtist"
              v-for="artist in artistOptions"
              v-bind:key="artist"
            >{{artist}}</option>
          </select>
        </div>
      </form>
      <button class="next-step" @click="submitForm">SUBMIT</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {

created:function(){
    
    axios.all([
        axios.get(`http://${process.env.VUE_APP_IP}:3001/db/genres`), // returns list of all genres avaiable in genre and beatz schema
        axios.get(`http://${process.env.VUE_APP_IP}:3001/db/artists`) // returns list of all genres avaiable in artists schema 
    ])
    .then(responseArr=>{
        
        for(let genre of responseArr[0].data){
        this.genreOptions.push(genre.genre)
        }
        for(let artist of responseArr[1].data){
        this.artistOptions.push(artist.artist_name)
        }
    })
},


    name:"Upload",
    data:function(){
        return{
            beatName:'',
            kValue : this.generatekdValue(1,21),
            dValue:this.generatekdValue(1,21),
            genreOptions:[],
            artistOptions:[],
            wavFile:"",
            mp3File:"",
            zipFile:"",
            genre:"",
            relatedArtist:"",
            formSubmitted:false,
            invalidFormMessages:[]
        }
    },
    computed:{
      formIsValid:function(){
        
        let beatDataFilled = this.beatName && this.genre && this.relatedArtist
        let allFilesAdded = this.mp3File && this.wavFile && this.zipFile

        return (beatDataFilled && allFilesAdded)
      }
    },
    methods:{
      
        generatekdValue(min,max){
           
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
        ,
        handleMp3: function (event) {
           console.log(event.target.files[0]);
            this.mp3File = event.target.files[0]
          //  this.mp3File.name = "wow"
        },
        handleWav: function (event) {
           console.log(event.target.files[0]);
            this.wavFile = event.target.files[0]
          // this.wavFile.name = "wow"
        },
        handleZip: function (event) {
           console.log(event.target.files[0]);
            this.zipFile = event.target.files[0]
          
           // this.zipFile.name = "wow"
        },
        checkFormInput: function(){
          console.log(this.$refs.form)
          this.invalidFormMessages = []
          if(this.$refs.form["beatInput"].value == ""){
        
            this.$refs.form["beatInput"].placeholder = "Beat Name Required"
            this.invalidFormMessages.push("Beat Name Required")
          }

          if(!this.genre){
             this.invalidFormMessages.push("Genre Required")
          }

          if(!this.relatedArtist){
             this.invalidFormMessages.push("Related Artist Required")
          }

          if(!this.mp3File){
            this.invalidFormMessages.push("Mp3 File not uploaded")
          }

         if(!this.wavFile){
            this.invalidFormMessages.push("Wav File not uploaded")
          }

          if(!this.zipFile){
            this.invalidFormMessages.push("Zip file not uploaded")
          }
           
        },


        submitForm: function(event){
             
             this.formSubmitted = true;

             let beatData = new FormData();
             let mp3FileData = new FormData();
             let wavFileData = new FormData();
             let zipFileData = new FormData();
 
              mp3FileData.append('mp3',  new File([this.mp3File],this.beatName+".mp3",{type:this.mp3File.type}));
              wavFileData.append('wav', new File([this.wavFile],this.beatName+".wav",{type:this.wavFile.type}));
              zipFileData.append('zip', new File([this.zipFile],this.beatName+".zip",{type:this.zipFile.type}));

              beatData.append('k',this.kValue);
              beatData.append('d',this.dValue)
              beatData.append('genre',this.genre)
              beatData.append('relatedArtist',this.relatedArtist)
              beatData.append('beatName',this.beatName)
     


          if(this.formIsValid){
                this.invalidFormMessages = [];
                   // sends information about the beats which get stored in the database
                  axios
                  .post(`http://${process.env.VUE_APP_IP}:3001/db/upload`, beatData, {
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

        
                 // sends the mp3,wav and zip files to server 
                  axios
                  .post(`http://${process.env.VUE_APP_IP}:3001/beats/mp3`, mp3FileData, {
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

                  axios
                      .post(`http://${process.env.VUE_APP_IP}:3001/beats/wav`, wavFileData, {
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
      
                  axios
                  .post(`http://${process.env.VUE_APP_IP}:3001/beats/stems`, zipFileData, {
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
      

              }   
              else{
                

                this.checkFormInput()
                

              }
      
            }
      }
}

</script>

<style>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.form__input {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 90%;
  display: block;
  border-bottom: 0.3rem solid transparent;
  transition: all 0.3s;
}

.form__label {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  margin-left: 2rem;
  margin-top: 0.5rem;
  display: block;
  transition: all 0.3s;
  transform: translateY(0rem);
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

input,
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.next-step {
  /* Position */
  position: relative;
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
</style>