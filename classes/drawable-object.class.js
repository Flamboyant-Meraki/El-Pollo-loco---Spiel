class DrawableObject {
    x = 120;
    img;
    height = 250;
    width = 125;
    imageCache = [];
    currentImage = 0;
    image_fullscreen = ['assets/img/icons/fullscreen.png'];

    constructor(){
        this.loadImages(this.image_fullscreen);
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path
            this.imageCache[path] = img;
        });
        
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}