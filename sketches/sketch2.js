registerSketch('sk2', function (p) {

  // ---- Noise & Orb settings ----
  let noiseScale = 0.02;
  let t = 0;
  let baseRadius = 200;
  let detail = 5; // distance between points

  p.setup = function () {
    p.createCanvas(600, 600);
    p.angleMode(p.DEGREES);
    p.noStroke();
  };

  p.draw = function () {
    p.background(245, 230, 200);
    p.translate(p.width / 2, p.height / 2);

    // ---- Swirling orb with noise ----
    for (let x = -baseRadius; x <= baseRadius; x += detail) {
      for (let y = -baseRadius; y <= baseRadius; y += detail) {
        if (x * x + y * y <= baseRadius * baseRadius) {
          let nx = x * noiseScale;
          let ny = y * noiseScale;
          let n = p.noise(nx + t, ny + t);
          p.fill(n * 255); // grayscale based on noise
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
