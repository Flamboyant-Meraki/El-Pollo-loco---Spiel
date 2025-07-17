let canvas;
let world;
let keyboard = new Keyboard();

function startNewGame() {
  document.getElementById('menuScreen').style.display = 'none';
  document.getElementById('youLooseScreen').style.display = 'none';

  const level = createLevel1();  
  const canvas = document.getElementById('canvas');

  world = new World(canvas, keyboard, level); 
}

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if(event.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(event.keyCode == 69) {
        keyboard.E = true;
    }
});

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if(event.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(event.keyCode == 69) {
        keyboard.E = false;
    }
});