class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 125;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;


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

    playAnimation(images){
        let i = this.currentImage % this.images_walking.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        setInterval(() => {
            this.x += this.speed;
        }, 60);
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 60);
    }
}