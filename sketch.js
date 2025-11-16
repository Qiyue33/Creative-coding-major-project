let seasons = [];
let snowflakes = [];
let song1, song2, song3, song4;
let analyser1, analyser2, analyser3, analyser4;
let button1, button2, button3, button4;


function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeSeasons();

  analyser1 = new p5.Amplitude();
  analyser2 = new p5.Amplitude();
  analyser3 = new p5.Amplitude();
  analyser4 = new p5.Amplitude();
  
  analyser1.setInput(song1);
  analyser2.setInput(song2);
  analyser3.setInput(song3);
  analyser4.setInput(song4);
 
  button1 = createButton("Spring");
  button2 = createButton("Summer");
  button3 = createButton("Autumn");
  button4 = createButton("Winter");
  
  button1.position(width * 0.21 , height * 0.45);
  button2.position(width * 0.71 , height * 0.45);
  button3.position(width * 0.21 , height * 0.95);
  button4.position(width * 0.71 , height * 0.95);
  
  button1.mousePressed(playPause1);
  button2.mousePressed(playPause2);
  button3.mousePressed(playPause3);
  button4.mousePressed(playPause4);

  // Create snowflake objects
  for (let i = 0; i < 300; i++) {
    // Add a new snowflake object to the array
    snowflakes.push(new Snowflake());

}}

function draw() {
  background(100, 120, 140);
  drawTexture();
  drawQuadrantBorders();
  drawSpringCricle();
  
  for (let season of seasons) {
    season.draw();
 }
  drawWinterCricle();
  
  // Update and display each snowflake in the array
  let currentTime = frameCount / 60;

  for (let flake of snowflakes) {

    flake.update(currentTime);
    flake.display();
  }
  
}


// Initialize the four quadrants
function initializeSeasons() {
  seasons = [];
  const quadrantWidth = width / 2;
  const quadrantHeight = height / 2;
  seasons.push(new Spring(0, 0, quadrantWidth, quadrantHeight)); 
  seasons.push(new Summer(quadrantWidth, 0, quadrantWidth, quadrantHeight)); 
  seasons.push(new Autumn(0, quadrantHeight, quadrantWidth, quadrantHeight)); 
  seasons.push(new Winter(quadrantWidth, quadrantHeight, quadrantWidth, quadrantHeight)); 
}

// Draw the boundary lines of the quadrants
function drawQuadrantBorders() {
  noFill();
  stroke(255, 80);
  line(width / 2, 0, width / 2, height);
  line(0, height / 2, width, height / 2);
}

// Background texture
function drawTexture() {
  stroke(255, 30);
  for (let i = 0; i < 8000; i++) {
    point(random(width), random(height));
  }
}




function preload() {
  song1 = loadSound('assets/Spring.mp3');
  song2 = loadSound('assets/Summer.mp3');
  song3 = loadSound('assets/Autumn.mp3');
  song4 = loadSound('assets/Winter.mp3');
}


function drawSpringCricle() {
  
  let rms = analyser1.getLevel();
  fill(200);
  // Draw an ellipse with size based on volume
  ellipse(width * 0.10 , height * 0.2, 30 + rms * 200, 30 + rms * 200);
  ellipse(width * 0.20 , height * 0.2, 10 + rms * 200, 10 + rms * 200);
  ellipse(width * 0.30 , height * 0.2, 10 + rms * 100, 10 + rms * 100);
  ellipse(width * 0.40 , height * 0.2, 30 + rms * 100, 30 + rms * 100);
  ellipse(width * 0.15 , height * 0.1, 30 + rms * 100, 30 + rms * 100);
  ellipse(width * 0.35 , height * 0.1, 30 + rms * 100, 30 + rms * 100);
}

function drawWinterCricle() {
  
  let rms = analyser4.getLevel();
  fill(0);

  for (let i = 0; i < 100; i++) {
  // Cricle of water
  fill(255, 100 - i*20); 
  ellipse(width*0.735, height*0.63, 5 + rms*300 + i*20);
}
}


function playPause1() {
  
  song2.stop();
  song3.stop();
  song4.stop();

  if (song1.isPlaying()) {
    song1.stop();
  } else {
    song1.loop();
  }
}

function playPause2() {

  song1.stop();
  song3.stop();
  song4.stop();

  if (song2.isPlaying()) {
    song2.stop();
  } else {
    song2.loop();
  }
}

function playPause3() {

  song1.stop();
  song2.stop();
  song4.stop();

  if (song3.isPlaying()) {
    song3.stop();
  } else {
    song3.loop();
  }
}

function playPause4() {

  song1.stop();
  song2.stop();
  song3.stop();

  if (song4.isPlaying()) {
    song4.stop();
  } else {
    song4.loop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeasons();

  button1.position(width * 0.21 , height * 0.45);
  button2.position(width * 0.71 , height * 0.45);
  button3.position(width * 0.21 , height * 0.95);
  button4.position(width * 0.71 , height * 0.95);
}

