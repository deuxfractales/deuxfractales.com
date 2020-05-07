var socket
var n = 2
var d = 14
var k = n / d

// let x = 0.1
// let y = 0.3
// let z= x;
// let ca= -0.8;
// let cb= 0.156;
// let d= y;

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
        // var data = {
        //     x: x,
        //     y: y
        // }

    }

    // for(let a = 0; a < 50; a += 0.1) {
    //   // let d= 0;
    //   let z_new= z*z - d*d+ ca;
    //   let b_new= 2*z*d + cb;
    //   z= z_new;
    //   d= b_new;
    //   vertex(z_new,b_new)
    //   let dataJ = {
    //     x: z_new,
    //     y: b_new,
    //   };
    // }
    endShape(close);
}
