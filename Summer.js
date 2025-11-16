
// Summer
class Summer extends Season {

    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.sunX = this.x + this.width - 50;
        this.sunY = this.y + 50;
        this.size = 80;        // Sunsize
        this.raysCount = 12;   // Quantity of light
        this.baseLength = 60; // Base ray length
        this.rayChangeRange = 50; // Variation in ray length (±50)
        this.rayThickness = 8; // Brilliance Thickness
        this.angle = 0;        // The initial angle of the rotation of light
        this.rotateSpeed = 0.02; // rotational speed of light

        // clouds
        this.clouds = [];
        for (let i = 0; i < 7; i++) {
            this.clouds.push({
                x: random(this.x, this.x + this.width),
                y: random(this.y + 10, this.y + 100),
                speed: random(0.5, 4.5),
                size: random(40, 100)
            });
        }

        // apples
        this.groundApples = [];
        for (let i = 0; i < 5; i++) {
            this.groundApples.push({
                x: random(this.x + 10, this.x + this.width - 10),
                y: random(this.cy + 60, this.y + this.height - 20),
                size: random(10, 40),
                r: random(200, 250),
                g: random(30, 100),
                b: random(30, 70)
            });
        }


    }

    // draw summer
    draw() {
        this.drawBackground();// Summer background
        this.drawClouds();
        this.drawSun();
        this.drawGround();
        this.drawGrass();
        this.drawGroundApples();
        this.drawBase();
        this.drawStem();
        this.drawBranches();

    }

    // draw clouds
    drawClouds() {
        for (let c of this.clouds) {

            c.x = c.x + c.speed;
            if (c.x > this.x + this.width + 50) {
                c.x = this.x - 50;
            }


            noStroke();
            fill(255, 255, 255, 200);
            ellipse(c.x, c.y, c.size, c.size * 0.6);
            ellipse(c.x - c.size / 3, c.y, c.size * 0.7, c.size * 0.5);
            ellipse(c.x + c.size / 3, c.y, c.size * 0.7, c.size * 0.5);
        }
    }

    // draw sun
    drawSun() {
        noStroke();
        fill(255, 204, 0);
        ellipse(this.sunX, this.sunY, this.size);

        const sunRadius = this.size / 2;

        stroke(255, 153, 0);
        noFill();

        this.angle += this.rotateSpeed; // The light beam rotates, with the angle increasing.

        this.rayLength = this.size * 0.7;

        // Draw all rays in a loop
        for (let i = 0; i < this.raysCount; i++) {
            const currentAngle = this.angle + (TWO_PI / this.raysCount) * i;


            const time = frameCount * 0.05;
            const rayLengthVariation = sin(time + i * 0.3) * this.rayChangeRange;
            const currentRayLength = this.baseLength + rayLengthVariation;

            const currentRayThickness = map(sin(time + i * 0.8), -1, 1, 3, 12);

            const x1 = this.sunX + cos(currentAngle) * sunRadius;
            const y1 = this.sunY + sin(currentAngle) * sunRadius;

            const x2 = this.sunX + cos(currentAngle) * (sunRadius + currentRayLength);
            const y2 = this.sunY + sin(currentAngle) * (sunRadius + currentRayLength);

            strokeWeight(currentRayThickness);
            line(x1, y1, x2, y2);
        }
    }

    // draw the background in the Summer quadrant
    drawBackground() {
        noStroke();
        fill(100, 180, 220);
        rect(this.x, this.y, this.width, this.height);

        fill(135, 206, 250);
        rect(this.x + 30, this.y + 30, this.width - 60, this.height - 60);

    }

    // Draw the ground in the Summer quadrant
    drawGround() {
        noStroke();
        fill(255, 200, 50, 150);
        rect(this.x, this.cy + 50, this.width, this.height - (this.cy + 50 - this.y));
    }


    // Draw the grass in the Summer quadrant
    drawGrass() {
        for (let i = 0; i < 15000; i++) {

            let r = random(20, 100);
            let g = random(120, 170);
            let b = random(60, 90);
            stroke(r, g, b, 180);
            strokeWeight(1.5);
            let grassX = random(this.x, this.x + this.width);
            let grassY = random(this.cy + 50, this.y + this.height);

            curve(grassX, grassY, grassX + random(-2, 2), grassY - random(15, 25), grassX + random(-1, 1), grassY - random(5, 10), grassX, grassY);
        }
    }

    // Draw the apples on the ground
    drawGroundApples() {
        for (let i = 0; i < this.groundApples.length; i = i + 1) {
            let apple = this.groundApples[i];


            noStroke();
            fill(apple.r, apple.g, apple.b);
            ellipse(apple.x, apple.y, apple.size, apple.size * 0.9);


            fill(apple.r - 30, apple.g - 20, apple.b - 10);
            ellipse(apple.x, apple.y - apple.size * 0.3, apple.size * 0.3, apple.size * 0.2);


            stroke(101, 67, 33);
            strokeWeight(2);
            line(apple.x, apple.y - apple.size * 0.45, apple.x + 2, apple.y - apple.size * 0.6);


        }
    }

    // Draw the bottom of the trees
    drawBase() {
        noStroke();
        fill(230, 150, 80);
        rect(this.cx - 120, this.cy + 60, 40, 40);
        fill(255, 230, 120);
        rect(this.cx - 80, this.cy + 60, 80, 40);
        fill(130, 200, 130);
        rect(this.cx, this.cy + 60, 40, 40);

    }

    // Draw stem
    drawStem() {
        const stemY = [this.cy + 40, this.cy, this.cy - 40, this.cy - 80, this.cy - 120];
        for (let y of stemY) {
            this.doubleColorCircle(this.cx - 20, y, 40, color(90, 180, 175), color(255, 180, 100));
        }
    }

    // Draw branches

    drawBranches() {

        // Draw yellow-brown connected branches 

        stroke(205, 133, 63); 
        strokeWeight(3);

        //  The brown branch on the left
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

        // Left round branches
        this.doubleColorCircle(this.cx - 130, this.cy - 40, 40, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx - 160, this.cy - 80, 30, color(255, 180, 100), color(90, 180, 175));
        this.doubleColorCircle(this.cx - 180, this.cy - 120, 25, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx - 180, this.cy - 150, 20, color(255, 180, 100), color(90, 180, 175));
        this.doubleColorCircle(this.cx - 130, this.cy - 80, 22, color(255, 180, 100), color(90, 180, 175));

        // Middle round branches
        this.doubleColorCircle(this.cx - 80, this.cy - 40, 40, color(255, 180, 100), color(90, 180, 175));
        this.doubleColorCircle(this.cx - 20, this.cy - 120, 35, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx - 50, this.cy - 150, 25, color(255, 180, 100), color(90, 180, 175));
        this.doubleColorCircle(this.cx - 50, this.cy - 180, 20, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx - 80, this.cy - 80, 28, color(255, 180, 100), color(90, 180, 175));

        // Right round branches
        this.doubleColorCircle(this.cx + 40, this.cy - 40, 40, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx + 90, this.cy - 80, 40, color(255, 180, 100), color(90, 180, 175));
        this.doubleColorCircle(this.cx + 80, this.cy - 120, 32, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx + 110, this.cy - 150, 28, color(255, 180, 100), color(90, 180, 175));
        this.doubleColorCircle(this.cx + 110, this.cy - 180, 22, color(90, 180, 175), color(255, 180, 100));
        this.doubleColorCircle(this.cx + 40, this.cy - 80, 22, color(255, 180, 100), color(90, 180, 175));
    }

}