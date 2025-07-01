class MovableObject {
    x = 120;
    img;
    height = 250;
    width = 125;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;


    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
                this.y = 180;
            }
        }, 1000 / 25 );
    }

    isAboveGround(){
        return this.y < 180;
    }

    isOnGround() {
        return this.y >= this.groundLevel;
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

    playAnimation(images){
        let i = this.currentImage % this.images_walking.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    jump(){
        this.speedY = 30;
    }
}