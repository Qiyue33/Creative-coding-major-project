// Spring

class Spring extends Season {

  constructor(x, y, width, height) {

    super(x, y, width, height);

    // Initialize the exclusive animation elements for spring
    this.petals = [];
    this.butterflies = [];

    // Petals cycle
    for (let i = 0; i < 15; i++) {

      let newPetal = new Petal(this.x, this.y, this.width, this.height);

      this.petals.push(newPetal);
    }
  }

  // draw spring
  draw() {
    this.drawBackground();
    this.drawGround();
    this.drawBase();
    this.drawStem();
    this.drawBranches();
    this.updateAnimations();
  }

  // Draw the background in the Spring quadrant
  drawBackground() {
    noStroke();
    const bandHeight = 15;

    // Set two colors
    const color1 = color(205, 237, 222, 200);
    const color2 = color(255, 255, 255, 200);

    // Draw horizontal stripes in a loop
    for (let y = 0; y < this.height; y += bandHeight) {

      if (Math.floor(y / bandHeight) % 2 === 0) {
        fill(color1);
      } else {
        fill(color2);
      }

      rect(this.x, this.y + y, this.width, bandHeight);
    }
  }


  // Draw the ground in the Spring quadrant
  drawGround() {
    noStroke();

    for (let y = 0; y < 60; y++) {
      let greenValue = map(y, 0, 60, 240, 210);
      fill(50, greenValue, 40, 200);
      rect(this.x, this.cy + 120 + y, this.width, 1);
    }
    this.drawGrass();
    this.drawFlowers();
  }

  // Draw grass
  drawGrass() {
    for (let i = 0; i < 15000; i++) {
      stroke(100, 200, 80, 170);
      let grassX = this.x + random(this.width);
      let grassY = this.cy + 120 + random(30);


      curve(grassX, grassY, grassX + random(-2, 2), grassY - random(15, 25), grassX + random(-1, 1), grassY - random(5, 10), grassX, grassY);
    }
  }

  // Draw small ground flowers
  drawFlowers() {
    for (let i = 0; i < 36; i++) {

      let flyX = this.x + random(this.width);
      let flyY = this.cy + 120 + random(25);

      // Small flower stems and leaves
      stroke(80, 180, 60);
      line(flyX, flyY, flyX, flyY - 6);

      // Flower petals
      noStroke();
      fill(random(230, 255), random(150, 200), random(180, 255), 190);
      ellipse(flyX, flyY - 8, 6, 9);
      fill(random(240, 255), random(200, 255), random(190, 255), 190);
      ellipse(flyX - 3, flyY - 6, 6, 9);
      ellipse(flyX + 3, flyY - 6, 6, 9);
    }
  }

  // Draw the bottom of the trees
  drawBase() {
    noStroke();
    fill(180, 140, 80);
    rect(this.cx - 120, this.cy + 60, 40, 40);
    fill(190, 150, 90);
    rect(this.cx - 80, this.cy + 60, 80, 40);
    fill(180, 140, 80);
    rect(this.cx, this.cy + 60, 40, 40);
  }

  // Draw the stems and leaves of trees
  drawStem() {
    const stemY = [this.cy + 40, this.cy, this.cy - 40, this.cy - 80, this.cy - 120];
    for (let y of stemY) {
      this.doubleColorCircle(this.cx - 20, y, 40, color(255, 107, 107), color(100, 200, 120));
    }
  }

  // Draw branches
  drawBranches() {

    // Draw brown connected branches
    stroke(139, 69, 19);
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
    this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(100, 200, 120), color(255, 107, 107));
    this.doubleColorCircle(this.cx - 160, this.cy - 80, 30, color(255, 107, 107), color(100, 200, 120));
    this.doubleColorCircle(this.cx - 180, this.cy - 120, 25, color(100, 200, 120), color(255, 107, 107));
    this.doubleColorCircle(this.cx - 180, this.cy - 150, 20, color(255, 107, 107), color(100, 200, 120));
    this.doubleColorCircle(this.cx - 130, this.cy - 80, 22, color(255, 107, 107), color(100, 200, 120));

    // Middle branch
    this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(255, 107, 107), color(100, 200, 120));
    this.doubleColorCircle(this.cx - 80, this.cy - 80, 28, color(100, 200, 120), color(255, 107, 107));
    this.doubleColorCircle(this.cx - 50, this.cy - 150, 25, color(100, 200, 120), color(255, 107, 107));
    this.doubleColorCircle(this.cx - 50, this.cy - 180, 20, color(255, 107, 107), color(100, 200, 120));

    // Right branch
    this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(255, 107, 107), color(100, 200, 120));
    this.doubleColorCircle(this.cx + 90, this.cy - 80, 40, color(100, 200, 120), color(255, 107, 107));
    this.doubleColorCircle(this.cx + 80, this.cy - 120, 32, color(255, 107, 107), color(100, 200, 120));
    this.doubleColorCircle(this.cx + 110, this.cy - 150, 28, color(100, 200, 120), color(255, 107, 107));
    this.doubleColorCircle(this.cx + 110, this.cy - 180, 22, color(255, 107, 107), color(100, 200, 120));
    this.doubleColorCircle(this.cx + 40, this.cy - 80, 22, color(100, 200, 120), color(255, 107, 107));

    this.drawNewLeaves();
  }

  // Draw new leaves on the branches
  drawNewLeaves() {
    noStroke();
    fill(209, 240, 177, 180);
    ellipse(this.cx - 100, this.cy - 60, 10, 15);
    ellipse(this.cx - 140, this.cy - 20, 8, 12);
    ellipse(this.cx - 70, this.cy - 25, 8, 12);
    ellipse(this.cx + 60, this.cy - 60, 10, 15);
    ellipse(this.cx + 110, this.cy - 100, 8, 12);
    ellipse(this.cx + 25, this.cy - 20, 8, 12);
  }

  //  Update Animations
  updateAnimations() {
    this.petals.forEach(petal => {
      petal.update();
      petal.display();
    });
  }
}

// Draw falling petals
class Petal {
  constructor(quadrantX, quadrantY, quadrantWidth, quadrantHeight) {

    this.quadrantX = quadrantX;
    this.quadrantY = quadrantY;
    this.quadrantWidth = quadrantWidth;
    this.quadrantHeight = quadrantHeight;

    this.posX = quadrantX + random(quadrantWidth);
    this.posY = quadrantY + random(-30, -10);
    this.size = random(8, 10);
    this.speed = 10 + random(2);

    this.color = color(random(240, 255), random(200, 255), random(190, 255), random(150, 190));
  }

  update() {
    this.posY += this.speed;

    this.posX += sin(frameCount / 30 + this.posY * 0.1);

    if (this.posY > this.quadrantY + this.quadrantHeight) {
      this.posX = this.quadrantX + random(this.quadrantWidth);
      this.posY = this.quadrantY + random(-30, 20);
    }
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.posX, this.posY, this.size * 1.2, this.size);
  }
}


