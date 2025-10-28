registerSketch('sk3', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function () {
    p.background(244, 236, 222);
    p.translate(p.width / 2, p.height / 2);

    p.noFill();
    p.stroke(180, 150, 110);
    p.strokeWeight(3);
    p.ellipse(0, 0, 450);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
