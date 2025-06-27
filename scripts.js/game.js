let canvas;
let world;

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My Character is', world.character);
    // ctx.drawImage(character, 50, 200, 125, 250);
}