registerSketch('sk2', function (p) {

  // ---- Noise & Orb settings ----
  let noiseScale = 0.02;
  let t = 0;
  let baseRadius = 200;
  let detail = 5; // distance between points
  let cycleTime = 10; // 10-second inhale/exhale cycle

  p.setup = function () {
    p.createCanvas(600, 600);
    p.angleMode(p.DEGREES);
    p.noStroke();
  };

  p.draw = function () {
    p.background(245, 230, 200);
    p.translate(p.width / 2, p.height / 2);

    // ---- Inhale / Exhale pulsing ----
    let elapsed = (p.millis() / 1000) % cycleTime;
    let brightnessFactor, scaleFactor;

    if (elapsed < 5) {
      // inhale: ramp up
      brightnessFactor = p.map(elapsed, 0, 5, 0.6, 1.0);
      scaleFactor = p.map(elapsed, 0, 5, 0.95, 1.05);
    } else {
      // exhale: ramp down
      brightnessFactor = p.map(elapsed, 5, 10, 1.0, 0.6);
      scaleFactor = p.map(elapsed, 5, 10, 1.05, 0.95);
    }

    let radius = baseRadius * scaleFactor;

    // ---- Swirling orb with colored noise ----
    for (let x = -radius; x <= radius; x += detail) {
      for (let y = -radius; y <= radius; y += detail) {
        if (x * x + y * y <= radius * radius) {
          let nx = x * noiseScale;
          let ny = y * noiseScale;
          let n = p.noise(nx + t, ny + t);

          // ---- Color gradient ----
          let col1 = p.color(255, 180, 200); // pink
          let col2 = p.color(255, 220, 120); // yellow
          let col3 = p.color(255, 240, 180); // cream

          let c;
          if (n < 0.5) {
            c = p.lerpColor(col1, col2, p.map(n, 0, 0.5, 0, 1));
          } else {
            c = p.lerpColor(col2, col3, p.map(n, 0.5, 1, 0, 1));
          }

          // ---- Apply brightness factor ----
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
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

});
