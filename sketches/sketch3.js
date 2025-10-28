// Step 3: Add hour and minute tick marks
registerSketch('sk3', function (p) {
  let startMillis;
  let subjects = ["Math", "History", "English", "Chemistry", "Biology", "Art", "Physics", "Geography", "Music", "Computer Sci", "Economics", "Literature"];


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

    // compute hour & minute values
    let h = p.hour() % 12 + p.minute() / 60;
    let m = p.minute() + p.second() / 60;

    let hourAngle = p.map(h, 0, 12, 0, 360) - 90;
    let minuteAngle = p.map(m, 0, 60, 0, 360) - 90;
    let cardAngle = p.map(secondsIntoCard, 0, 60, 0, 360) - 90;

    // hour hand
    p.stroke(70, 50, 30);
    p.strokeWeight(6);
    p.line(0, 0, p.cos(hourAngle) * 100, p.sin(hourAngle) * 100);

    // minute hand
    p.stroke(50, 50, 100);
    p.strokeWeight(4);
    p.line(0, 0, p.cos(minuteAngle) * 160, p.sin(minuteAngle) * 160);

    // card progress (seconds) hand
    p.stroke(alert ? p.color(255, 50, 50) : p.color(100, 70, 40));
    p.strokeWeight(3);
    p.line(0, 0, p.cos(cardAngle) * 140, p.sin(cardAngle) * 140);

    let outerRadius = 230;
    for (let i = 0; i < 12; i++) {
      let angle = p.map(i, 0, 12, 0, 360) - 90;
      let x = p.cos(angle) * outerRadius;
      let y = p.sin(angle) * outerRadius;
      p.push();
      p.translate(x, y);
      p.rotate(angle + 90);
      let isCurrent = (i === (p.hour() % 12));
      p.fill(isCurrent ? 80 : 120, 80, 60);
      p.noStroke();
      p.text(subjects[i], 0, 0);
      p.pop();
    }

    elapsedSeconds = (p.millis() - startMillis) / 1000;
    let currentCard = Math.floor(elapsedSeconds / 60) % 12;

    // draw card
    p.noStroke();
    p.fill(255, 250, 240);
    p.rect(0, 0, 160, 90, 12);

    p.fill(90, 70, 40);
    p.textSize(20);
    p.text("Card " + (currentCard + 1), 0, -8);
    p.textSize(14);
    p.text(subjects[p.hour() % 12], 0, 15);

    // subtle shadow
    p.noStroke();
    p.fill(0, 0, 0, 20);
    p.rect(2, 2, 160, 90, 12);


  };

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
