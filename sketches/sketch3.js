// Step 2: Add timer and 10-second alert fill
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

    let outerStroke = alert ? p.color(255, 50, 50) : p.color(180, 150, 110, 80);
    let fillColor = alert ? p.color(255, 150, 150, 100) : p.color(0, 0, 0, 0);

    // outer fill (pulses red when alert)
    p.fill(fillColor);
    p.noStroke();
    p.ellipse(0, 0, 450);

    // outer circle stroke
    p.noFill();
    p.stroke(outerStroke);
    p.strokeWeight(3);
    p.ellipse(0, 0, 450);
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
