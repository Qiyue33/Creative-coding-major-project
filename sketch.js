let springColor, summerColor, autumnColor, winterColor;
let seasons = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  springColor = color(70, 180, 100); 
  summerColor = color(230, 80, 70); 
  autumnColor = color(220, 180, 60); 
  winterColor = color(70, 120, 200);  

    initializeSeasons(); 
  noLoop();
}

function draw() {
  background(100, 120, 140);
  drawTexture();
  drawQuadrantBorders(); // Draw the quadrant border

  
  for (let season of seasons) {
    season.draw();
  }
}

// Initialize the four quadrants
function initializeSeasons() {
  const quadrantWidth = width / 2;
  const quadrantHeight = height / 2;

  seasons.push(new Spring(0, 0, quadrantWidth, quadrantHeight)); 
  seasons.push(new Summer(quadrantWidth, 0, quadrantWidth, quadrantHeight)); 
  seasons.push(new Autumn(0, quadrantHeight, quadrantWidth, quadrantHeight)); 
  seasons.push(new Winter(quadrantWidth, quadrantHeight, quadrantWidth, quadrantHeight)); 
}

// Initialize the four quadrants
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


class Season {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.cx = x + width / 2; 
    this.cy = y + height / 2; 
  }

  draw() {} 
  doubleColorCircle(x, y, diameter, color1, color2) { 
    noStroke();
    fill(color1);
    arc(x, y, diameter, diameter, HALF_PI, HALF_PI * 3, PIE);
    fill(color2);
    arc(x, y, diameter, diameter, -HALF_PI, HALF_PI, PIE);
  }
}

// Spring
class Spring extends Season {
  draw() {}
}

// Summer
class Summer extends Season {
  draw() {} 
}

// Autumn
class Autumn extends Season {
  draw() {} 
}

// Winter
class Winter extends Season {
  draw() {} 
}

// Window adaptation
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeasons();
}
