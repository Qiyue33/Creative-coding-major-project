let seasons = [];
let snowflakes = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeSeasons();

  // Create snowflake objects
  for (let i = 0; i < 300; i++) {
    // Add a new snowflake object to the array
    snowflakes.push(new Snowflake());
  }
}

function draw() {
  background(100, 120, 140);
  drawTexture();
  drawQuadrantBorders();


  for (let season of seasons) {
    season.draw();
  }

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


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeasons();
}

