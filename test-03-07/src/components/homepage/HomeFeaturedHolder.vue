<template>
    <div id="w-node-3c6e0d08d641-edd6561d" class="featured-holder">
        <div class="beatContainer">
            <vue-p5 class="p5" @setup="setup"></vue-p5>
            <div class="beatInfo">
                <h1>Hi</h1>
            </div>
        </div>
    </div>
</template>

<script>
    import VueP5 from 'vue-p5'
    export default {
        name: "HomeFeaturedHolder",
        components: {
          "vue-p5": VueP5
        },
        methods:{
            async setup(sketch) {
              sketch.resizeCanvas(1000, 1000);

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

                sketch.text('Hello p5!', 20, 20);
              }
              this.$socket.send('getpoints')
            }
        }
    }
</script>

<style scoped>

</style>
