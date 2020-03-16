var socket
var n = 2
var d = 9
var k = n / d

function setup() {
    createCanvas(400, 400);
    // socket = io.connect('http://localhost:3000')
    // socket.on('shape', newDrawing)
}
// For drawing the new shape

// function newDrawing(){
//     background(220);
//     translate(width / 2, width / 2)
//     beginShape();
//     noFill();
//     stroke(255);
//     strokeWeight(1);
//     beginShape();
//     forEach(/* for each object(containing x and y) in array */){
//         // let x = x in object
//         // let y = y in object
//         // vertex(x,y)
//     }
//     endshape(close)
// }

function draw() {
    background(220);
    translate(width / 2, width / 2)
    beginShape();
    noFill();
    stroke(255);
    strokeWeight(1);
    for (var a = 0; a < TWO_PI * d; a += 0.02) {
        var r = 200 * cos(k * a);
        var x = r * cos(a);
        var y = r * sin(a);
        vertex(x,y);
        var data = {
            x: x,
            y: y
        }
        //socket.emit('shape', data)
    }
    endShape(close);
}
