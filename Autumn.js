
// Autumn
class Autumn extends Season {

  draw() {
    this.drawBackground();// Autumn background
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
  }

  drawBackground() {
    noStroke();
    fill(230, 200, 130)
    rect(this.x, this.y, this.width, this.height);

    fill(200, 200, 130)
    rect(this.x + 50, this.y + 50, this.width - 100, this.height - 100);
  }

  drawGround() {
    noStroke();
    fill(200, 100, 50, 150);
    rect(this.x, this.cy + 120, this.width, this.height - 360);
    this.drawGrass();
  }

  drawGrass() {
    for (let i = 0; i < 50000; i++) {
      stroke(200, 160, 30, 150);
      let gx = this.x + random(this.width);
      let gy = this.cy + 120 + random(this.height);
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

    // Draw red-brown connected branches 
    stroke(150, 75, 40);
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
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(200, 80, 0), color(255, 200, 0));
    this.doubleColorCircle(this.cx - 160, this.cy - 80, 30, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx - 180, this.cy - 120, 25, color(200, 80, 0), color(255, 200, 0));
    this.doubleColorCircle(this.cx - 180, this.cy - 150, 20, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx - 130, this.cy - 80, 22, color(255, 200, 0), color(200, 80, 0));

    // Middle branch
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx - 80, this.cy - 80, 28, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx - 50, this.cy - 150, 25, color(200, 80, 0), color(255, 200, 0));
    this.doubleColorCircle(this.cx - 50, this.cy - 180, 20, color(255, 200, 0), color(200, 80, 0));

    // Right branch
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx + 80, this.cy - 80, 40, color(200, 80, 0), color(255, 200, 0));
    this.doubleColorCircle(this.cx + 80, this.cy - 120, 32, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx + 110, this.cy - 150, 28, color(200, 80, 0), color(255, 200, 0));
    this.doubleColorCircle(this.cx + 110, this.cy - 180, 22, color(255, 200, 0), color(200, 80, 0));
    this.doubleColorCircle(this.cx + 40, this.cy - 80, 22, color(200, 80, 0), color(255, 200, 0));

  }
}
  //Inspired by p5.js Contributors (2024), Snowflakes example.
  //Source:https://p5js.org/examples/classes-and-objects-snowflakes/
class Snowflake {
  constructor() {

    this.posX = random(0, width / 2);
    this.posY = random(height / 2, height);

    this.size = random(3, 6);
    this.speed = 0.5 + random(1.5);

    // leave color
    this.color = color(
      random(180, 255),
      random(100, 180),
      random(20, 50),
      150
    );
  }

  update() {
    // leave speed
    this.posY += this.speed;
    this.posX += sin(frameCount / 20 + this.posY) * 0.3;

    if (this.posY > height) {
      this.posY = height / 2;
      this.posX = random(0, width / 2);
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.posX, this.posY, this.size, this.size * 1.2); // leave shape
  }
}




