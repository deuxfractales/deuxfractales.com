var express = require('express');
var http = require('http');
var ws = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new ws.Server({ server });

app.use(express.static('public'));

const PI = 3.14159265;

const drawings = {
  maurerRose: function (n, d) {
    for (
      let theta = 0;
      theta <= 360 /* we're working with degrees, remember? */;
      theta++
    ) {
      let k = (theta * d * Math.PI) / 180;
      let r = 300 * Math.sin(n * k);
      let x = -r * Math.cos(k);
      let y = -r * Math.sin(k);
      ctx.lineTo(x, y);
      ctx.moveTo(x, y);
    }
  },
  roseCurve: function (n, d) {
    var k = n / d;

    const points = [];
    for (var a = 0; a < PI * 2 * d; a += 0.02) {
      var r = 200 * Math.cos(k * a);
      var x = r * Math.cos(a);
      var y = r * Math.sin(a);
      var data = {
        x: x,
        y: y,
      };
      points.push(data);
    }
    return points;
  },
  juliaSet: function (x, y) {
    const pointsJ= [];
    let z= x;
    let ca= -0.8;
    let cb= 0.156;
    let d= y;
    for(let a = 0; a < 50; a += 0.1) {
      // let d= 0;
      let z_new= z*z - d*d+ ca;
      let b_new= 2*z*d + cb;
      z= z_new;
      d= b_new;
      let dataJ = {
        x: z_new,
        y: b_new,
      };
      pointsJ.push(dataJ);
      // console.log(dataJ);
    }
    return pointsJ;
  },
  musicNote: function () {
    return [
      { x: 193, y: 47 },
      { x: 140, y: 204 },
      { x: 123, y: 193 },
      { x: 99, y: 189 },
      { x: 74, y: 196 },
      { x: 58, y: 213 },
      { x: 49, y: 237 },
      { x: 52, y: 261 },
      { x: 65, y: 279 },
      { x: 86, y: 292 },
      { x: 113, y: 295 },
      { x: 135, y: 282 },
      { x: 152, y: 258 },
      { x: 201, y: 95 },
      { x: 212, y: 127 },
      { x: 218, y: 150 },
      { x: 213, y: 168 },
      { x: 201, y: 185 },
      { x: 192, y: 200 },
      { x: 203, y: 214 },
      { x: 219, y: 205 },
      { x: 233, y: 191 },
      { x: 242, y: 170 },
      { x: 244, y: 149 },
      { x: 242, y: 131 },
      { x: 233, y: 111 },
    ];
  },
  // juliaSet(1,3);
};

drawings.juliaSet(1, 3);
wss.on('connection', (ws) => {
  //connection is up, let's add a simple simple event
  ws.on('message', (message) => {
    const messageParsed = JSON.parse(message);
    console.log(messageParsed);
    if (messageParsed.type == 'getpoints') {
      ws.send(
        JSON.stringify({
          points: drawings.roseCurve(14, 9),
          id: messageParsed.id,
        })
      );
    }
  });
});

//start our server
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
