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
