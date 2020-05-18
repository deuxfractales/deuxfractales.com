export default {
  methods: {
    async setup(sketch) {
      let height = this.$refs.p5.$el.clientHeight;
      let width = this.$refs.p5.$el.clientWidth;
      sketch.resizeCanvas(width, height);

      this.p5 = sketch

      while (this.$socket.readyState != 1) {
        console.log('Waiting');
        await new Promise((r) => setTimeout(r, 10));
      }

      this.$socket.send(JSON.stringify({
        type: 'getpoints',
        graphic: this.graphic,
        id: this.product.id
      }));
    }
  }
};
