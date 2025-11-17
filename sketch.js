// Arrays to hold seasonal animations and snowflakes
let seasons = [];
let snowflakes = [];

//Counter for switching seasons and interval between switches(this code is based on the Week 5 tutorial concepts of automating a periodic task.)
let counter = 0;
let interval = 2000;//Seasonal switching interval 

// Should a random circle background be displayed
let showRandomLine = false;

// Declare global variables for circle positions(this code is based on the Week 6 tutorial concepts of a 'random walker' generative artwork.)
let circlePositions = [];
let numCircles = 3;
let maxLineLength = 20;

//Declare global variables for RGB colour values
let r;
let g;
let b;
let randomBgColor;

//Tree fluctuation range
let treeAmplitude = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeSeasons();

  // Create snowflake objects
  for (let i = 0; i < 300; i++) {
    snowflakes.push(new Snowflake());
  }

  // Initialise circle positions to canvas centeromly set the initial RGB values between 0 and 255
  r = random(255);
  g = random(255);
  b = random(255);

  for (let i = 0; i < numCircles; i++) {
    circlePositions.push({ x: width / 2, y: height / 2, d: random(10, 50) });
  }

  randomBgColor = color(random(255), random(255), random(255));

  // Seasons change every 2 seconds
  setInterval(drawNextSeason, interval);

  // The background color changes every 3 seconds
  setInterval(changeRandomBgColor, 3000);

  // The position of the random circle is updated every 0.3 seconds
  setInterval(updateRandomCirclePosition, 300);

}


function draw() {
  // Display random circle background stage
  if (showRandomLine) {
    background(randomBgColor, 10);

    // Draw random circles
    noStroke();
    for (let c of circlePositions) {
      fill(random(255), random(255), random(255), 200);
      ellipse(c.x, c.y, c.d);
    }

    // Trees floating up and down
    treeY = height / 2 + sin(frameCount * 0.02) * treeAmplitude;
    drawTree(width / 2, treeY);

    return;
  }

  // Seasonal animation stage
  background(100, 120, 140);
  drawTexture();

  if (seasons[counter]) {
    seasons[counter].draw();// Draw the current season
  }

  // Update and display each snowflake in the array
  let currentTime = frameCount / 60;
  for (let flake of snowflakes) {
    flake.update(currentTime);
    flake.display();
  }
}

// Update positions of random circles 
function updateRandomCirclePosition() {
  for (let c of circlePositions) {
    c.x = constrain(c.x + random(-maxLineLength, maxLineLength), 0, width);
    c.y = constrain(c.y + random(-maxLineLength, maxLineLength), 0, height);
    c.d = random(10, 50);
  }
}

// Change random background color
function changeRandomBgColor() {
  randomBgColor = color(random(255), random(255), random(255));
}

function drawNextSeason() {
  counter++;
  if (counter >= seasons.length) {
    showRandomLine = true; // A random background will be displayed after the four seasons end.
    seasons = [];
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

// Background texture
function drawTexture() {
  stroke(255, 30);
  for (let i = 0; i < 2000; i++) {
    point(random(width), random(height));
  }
}

// Draw a random circle
function drawRandomCircle() {

  for (let i = 0; i < 3; i++) {
    let nextX = xPos + random(-maxLineLength, maxLineLength);
    let nextY = yPos + random(-maxLineLength, maxLineLength);
    // Constrain within virtual canvas bounds
    nextX = constrain(nextX, 0, width);
    nextY = constrain(nextY, 0, height);

    r = constrain(r, 0, 255);
    g = constrain(g, 0, 255);
    b = constrain(b, 0, 255);

    noStroke();
    fill(random(255), random(255), random(255), 200);
    let d = random(10, 50);
    ellipse(nextX, nextY, d);

    xPos = nextX;
    yPos = nextY;

  }
}

// Draw a tree after the four seasons of the cycle ended
function drawTree(cx, cy) {
  drawBase(cx, cy);
  drawStem(cx, cy);
  drawBranches(cx, cy);
}

function drawBase(cx, cy) {
  noStroke();
  fill(150, 200, 150);
  rect(cx - 120, cy + 60, 40, 40);
  fill(100, 105, 255);
  rect(cx - 80, cy + 60, 80, 40);
  fill(150, 200, 150);
  rect(cx, cy + 60, 40, 40);
}

function drawStem(cx, cy) {
  const stemY = [cy + 40, cy, cy - 40, cy - 80, cy - 120];
  for (let y of stemY) {
    doubleColorCircle(cx - 20, y, 40, color(255, 255, 255), color(50, 100, 150));
  }
}

function drawBranches(cx, cy) {
  // Draw brown connected branches (Winter: cool brown)
  stroke(240, 240, 240);
  strokeWeight(3);

  // The brown branch on the left
  line(cx - 130, cy - 40, cx - 160, cy - 80);
  line(cx - 160, cy - 80, cx - 180, cy - 120);
  line(cx - 180, cy - 120, cx - 180, cy - 150);
  line(cx - 130, cy - 40, cx - 130, cy - 80);
  line(cx - 130, cy - 40, cx - 80, cy - 40);
  line(cx - 80, cy - 40, cx - 80, cy - 80);
  line(cx - 80, cy - 80, cx - 50, cy - 150);
  line(cx - 50, cy - 150, cx - 50, cy - 180);

  // A brown branch connected to the trunk on the left
  line(cx - 40, cy - 6, cx - 80, cy - 40);

  // The brown branch on the right
  line(cx + 40, cy - 40, cx + 90, cy - 80);
  line(cx + 90, cy - 80, cx + 80, cy - 120);
  line(cx + 80, cy - 120, cx + 110, cy - 150);
  line(cx + 110, cy - 150, cx + 110, cy - 180);
  line(cx + 40, cy - 40, cx + 40, cy - 80);

  // A brown branch connected to the trunk on the right
  line(cx + 0, cy - 5, cx + 40, cy - 40);

  noStroke();

  // Left branch
  doubleColorCircle(cx - 130, cy - 40, 40, color(50, 100, 150), color(255, 255, 255));
  doubleColorCircle(cx - 160, cy - 80, 30, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx - 180, cy - 120, 25, color(50, 100, 150), color(255, 255, 255));
  doubleColorCircle(cx - 180, cy - 150, 20, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx - 130, cy - 80, 22, color(255, 255, 255), color(50, 100, 150));


  // Middle branch
  doubleColorCircle(cx - 80, cy - 40, 40, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx - 80, cy - 80, 28, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx - 50, cy - 150, 25, color(50, 100, 150), color(255, 255, 255));
  doubleColorCircle(cx - 50, cy - 180, 20, color(255, 255, 255), color(50, 100, 150));

  // Right branch
  doubleColorCircle(cx + 40, cy - 40, 40, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx + 90, cy - 80, 40, color(50, 100, 150), color(255, 255, 255));
  doubleColorCircle(cx + 80, cy - 120, 32, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx + 110, cy - 150, 28, color(50, 100, 150), color(255, 255, 255));
  doubleColorCircle(cx + 110, cy - 180, 22, color(255, 255, 255), color(50, 100, 150));
  doubleColorCircle(cx + 40, cy - 80, 22, color(50, 100, 150), color(255, 255, 255));

}

function doubleColorCircle(x, y, d, c1, c2) {
  fill(c1);
  ellipse(x, y, d);
  fill(c2);
  ellipse(x + d * 0.1, y - d * 0.1, d * 0.9);
}

// Adjust canvas size dynamically when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeasons();
}
