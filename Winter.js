// Winter
class Winter extends Season {

  constructor(x, y, width, height) {

    super(x, y, width, height);

    this.SNOWS = [];

    this.scaleProgress = 0.6;
    this.scaleSpeed = 0.02;
    this.rotateAngle = 0;
    this.rotateSpeed = 0.01;
    this.maxRotate = 0.03;
    this.minScale = 0.1;
  }

  draw() {
    this.drawGround();

    // Update the zoom progress (0.6-0.1)
    if (this.scaleProgress > 0.1) {
      this.scaleProgress -= this.scaleSpeed;
    } else {
      this.scaleProgress = 0.6;
    }

    // Update the rotation Angle
    this.rotateAngle = sin(frameCount * this.rotateSpeed) * this.maxRotate;

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

    push();

    translate(this.cx, this.cy + 60);
    rotate(this.rotateAngle);
    scale(this.scaleProgress);
    translate(-this.cx, -(this.cy + 60));

    for (let y of stemY) {

      this.doubleColorCircle(this.cx - 20, y, 40, color(255, 255, 255), color(50, 100, 150));

    }

    pop();
  }

  drawBranches() {

    push();

    translate(this.cx, this.cy + 60);
    rotate(this.rotateAngle);
    scale(this.scaleProgress);
    translate(-this.cx, -(this.cy + 60));

    // Draw brown connected branches (Winter: cool brown)
    stroke(240, 240, 240);
    strokeWeight(3);

    // The brown branch on the left
    line(this.cx - 130, this.cy - 40, this.cx - 160, this.cy - 80);
    line(this.cx - 160, this.cy - 80, this.cx - 180, this.cy - 120);
    line(this.cx - 180, this.cy - 120, this.cx - 180, this.cy - 150);
    line(this.cx - 130, this.cy - 40, this.cx - 130, this.cy - 80);
    line(this.cx - 130, this.cy - 40, this.cx - 80, this.cy - 40);
    line(this.cx - 80, this.cy - 40, this.cx - 80, this.cy - 80);
    line(this.cx - 80, this.cy - 80, this.cx - 50, this.cy - 150);
    line(this.cx - 50, this.cy - 150, this.cx - 50, this.cy - 180);

    // A brown branch connected to the trunk on the left
    line(this.cx - 40, this.cy - 6, this.cx - 80, this.cy - 40);

    // The brown branch on the right
    line(this.cx + 40, this.cy - 40, this.cx + 90, this.cy - 80);
    line(this.cx + 90, this.cy - 80, this.cx + 80, this.cy - 120);
    line(this.cx + 80, this.cy - 120, this.cx + 110, this.cy - 150);
    line(this.cx + 110, this.cy - 150, this.cx + 110, this.cy - 180);
    line(this.cx + 40, this.cy - 40, this.cx + 40, this.cy - 80);

    // A brown branch connected to the trunk on the right
    line(this.cx + 0, this.cy - 5, this.cx + 40, this.cy - 40);

    noStroke();

    // Left branch
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(50, 100, 150), color(255, 255, 255));
    this.doubleColorCircle(this.cx - 160, this.cy - 80, 30, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx - 180, this.cy - 120, 25, color(50, 100, 150), color(255, 255, 255));
    this.doubleColorCircle(this.cx - 180, this.cy - 150, 20, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx - 130, this.cy - 80, 22, color(255, 255, 255), color(50, 100, 150));

    // Middle branch
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx - 80, this.cy - 80, 28, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx - 50, this.cy - 150, 25, color(50, 100, 150), color(255, 255, 255));
    this.doubleColorCircle(this.cx - 50, this.cy - 180, 20, color(255, 255, 255), color(50, 100, 150));

    // Right branch
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx + 90, this.cy - 80, 40, color(50, 100, 150), color(255, 255, 255));
    this.doubleColorCircle(this.cx + 80, this.cy - 120, 32, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx + 110, this.cy - 150, 28, color(50, 100, 150), color(255, 255, 255));
    this.doubleColorCircle(this.cx + 110, this.cy - 180, 22, color(255, 255, 255), color(50, 100, 150));
    this.doubleColorCircle(this.cx + 40, this.cy - 80, 22, color(50, 100, 150), color(255, 255, 255));

    pop();
  }

  drawSnow() {
    // Create new snowflakes randomly
    if (frameCount % 5 === 0) {
      this.SNOWS.push(new WinterSnowflake(
        this.groundY,
        this.x,
        this.y,
        this.width,
        this.height
      )
      );
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