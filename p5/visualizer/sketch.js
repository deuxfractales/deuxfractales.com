var song;
var fft;
var w;
function preload(){
    song = loadSound('test1.mp3');
}

function setup() {
    createCanvas(400, 400);
    song.play();
    fft = new p5.FFT(0, 64);
    w = width / 64
}

function draw() {
    background(0);
    var spectrum = fft.analyze();
    for (var i=0; i < spectrum.length; i++){
        stroke(255)
        var amp = spectrum[i]
        var y = map(amp, 0, 300, height, 0);
        rect(i*w,y,w, height - y)
    }
    stroke(255);
    noFill();
}
