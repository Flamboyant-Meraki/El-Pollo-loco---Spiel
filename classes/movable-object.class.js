class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coins = 0;
    lastCoin = 0;
    bottle = 0;
    lastBottle = 0;


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
        if (this instanceof ThrowBottle) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isOnGround() {
        return this.y >= this.groundLevel;
    }

    playAnimation(images){
        let i = this.currentImage % images.length;
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

    isColliding(mo){
        return this.x < mo.x + mo.width &&
           this.x + this.width > mo.x &&
           this.y < mo.y + mo.height &&
           this.y + this.height > mo.y;
    }

    hit(){
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1 ;
    }

    isDead(){
        return this.energy == 0;
    }

    collectCoin(){
        this.coins += 20;
        if (this.coins < 0) {
            this.coins = 0;
        } else {
            this.lastCoin = new Date().getTime();
        }
    }

    collectedCoin(){
        let timepassed = new Date().getTime() - this.lastCoin;
        timepassed = timepassed / 1000;
        return timepassed > 1;
    }    

    collectBottle(){
        this.bottle += 20;
        if (this.bottle < 0) {
            this.bottle = 0;
        } else {
            this.lastBottle = new Date().getTime();
        }
    }

    collectedBottle(){
        let timepassed = new Date().getTime() - this.lastBottle;
        timepassed = timepassed / 1000;
        return timepassed > 1;
    }    
    
}