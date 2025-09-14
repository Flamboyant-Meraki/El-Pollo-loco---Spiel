let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Starts a new game by hiding the menu screen,
 * creating the level, and initializing the game world.
 */
function startNewGame() {
  document.getElementById('menuScreen').style.display = 'none';

  const level = createLevel1();  
  const canvas = document.getElementById('canvas');

  world = new World(canvas, keyboard, level); 
}

/**
 * Listens for keydown events and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The keydown event.
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode === 68) { // 'D' key
        keyboard.RIGHT = true;
    }

    if (event.keyCode === 65) { // 'A' key
        keyboard.LEFT = true;
    }

    if (event.keyCode === 32) { // Spacebar
        keyboard.SPACE = true;
    }

    if (event.keyCode === 69) { // 'E' key
        keyboard.E = true;
    }
});

/**
 * Listens for keyup events and resets the keyboard state.
 * @param {KeyboardEvent} event - The keyup event.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode === 68) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode === 65) {
        keyboard.LEFT = false;
    }

    if (event.keyCode === 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode === 69) {
        keyboard.E = false;
    }
});

/**
 * Triggers fullscreen mode for the game container.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    openFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for a given HTML element.
 * @param {HTMLElement} elem - The element to display in fullscreen.
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { 
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { 
    document.msExitFullscreen();
  }
}

/**
 * Displays the control instructions screen and hides the start button.
 */
function showControls() {
  document.getElementById('start').style.display = 'none';
  document.getElementById('controlside').style.display = 'flex';
}

/**
 * Returns to the main menu by hiding all end screens and showing the start button.
 */
function toMainMenu() {
  document.getElementById('controlside').style.display = 'none';
  document.getElementById('youLooseScreen').style.display = 'none';
  document.getElementById('youWinScreen').style.display = 'none';
  document.getElementById('start').style.display = 'block';
}

/**
 * Resets the game state, clears the canvas, stops the world,
 * and resets character and boss energy.
 */
function resetGame() {
  if (world && typeof world.stop === 'function') {
    world.stop();
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  enemies = [];
  gameOver = false;
  Character.energy = 100;
  Endboss.energy = 60;
}