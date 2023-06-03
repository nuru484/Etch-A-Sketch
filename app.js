const clear = document.querySelector('#clear');
const eraser = document.querySelector('#eraser');
const rainbow = document.querySelector('#rainbow-mode');
const container = document.querySelector('#container');
const colorMode = document.querySelector('#color-mode');
const colorPicker = document.querySelector('#colorpicker')
const slider = document.querySelector('.slider')

let colorPicked;
let colorPickerbutton = true;

colorMode.addEventListener('click', function(){
  colorMode.style.cssText = 'background-color: #1b0e0a; color: white';
  rainbow.style.cssText = 'background-color: white; color: #1b0e0a';
  eraser.style.cssText = 'background-color: white; color: #1b0e0a';
  eraserClicked = false
  colorPickerbutton = true;
});

let numberOfSquares;
slider.addEventListener('input', function(){
  let sliderValue;
  sliderValue = slider.value;
  numberOfSquares = sliderValue;
  createGrid(numberOfSquares);
});

let eraserClicked = false
eraser.addEventListener('click', function () {
  eraser.style.cssText = 'background-color: #1b0e0a; color: white';
  colorMode.style.cssText = 'background-color: white; color: #1b0e0a';
  rainbow.style.cssText = 'background-color: white; color: #1b0e0a';
  eraserClicked = true;
  const squares = container.querySelectorAll('.squares');
  squares.forEach((square) => {
    square.addEventListener('mouseover', function (event) {
        if (eraserClicked === true && event.buttons === 1){
          square.style.backgroundColor = 'white';
        }
    });
  });
});


function generateRandomColor() {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  let color = 'rgb(' + red + ',' + green + ',' + blue + ')';
  return color;
}

var rainbowIsClicked = false;

rainbow.addEventListener('click', function() {
  rainbow.style.cssText = 'background-color: #1b0e0a; color: white';
  colorMode.style.cssText = 'background-color: white; color: #1b0e0a';
  eraser.style.cssText = 'background-color: white; color: #1b0e0a';
  eraserClicked = false;
  rainbowIsClicked = true;
  colorPickerbutton = false;
});


function createGrid(numberOfSquares) {
  container.innerHTML = '';
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < numberOfSquares * numberOfSquares; i++) {
    const theDivs = document.createElement('div');
    theDivs.classList.add('squares');
    theDivs.style.cssText = `box-sizing: border-box; flex-basis: calc(100% / ${numberOfSquares});`;
    theDivs.addEventListener('mouseover', function (event) {
      if ( colorPickerbutton === true && event.buttons === 1) {
        theDivs.style.backgroundColor = colorPicker.value;
      }else if (rainbowIsClicked && event.buttons === 1) {
        theDivs.style.backgroundColor = generateRandomColor();
      }
  });
    fragment.appendChild(theDivs);

    clear.addEventListener('click', function () {
      theDivs.style.backgroundColor = 'white';
    });
  }
  container.appendChild(fragment);
}






createGrid(16);

