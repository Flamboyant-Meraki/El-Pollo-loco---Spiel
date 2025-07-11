class ThrowBottle extends MovableObject {

    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 70;
        this.throw();
    }

    throw(){
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 20);
    }
    
}