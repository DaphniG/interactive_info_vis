// Step 3: Add hour and minute tick marks
registerSketch('sk3', function (p) {
  let startMillis;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    p.textAlign(p.CENTER, p.CENTER);
    startMillis = p.millis();
  };

  p.draw = function () {
    p.background(244, 236, 222);
    p.translate(p.width / 2, p.height / 2);

    let elapsedSeconds = (p.millis() - startMillis) / 1000;
    let secondsIntoCard = elapsedSeconds % 60;
    let secondsLeft = 60 - secondsIntoCard;
    let alert = secondsLeft <= 10;

    p.noFill();
    p.stroke(alert ? p.color(255, 50, 50) : p.color(180, 150, 110, 80));
    p.strokeWeight(3);
    p.ellipse(0, 0, 450);

    p.stroke(150, 120, 90);
    p.strokeWeight(4);
    let tickRadius = 210;
    for (let i = 0; i < 12; i++) {
      let angle = p.map(i, 0, 12, 0, 360) - 90;
      let x1 = p.cos(angle) * (tickRadius - 15);
      let y1 = p.sin(angle) * (tickRadius - 15);
      let x2 = p.cos(angle) * tickRadius;
      let y2 = p.sin(angle) * tickRadius;
      p.line(x1, y1, x2, y2);
    }

    p.strokeWeight(1);
    for (let i = 0; i < 60; i++) {
      if (i % 5 !== 0) {
        let angle = p.map(i, 0, 60, 0, 360) - 90;
        let x1 = p.cos(angle) * (tickRadius - 10);
        let y1 = p.sin(angle) * (tickRadius - 10);
        let x2 = p.cos(angle) * tickRadius;
        let y2 = p.sin(angle) * tickRadius;
        p.line(x1, y1, x2, y2);
      }
    }
  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
