registerSketch('sk5', function (p) {
  let table;
  let dropdown;
  let selectedCountry = null;
  let img;
  let yearSlider;

  let baseScale = 0.5;
  let contexts = [
    { name: 'Political Context', color: [255, 0, 0] },
    { name: 'Economic Context', color: [255, 165, 0] },
    { name: 'Legal Context', color: [255, 255, 0] },
    { name: 'Social Context', color: [0, 128, 0] },
    { name: 'Safety', color: [0, 0, 255] }
  ];
  let availableYears = [2022, 2023, 2024, 2025];

  p.preload = function () {
    table = p.loadTable('press_freedom.csv', 'csv', 'header');
    img = p.loadImage('images/globe.jpeg');
  };

  p.setup = function () {
    p.createCanvas(800, 800);
    p.textAlign(p.CENTER, p.CENTER);

    // Country dropdown
    dropdown = p.createSelect();
    dropdown.position(20, 40);
    dropdown.option('Select a Country');
    for (let r = 0; r < table.getRowCount(); r++) {
      dropdown.option(table.getString(r, 'Country_EN'));
    }
    dropdown.changed(() => selectedCountry = dropdown.value());

    // Year slider
    yearSlider = p.createSlider(0, availableYears.length - 1, availableYears.length - 1);
    yearSlider.position(20, 80);
    yearSlider.style('width', '200px');
  };

  p.draw = function () {
    p.background(20);

    // Title
    p.fill(255);
    p.textSize(24);
    p.textAlign(p.CENTER, p.TOP);
    p.text("Through the Lens of Freedom", p.width / 2, 10);

    if (!selectedCountry || selectedCountry === 'Select a Country') {
      p.fill(255);
      p.textSize(18);
      p.text("Please select a country to view its freedom data", p.width / 2, p.height / 2);
      return;
    }

    let row = table.findRow(selectedCountry, 'Country_EN');
    if (!row) {
      p.fill(255);
      p.textSize(18);
      p.text("Data not found for this country", p.width / 2, p.height / 2);
      return;
    }

    let selectedYear = availableYears[yearSlider.value()];
    let scoreColumn = `Score_${selectedYear}`;
    let pressScore = parseFloat(row.get(scoreColumn));

    // Camera body
    let camWidth = 700;
    let camHeight = 700;
    p.push();
    p.noFill();
    p.stroke(255, 150);
    p.strokeWeight(3);
    p.rectMode(p.CENTER);
    p.rect(p.width / 2, p.height / 2 + 20, camWidth, camHeight, 20);
    p.pop();

    // Screen inset
    let screenX = p.width / 2;
    let screenY = p.height / 2 + 20;
    let screenW = camWidth - 40;
    let screenH = camHeight - 40;
    p.push();
    p.fill(15);
    p.stroke(255, 50);
    p.strokeWeight(2);
    p.rectMode(p.CENTER);
    p.rect(screenX, screenY, screenW, screenH, 12);
    p.pop();

    // Lens setup
    let centerX = screenX;
    let centerY = screenY;
    let maxRadius = p.map(pressScore, 0, 100, 150, 220);
    let minRadius = 70 * baseScale;
    let step = (maxRadius - minRadius) / contexts.length;

    // Gradient lens overlay
    p.push();
    let ctx = p.drawingContext;
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, maxRadius, 0, 2 * Math.PI);
    let gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
    let grayValue = p.map(pressScore, 0, 100, 50, 220);
    gradient.addColorStop(0, `rgba(${grayValue},${grayValue},${grayValue},0.2)`);
    gradient.addColorStop(1, `rgba(${grayValue},${grayValue},${grayValue},0.5)`);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();
    p.pop();

    // Blurred globe
    let maxBlur = 3;
    let blurAmount = p.map(pressScore, 0, 100, maxBlur, 0);
    p.push();
    p.imageMode(p.CENTER);
    let imgSize = minRadius * 2;
    p.image(img, centerX, centerY, imgSize, imgSize);
    p.filter(p.BLUR, blurAmount);
    p.pop();

    // Lens rings
    let scores = [];
    contexts.forEach((context, i) => {
      let score = parseFloat(row.get(context.name));
      scores.push(score);
      let alpha = p.map(score, 0, 100, 255, 50);
      let radius = maxRadius - i * step;
      for (let j = 0; j < 5; j++) {
        p.strokeWeight((12 - j * 2) * baseScale);
        p.stroke(...context.color, alpha - j * 20);
        p.noFill();
        p.ellipse(centerX, centerY, radius * 2 + j * 10, radius * 2 + j * 10);
      }
    });

    // Highlight lowest context
    let minScore = Math.min(...scores);
    let minIndex = scores.indexOf(minScore);
    let highlightRadius = maxRadius - minIndex * step;
    p.strokeWeight(2 * baseScale);
    p.stroke(255);
    p.noFill();
    p.ellipse(centerX, centerY, highlightRadius * 2 + 10, highlightRadius * 2 + 10);

    // Legends inside screen
    let legendX = screenX - screenW / 2 + 40;
    let legendStartY = screenY - screenH / 2 + 60;
    let boxSpacing = 40;
    contexts.forEach((context, i) => {
      p.fill(...context.color);
      p.rect(legendX, legendStartY + i * boxSpacing, 16, 16);
      p.fill(255);
      p.noStroke();
      p.textAlign(p.LEFT, p.CENTER);
      p.textSize(12);
      p.text(context.name, legendX + 25, legendStartY + i * boxSpacing + 8);
    });

    // Country + Score
    p.fill(255);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(18);
    p.text(selectedCountry, centerX, centerY - maxRadius - 30);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(14);
    p.text(`Overall Score ${selectedYear}: ${pressScore}`, centerX, centerY + maxRadius + 15);

    // Top/Lowest box
    let boxX = screenX + screenW / 2 - 130;
    let boxY = screenY - screenH / 2 + 150;
    drawTopLowestBox(p, table, selectedYear, boxX, boxY);

    // Year slider label
    p.noStroke();
    p.fill(255);
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text(`Year: ${selectedYear}`, yearSlider.x + yearSlider.width + 10, yearSlider.y + 10);

    // Gradient legend for overall Press Freedom
    drawScoreGradientLegend(p, centerX, centerY, maxRadius);
  };

  function drawTopLowestBox(p, table, selectedYear, x, y) {
    let boxWidth = 240;
    let boxHeight = 260;
    let padding = 15;
    let entryCount = 6;
    let entryHeight = (boxHeight - 2 * padding - 30) / entryCount;
    let fontSizeBox = Math.min(14, entryHeight * 0.6);

    // Box background
    p.push();
    p.fill(30, 220);
    p.stroke(255, 180);
    p.strokeWeight(2);
    p.rectMode(p.CENTER);
    p.rect(x, y, boxWidth, boxHeight, 12);

    p.fill(255);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(16);
    p.text(`Top & Lowest Countries ${selectedYear}`, x, y - boxHeight / 2 + padding);
    p.pop();

    // Prepare scores
    let scores = [];
    for (let r = 0; r < table.getRowCount(); r++) {
      let rowScore = parseFloat(table.getString(r, `Score_${selectedYear}`));
      scores.push({ country: table.getString(r, 'Country_EN'), score: rowScore });
    }
    scores.sort((a, b) => b.score - a.score);

    let top3 = scores.slice(0, 3);
    let bottom3 = scores.slice(scores.length - 3);

    // Draw entries
    p.push();
    p.textSize(fontSizeBox);
    p.textAlign(p.LEFT, p.CENTER);
    p.fill(255);
    for (let i = 0; i < 3; i++) {
      let entry = top3[i];
      let entryY = y - boxHeight / 2 + padding + 30 + i * entryHeight;
      p.text(`${i + 1}. ${entry.country}: ${entry.score}`, x - boxWidth / 2 + 8, entryY);
    }
    for (let i = 0; i < 3; i++) {
      let entry = bottom3[i];
      let entryY = y - boxHeight / 2 + padding + 30 + (i + 3) * entryHeight;
      p.text(`${scores.length - 2 + i}. ${entry.country}: ${entry.score}`, x - boxWidth / 2 + 8, entryY);
    }
    p.pop();
  }

  function drawScoreGradientLegend(p, centerX, centerY, maxRadius) {
    let legendW = 200;
    let legendH = 12;
    let legendX = centerX - legendW / 2;
    let legendY = centerY + maxRadius + 40;

    p.push();
    let ctx = p.drawingContext;
    ctx.save();
    let gradient = ctx.createLinearGradient(legendX, legendY, legendX + legendW, legendY);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'green');
    ctx.fillStyle = gradient;
    ctx.fillRect(legendX, legendY, legendW, legendH);
    ctx.restore();

    p.fill(255);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text("Low", legendX, legendY + legendH + 12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text("Medium", legendX + legendW / 2, legendY + legendH + 12);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text("High", legendX + legendW, legendY + legendH + 12);
    p.pop();
  }

  p.windowResized = function () { p.resizeCanvas(p.windowWidth, p.windowHeight); };
});
