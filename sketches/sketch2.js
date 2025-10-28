registerSketch('sk2', function (p) {

  //Noise & Orb settings 
  let noiseScale = 0.02;
  let t = 0;
  let baseRadius = 200;
  let detail = 5;
  let cycleTime = 10; // 10-second inhale/exhale cycle

  p.setup = function () {
    p.createCanvas(600, 600);
    p.angleMode(p.DEGREES);
    p.noStroke();
  };

  p.draw = function () {
    p.background(128, 128, 0);
    p.translate(p.width / 2, p.height / 2);

    //Inhale / Exhale pulsing 
    let elapsed = (p.millis() / 1000) % cycleTime;
    let brightnessFactor, scaleFactor;

    if (elapsed < 5) {
      brightnessFactor = p.map(elapsed, 0, 5, 0.6, 1.0);
      scaleFactor = p.map(elapsed, 0, 5, 0.95, 1.05);
    } else {
      brightnessFactor = p.map(elapsed, 5, 10, 1.0, 0.6);
      scaleFactor = p.map(elapsed, 5, 10, 1.05, 0.95);
    }

    let radius = baseRadius * scaleFactor;

    // Swirling orb with colored noise 
    for (let x = -radius; x <= radius; x += detail) {
      for (let y = -radius; y <= radius; y += detail) {
        if (x * x + y * y <= radius * radius) {
          let nx = x * noiseScale;
          let ny = y * noiseScale;
          let n = p.noise(nx + t, ny + t);

          // Color gradient 
          let col1 = p.color(255, 180, 200);
          let col2 = p.color(255, 220, 120);
          let col3 = p.color(255, 240, 180);

          let c;
          if (n < 0.5) {
            c = p.lerpColor(col1, col2, p.map(n, 0, 0.5, 0, 1));
          } else {
            c = p.lerpColor(col2, col3, p.map(n, 0.5, 1, 0, 1));
          }

          //Apply brightness factor 
          c = p.color(
            p.red(c) * brightnessFactor,
            p.green(c) * brightnessFactor,
            p.blue(c) * brightnessFactor
          );

          p.fill(c);
          p.ellipse(x, y, 3, 3);
        }
      }
    }

    t += 0.01;

    // CLOCK HANDS
    let hr = p.hour();
    let mn = p.minute();
    let sc = p.second();

    let secondAngle = p.map(sc, 0, 60, 0, 360);
    let minuteAngle = p.map(mn + sc / 60, 0, 60, 0, 360);
    let hourAngle = p.map((hr % 12) + mn / 60, 0, 12, 0, 360);

    // hour hand
    p.stroke(50);
    p.strokeWeight(8);
    p.push();
    p.rotate(hourAngle - 90);
    p.line(0, 0, 80 * scaleFactor, 0);
    p.pop();

    // minute hand
    p.strokeWeight(5);
    p.push();
    p.rotate(minuteAngle - 90);
    p.line(0, 0, 120 * scaleFactor, 0);
    p.pop();

    // second hand
    p.stroke(255, 80, 80);
    p.strokeWeight(2);
    p.push();
    p.rotate(secondAngle - 90);
    p.line(0, 0, 150 * scaleFactor, 0);
    p.pop();

    // center dot
    p.noStroke();
    p.fill(50);
    p.ellipse(0, 0, 14 * scaleFactor);

  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

});
