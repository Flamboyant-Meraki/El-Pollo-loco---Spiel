let canvas;
let world;
let keyboard = new Keyboard();

function startNewGame() {
  document.getElementById('menuScreen').style.display = 'none';

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

function fullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { 
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { 
    document.msExitFullscreen();
  }
}

function showControls() {
  document.getElementById('start').style.display = 'none';
  document.getElementById('controlside').style.display = 'flex';
}

function toMainMenu(){
  document.getElementById('controlside').style.display = 'none';
  document.getElementById('youLooseScreen').style.display = 'none';
  document.getElementById('youWinScreen').style.display = 'none';
  document.getElementById('start').style.display = 'block';
}

function resetGame() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = null;
}