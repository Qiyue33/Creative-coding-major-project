let seasons = [];
let perlinNoiseArray = [];
let valueArrayLength = 50;
let perlinNoiseStep = 0.1;
let snowflakes = [];
let isRacing = false;  // Reference code source: https://p5js.org/tutorials/repeating-with-loops/

function setup() {

  createCanvas(windowWidth, windowHeight);
  initializeSeasons();

  for (let i = 0; i < valueArrayLength; i += perlinNoiseStep) {

    perlinNoiseArray.push(noise(i));
  }
}

function draw() {
  background(120, 100, 160);

  if (!isRacing) {
    drawTexture();
  }
  drawQuadrantBorders();


  if (isRacing === true) {  // Reference code source: https://p5js.org/tutorials/repeating-with-loops/

    for (let season of seasons) {
      season.draw(true);
    }

    // Update and display each snowflake in the array
    let currentTime = frameCount / 60;
    for (let flake of snowflakes) {
      flake.update(currentTime);
      flake.display();
    }
  } else {

    // Display the start prompt
    writeStart();
  }
}

for (let season of seasons) {
  season.draw();
}

// Update and display each snowflake in the array
let currentTime = frameCount / 60;

for (let flake of snowflakes) {

  flake.update(currentTime);
  flake.display();
}

function writeStart() { // Reference code source: https://p5js.org/tutorials/repeating-with-loops/

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  noStroke();

  // Display prompt text
  text("Hi! click to start", width / 2, height / 2);

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

  // Draw an apple tree and a smiling face on the cover
  drawAppleTree(width * 0.1, height * 0.15, 80);
  drawAppleTree(width * 0.85, height * 0.75, 80);
  drawSmile(width * 0.5, height * 0.6, 100);
}

function drawAppleTree(x, y, size) {

  // Trunk
  fill(139, 69, 19);
  noStroke();
  rect(x - size * 0.05, y, size * 0.1, size * 0.4);

  // Body
  fill(50, 205, 50);
  ellipse(x, y - size * 0.2, size, size * 0.8);

  // Apple
  fill(255, 0, 0);
  ellipse(x - size * 0.2, y - size * 0.25, size * 0.15);
  ellipse(x + size * 0.15, y - size * 0.15, size * 0.15);
  ellipse(x, y - size * 0.1, size * 0.15);
  ellipse(x - size * 0.05, y - size * 0.3, size * 0.15);
}


function drawSmile(x, y, size) {

  // Face
  fill(255, 235, 59);
  noStroke();
  ellipse(x, y, size, size);

  // Eyes
  fill(0);
  ellipse(x - size * 0.2, y - size * 0.15, size * 0.12);
  ellipse(x + size * 0.2, y - size * 0.15, size * 0.12);
  fill(255);
  ellipse(x - size * 0.22, y - size * 0.18, size * 0.04);
  ellipse(x + size * 0.18, y - size * 0.18, size * 0.04);

  // Mouse
  fill(255, 87, 34);
  arc(x, y + size * 0.1, size * 0.4, size * 0.3, 0, PI);
}


function mousePressed() {  // Reference code source: https://p5js.org/tutorials/repeating-with-loops/
  isRacing = true;
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeasons();
}

