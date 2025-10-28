registerSketch('sk4', function (p) {
  let flowers = [];
  let lastMinute = -1;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
  };

  p.draw = function () {
    p.background(150, 170, 140);

    let h = p.hour() % 12;
    if (h === 0) h = 12;
    let m = p.minute();

    if (m !== lastMinute) {
      lastMinute = m;
      flowers.push({ x: p.random(p.width), y: p.random(p.height) });
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
