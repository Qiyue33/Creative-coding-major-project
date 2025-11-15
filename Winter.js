// winter
class Winter extends Season {
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.SNOWS = [];
    }
  draw() {
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
    this.drawSnow();
  }

  drawGround() {
    noStroke();
    fill(200, 220, 255, 150);
    rect(this.x, this.cy + 100, this.width, this.height);
    this.groundY = this.cy + 120;
  }

  drawBase() {
    noStroke();
    fill(50, 100, 150);
    rect(this.cx - 120, this.cy + 60, 40, 40);
    fill(255, 255, 255);
    rect(this.cx - 80, this.cy + 60, 80, 40);
    fill(50, 100, 150);
    rect(this.cx, this.cy + 60, 40, 40);
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

  drawSnow(){
    // Create new snowflakes randomly
  if (frameCount % 5 === 0) {
    this.SNOWS.push(new WinterSnowflake(this.groundY,
        this.x,
        this.y,
        this.width,
        this.height
    ));
  }
  
  // Update and show all the snowflakes
  for (let i = this.SNOWS.length - 1; i >= 0; i--) {
    this.SNOWS[i].update();
    this.SNOWS[i].display();
    
    // remove the disappeared snowflakes
    if (this.SNOWS[i].isGone()) {
      this.SNOWS.splice(i, 1);
    }
  }
  }
}

class WinterSnowflake {
  constructor(groundY, quadrantX, quadrantY, quadrantWidth, quadrantHeight) {
    this.groundY = groundY;
    this.quadrantX = quadrantX; 
    this.quadrantY = quadrantY; 
    this.quadrantWidth = quadrantWidth; 
    this.quadrantHeight = quadrantHeight; 
    // Initial snowflake position
    this.x = random(this.quadrantX, this.quadrantX + this.quadrantWidth);
    this.y = random(this.quadrantY, this.quadrantY + 20);
    
    // Snowflake properties
    this.radius = random(1, 4);
    this.speedY = random(1, 3) + this.radius * 0.5; // Larger snowflakes fall faster
    this.speedX = random(-0.5, 0.5); // Horizontal drift
    
    // Ground-stay related properties
    this.onGround = false;
    this.groundTime = 0;
    this.maxGroundTime = random(60, 180); // Stay time
    this.opacity = 255; // Opacity
  }
  
  update() {
    if (!this.onGround) {
      // Snowflake falling
      this.y += this.speedY;
      this.x += this.speedX;
      
      // Check whether reached the ground
      if (this.y > this.groundY - this.radius) {
        this.y = this.groundY - this.radius; // stay on the ground
        this.onGround = true;
      }
      
      // Boundary check
      if (this.x < this.quadrantX)
        this.x = this.quadrantX + this.quadrantWidth;

      if (this.x > this.quadrantX + this.quadrantWidth)
        this.x = this.quadrantX;
    } else {
    
      this.groundTime++;
      
      // Start fading when time ends
      if (this.groundTime > this.maxGroundTime) {
        this.opacity -= 2;
      }
    }
  }
  
  display() {
    noStroke();
    fill(255, this.opacity);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  // Check whether the snowflake has fully disappeared
  isGone() {
    return this.opacity <= 0;
  }
}