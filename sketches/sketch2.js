registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(600, 600);
    p.angleMode(p.DEGREES);
    p.noStroke();
  };

  p.draw = function () {
    p.background(245, 230, 200);
    p.translate(p.width / 2, p.height / 2);

    let baseRadius = 200;
    p.fill(255, 255, 255);
    // draw circle
    p.ellipse(0, 0, baseRadius * 2);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
