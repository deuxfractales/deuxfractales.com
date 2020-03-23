var express = require('express');
var http = require('http');
var ws = require('ws')

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new ws.Server({ server });

app.use(express.static('public'))


const PI = 3.14159265

const drawings = {
  og: function(n, d) {
    var k = n / d

    const points = [];
    for (var a = 0; a < PI*2 * d; a += 0.02) {
        var r = 200 * Math.cos(k * a);
        var x = r * Math.cos(a);
        var y = r * Math.sin(a);
        var data = {
            x: x,
            y: y
        }
        points.push(data)
    }
    return points;
  },
  musicNote: function() {
    return [
      { x: 193, y: 47},
      { x: 140, y: 204},
      { x: 123, y: 193},
      { x: 99, y: 189},
      { x: 74, y: 196},
      { x: 58, y: 213},
      { x: 49, y: 237},
      { x: 52, y: 261},
      { x: 65, y: 279},
      { x: 86, y: 292},
      { x: 113, y: 295},
      { x: 135, y: 282},
      { x: 152, y: 258},
      { x: 201, y: 95},
      { x: 212, y: 127},
      { x: 218, y: 150},
      { x: 213, y: 168},
      { x: 201, y: 185},
      { x: 192, y: 200},
      { x: 203, y: 214},
      { x: 219, y: 205},
      { x: 233, y: 191},
      { x: 242, y: 170},
      { x: 244, y: 149},
      { x: 242, y: 131},
      { x: 233, y: 111}
    ]
  }
}


wss.on('connection', (ws) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        if (message == "getpoints") {
          ws.send(JSON.stringify(drawings.og(12, 9)));
        }
    });
});

//start our server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

