var socket
var n = 2
var d = 14
var k = n / d

var minval = -0.5;
var maxval = 0.5;

var minSlider;
var maxSlider;

var x;
var y;
// var z= x;
var ca= -0.8;
var cb= 0.156;
var frDiv;
// var d= y;

function setup() {
    createCanvas(400, 400);
    pixelDensity(1);

    // minSlider = createSlider(-2.5, 0, -2.5, 0.01);
//   maxSlider = createSlider(0, 2.5, 2.5, 0.01);

    frDiv = createDiv('');
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

    var maxiterations = 100;

    loadPixels();
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        var a = map(x, 0, width, -2.5, 2.5);
        var b = map(y, 0, height, -2.5, 2.5);
  
        var ca = -0.8;
        var cb = 0.156;
  
        var n = 0;
  
        while (n < maxiterations) {
          var aa = a * a - b * b;
          var bb = 2 * a * b;
          a = aa + ca;
          b = bb + cb;
          if (a * a + b * b > 16) {
            break;
          }
          n++;
        }
  
        var bright = map(n, 0, maxiterations, 0, 1);
        bright = map(sqrt(bright), 0, 1, 0, 255);
  
        if (n == maxiterations) {
          bright = 0;
        }
  
        var pix = (x + y * width) * 4;
        pixels[pix + 0] = bright;
        pixels[pix + 1] = bright;
        pixels[pix + 2] = bright;
        pixels[pix + 3] = 255;
      }
    }
    updatePixels();
  
    frDiv.html(floor(frameRate()));
    // for (var a = 0; a < TWO_PI * d; a += 0.02) {
    //     var r = 200 * cos(k * a);
    //     var x = r * cos(a);
    //     var y = r * sin(a);
    //     vertex(x,y);
        // var data = {
        //     x: x,
        //     y: y
        // }

    // }

    // for (var a = 0; a < TWO_PI * d; a += 0.02) {
            // var r = 200 * cos(k * a);
            // x = a*a+ ca;
            // y = 2*a + cb;
            // vertex(x ,y);
            // var data = {
            //     x: x,
            //     y: y
            // }
    
    // }

    // for(var a = 0; a < 5; a += 0.1) {
    //   // let d= 0;
    //   var z_new= a*a - d*d;
    //   var b_new= 2*a*d ;
    // //   z= z_new;
    // //   d= b_new;
    //   vertex(z_new,b_new);
    //   var dataJ = {
    //     x: z_new,
    //     y: b_new,
    //   };
    // }
    // endShape(close);
}
