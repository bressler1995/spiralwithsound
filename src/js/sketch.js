// let number = 5000;                              // number of shapes to draw
// let size = 50;                                 // size of each shape
// let stepSize = 1;                               // size of each step
// let opacity = 25;                               // color opacity [0-255]
// let animate = true;                            // control animation [true or false]
// let time = 0;
// let spiralcolors = [[], [], []];
let spirals = [];
let sounds = [];
let ready = true;
let mouseActive = false;
let mouseValue = 0;
let mouseMax = 30;

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  frameRate(120);
  setTimeout(function(){
    spirals.push(new spiral(0, 0, 3.0));
  }, 500);
  
}

function draw() {
  
  camera(0, 0, (height/2.0) / tan(PI*30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  // console.log(frameCount);
  background(0);
  for (i = 0; i < spirals.length; i++) {
    spirals[i].show(frameCount, 0, sounds.length);
  }

  push();
  ellipseMode(CENTER);
  translate(-windowWidth / 2, -(windowHeight / 2));
  rotate(0);
  fill(255, 255, 255, mouseValue);
  ellipse(mouseX, mouseY, 30);
  if (mouseActive) {
    if (mouseValue < 70) {
      mouseValue += 1;
    }
    
  } else {
    if (mouseValue > 0) {
      mouseValue -= 1;
    }
  }

  pop();
  
}

function mousePressed() {
  
    console.log(spirals);
}

function mousePressed() {

  if(ready == true) {
    userStartAudio();
    var wave;
    var indexwave;
    wave = new p5.Oscillator();
    if(mouseX < windowWidth / 2 && mouseY < windowHeight / 2) {
      wave.setType('triangle');
    } else if(mouseX >= windowWidth / 2 && mouseY < windowHeight / 2) {
      wave.setType('sine');
    } else if(mouseX < windowWidth / 2 && mouseY >= windowHeight / 2) {
      wave.setType('sawtooth');
    } else if(mouseX >= windowWidth / 2 && mouseY >= windowHeight / 2) {
      wave.setType('square');
    }
    wave.start();
    wave.freq(random(100, 1200));
    wave.amp(random(50, 100) / 1000, 1);
    sounds.push(wave);
    ready = false;
    setTimeout(function() {
      wave.amp(0, 5);
      sounds.pop();

    }, round(random(1000, 5000)));
    setTimeout(function() {
      ready = true;
    }, 100);
  } 

  
}

function mouseMoved() {
  let tempX = mouseX;
  let tempY = mouseY;
  mouseActive = true;

  setTimeout(function() {
    if(tempX == mouseX && tempY == mouseY) {
      mouseActive = false;
    }
    
  }, 500);
}