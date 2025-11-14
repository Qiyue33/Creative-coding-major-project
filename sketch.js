let seasons = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  initializeSeasons();
  noLoop();
}


function draw() {
  background(100, 120, 140);
  drawTexture();
  drawQuadrantBorders();

  for (let season of seasons) {
    season.draw();
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
  draw() {
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
  }

  drawGround() {
    noStroke();
    fill(70, 180, 100, 150);
    rect(this.x, this.cy + 120, this.width, this.height - 360);
  }

  drawBase() {
    noStroke();
    fill(70, 180, 100);
    rect(this.cx - 120, this.cy + 60, 40, 40);
    fill(220, 180, 60);
    rect(this.cx - 80, this.cy + 60, 80, 40);
    fill(70, 180, 100);
    rect(this.cx, this.cy + 60, 40, 40);
    this.doubleColorCircle(this.cx - 60, this.cy + 100, 40, color(230, 80, 70), color(70, 180, 100));
    this.doubleColorCircle(this.cx, this.cy + 100, 40, color(70, 180, 100), color(230, 80, 70));
  }

  drawStem() {
    const stemY = [this.cy + 40, this.cy, this.cy - 40, this.cy - 80, this.cy - 120];
    for (let y of stemY) {
      this.doubleColorCircle(this.cx - 20, y, 40, color(230, 80, 70), color(70, 180, 100));
    }
  }

  drawBranches() {
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(230, 80, 70), color(70, 180, 100));
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(70, 180, 100), color(230, 80, 70));
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(230, 80, 70), color(70, 180, 100));
    this.doubleColorCircle(this.cx + 80, this.cy - 80, 40, color(70, 180, 100), color(230, 80, 70));
  }
}

// Summer
class Summer extends Season {
  draw() {
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
  }

  drawGround() {
    noStroke();
    fill(255, 200, 50, 150);
    
    rect(this.x, this.cy + 120, this.width, this.height - 360); 
  }

  drawBase() {
    noStroke();
    fill(255, 140, 0);
    rect(this.cx - 120, this.cy + 60, 40, 40);
    fill(255, 255, 0);
    rect(this.cx - 80, this.cy + 60, 80, 40);
    fill(255, 140, 0);
    rect(this.cx, this.cy + 60, 40, 40);
    this.doubleColorCircle(this.cx - 60, this.cy + 100, 40, color(0, 100, 200), color(255, 140, 0));
    this.doubleColorCircle(this.cx, this.cy + 100, 40, color(255, 140, 0), color(0, 100, 200));
  }

  drawStem() {
    const stemY = [this.cy + 40, this.cy, this.cy - 40, this.cy - 80, this.cy - 120];
    for (let y of stemY) {
      this.doubleColorCircle(this.cx - 20, y, 40, color(0, 100, 200), color(255, 140, 0));
    }
  }

  drawBranches() {
    
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(0, 100, 200), color(255, 140, 0));
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(255, 140, 0), color(0, 100, 200));
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(0, 100, 200), color(255, 140, 0));
    this.doubleColorCircle(this.cx + 90, this.cy - 80, 40, color(255, 140, 0), color(0, 100, 200));
  }

}


// Autumn
class Autumn extends Season {
  
  draw() {
    this.drawBackground();// Autumn background
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
  }

  drawBackground(){
    noStroke();
    fill(230,200,130)
    rect(this.x, this.y, this.width, this.height);

  }

  drawGround() {
    noStroke();
    fill(200, 100, 50, 150); 
    rect(this.x, this.cy + 120, this.width, this.height - 360);
    this.drawGrass();
  }

  drawGrass(){
    for (let i = 0; i < 50000; i++) {
    stroke(200, 160, 30, 150);
    let gx= this.x + random(this.width);
    let gy= this.cy + 120 + random(this.height);
     line(gx, gy, gx + random(-3, 3), gy - random(30, 50));
  }
  }

  drawBase() {
    noStroke();
    fill(200, 80, 0); 
    rect(this.cx - 120, this.cy + 60, 40, 40);
    fill(255, 180, 50); 
    rect(this.cx - 80, this.cy + 60, 80, 40);
    fill(200, 80, 0); 
    rect(this.cx, this.cy + 60, 40, 40);
  }

  drawStem() {
    const stemY = [this.cy + 40, this.cy, this.cy - 40, this.cy - 80, this.cy - 120];
    for (let y of stemY) {
      this.doubleColorCircle(this.cx - 20, y, 40, color(255, 200, 0), color(200, 80, 0));
    }
  }
  drawBranches() {
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(200, 80, 0), color(255, 200, 0));
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx + 80, this.cy - 80, 40, color(200, 80, 0), color(255, 200, 0));
  }
  
}

// winter
class Winter extends Season {
  draw() {
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
  }

  drawGround() {
    noStroke();
    fill(200, 220, 255, 150); 
    rect(this.x, this.cy + 120, this.width, this.height - 360);
  }

  drawBase() {
    noStroke();
    fill(50, 100, 150); 
    rect(this.cx - 120, this.cy + 60, 40, 40);
    fill(255, 255, 255); 
    rect(this.cx - 80, this.cy + 60, 80, 40);
    fill(50, 100, 150); 
    rect(this.cx, this.cy + 60, 40, 40);
   
    this.doubleColorCircle(this.cx - 60, this.cy + 100, 40, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx, this.cy + 100, 40, color(50, 100, 150), color(255, 255, 255));
  }

  drawStem() {
    const stemY = [this.cy + 40, this.cy, this.cy - 40, this.cy - 80, this.cy - 120];
    for (let y of stemY) {
      this.doubleColorCircle(this.cx - 20, y, 40, color(255, 255, 255), color(50, 100, 150));
    }
  }

  drawBranches() {
   
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(50, 100, 150), color(255, 255, 255));
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx + 90, this.cy - 80, 40, color(50, 100, 150), color(255, 255, 255));
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initializeSeasons();
}



