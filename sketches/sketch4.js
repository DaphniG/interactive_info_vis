registerSketch('sk4', function (p) {
  let flowers = [];
  let lastMinute = -1;
  let hourColors;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);

    hourColors = [
      p.color(235, 245, 230), p.color(220, 240, 200), p.color(250, 230, 180),
      p.color(255, 200, 160), p.color(255, 180, 180), p.color(255, 200, 220),
      p.color(255, 220, 250), p.color(210, 200, 250), p.color(180, 200, 255),
      p.color(180, 230, 250), p.color(200, 240, 230), p.color(210, 250, 210)
    ];
  };

  p.draw = function () {
    p.background(150, 170, 140);

    let h = p.hour() % 12;
    if (h === 0) h = 12;
    let m = p.minute();
    let s = p.second();

    if (m !== lastMinute) {
      lastMinute = m;
      flowers.push({
        x: p.random(p.width),
        y: p.random(p.height),
        color: hourColors[h - 1],
        numPetals: 5 + p.floor(p.random(2)),
        petalLength: 12 + p.random(5),
        petalWidth: 6 + p.random(3)
      });
    }

    // Draw all flowers
    for (let f of flowers) {
      drawFlower(f);
    }

    // Info overlay
    p.fill(255, 250, 240);
    p.rect(10, 10, 220, 80, 12);
    p.fill(60, 50, 40);
    p.text(`Time: ${p.nf(h, 2)}:${p.nf(m, 2)}:${p.nf(s, 2)}`, 20, 20);
    p.text(`Flowers: ${flowers.length}`, 20, 40);
    p.text(`Hour Theme: ${h}`, 20, 60);
  };

  function drawFlower(f) {
    p.push();
    p.translate(f.x, f.y);
    p.fill(f.color);

    for (let i = 0; i < f.numPetals; i++) {
      p.push();
      p.rotate(p.TWO_PI / f.numPetals * i);
      p.ellipse(0, f.petalLength / 2, f.petalWidth, f.petalLength);
      p.pop();
    }
    p.ellipse(0, 0, 8, 8);
    p.pop();
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
