<template>
    <div id="w-node-3c6e0d08d641-edd6561d" class="featured-holder">
        <div ref="p5" class="beatcontainer">
            <vue-p5 class="p5" @setup="setup"></vue-p5>
            <div class="beatinfo">
                <div class="beattitle">Title</div>
                <div id="w-node-e9c14a1e787a-edd6561d" class="div-block">
                    <div class="beatgenre">Genre</div>
                    <div class="beattags">Tags</div>
                </div>
                <div id="w-node-7b98ada7c7b9-edd6561d" class="p5waveform">Waveform</div>
                <div id="w-node-8a1d5bef07c2-edd6561d" class="buyprice">BUY $150</div>
                <!--Need to change buyText to playButton, it's already changed in webflow but needs to be changed here during the next css import-->
                <button id="w-node-1f91bc0acfe7-edd6561d" v-on:click="playSong" class="buytext" ></button>
            </div>
        </div>
    </div>
</template>

<script>
    import VueP5 from 'vue-p5'
    export default {
        name: "HomeFeaturedHolder",
        data: function () {
            fb1: ''
        },
        components: {
          "vue-p5": VueP5
        },
        methods:{
            playSong: function (event){
                if (event){
                    //play song
                    this.beat = "pause"
                } else {
                    this.beat = "playing"
                }
            },
            async setup(sketch) {
                let height = this.$refs.p5.clientHeight
                let width = this.$refs.p5.clientWidth
              sketch.resizeCanvas(width,height);
                console.log(height,width)


              while (this.$socket.readyState != 1) {
                console.log("Waiting")
                await new Promise(r => setTimeout(r, 10));
              }

              this.$socket.onmessage = function(res) {
                const points = JSON.parse(res.data)
                  sketch.background(220);
                  sketch.translate(sketch.width / 2, sketch.height / 2)

                sketch.beginShape();
                sketch.noFill();
                sketch.stroke(255);
                sketch.strokeWeight(1);
                sketch.beginShape();

                sketch.vertex(points[points.length-1].x,points[points.length-1].y);

                points.forEach((point) => {
                    sketch.vertex(point.x,point.y);
                })

                sketch.endShape(close)
              }
              this.$socket.send('getpoints')
            }
        }
    }
</script>

<style scoped>

</style>
