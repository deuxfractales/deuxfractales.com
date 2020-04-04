export default {
  methods: {
    async setup(sketch) {
      let height = this.$refs.p5.clientHeight;
      let width = this.$refs.p5.clientWidth;
      sketch.resizeCanvas(width, height);

      while (this.$socket.readyState != 1) {
        console.log('Waiting');
        await new Promise((r) => setTimeout(r, 10));
      }

      this.$socket.onmessage = function (res) {
        const points = JSON.parse(res.data);
        sketch.background(220);
        sketch.translate(sketch.width / 2, sketch.height / 2);

        sketch.beginShape();
        sketch.noFill();
        sketch.stroke(255);
        sketch.strokeWeight(1);
        sketch.beginShape();

        sketch.vertex(points[points.length - 1].x, points[points.length - 1].y);

        points.forEach((point) => {
          sketch.vertex(point.x, point.y);
        });

        sketch.endShape(close);
      };
      this.$socket.send('getpoints');
    },
  },
};
