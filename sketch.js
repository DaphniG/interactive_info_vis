//custom variables for y-coordinate of sun & horizon
let shapeHeight;

let designWidth = 400;
let designHeight = 400;
let horizon;
function setup() {
  createCanvas(windowWidth, windowHeight);
  horizon = height / 2;
}

function draw() {

  //shape follows y-coordinate of mouse
  shapeHeight = mouseY;
  currentWidth = mouseX;

  //light blue background if the shape is above horizon

  //with if-else statement
  if (shapeHeight < horizon) {
    background("#A45A3D"); // blue if above horizon

  } else {
    background("#6B4226"); // grey if below horizon
  }

  //sun
  fill("#C4B6A6");

  rect(width / 4, shapeHeight, width / 2);
  textSize(20);
  fill("#E8DAB2");
  text('Hi! My name is Daphni George', currentWidth / 2, shapeHeight / 2);



  // draw line for horizon
  stroke('lavender');
  line(0, horizon, width, horizon);

  //grass

  fill("#E8DAB2");

  rect(0, horizon, width, height);

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  horizon = height / 2; // recalc horizon after resize
}

