class Bottle extends DrawableObject {
    static allBottles = [];
    static MAX_TRIES = 100;
    
    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        
        this.width = 80;
        this.height = 70;

        this.randomPlaced();
    }

    randomPlaced(){
        let placed = false;
        let tries = 0;
        while (!placed && tries < Bottle.MAX_TRIES) {
            this.x = Math.random() * (1500 - this.width);
            this.y = 350;
            if (!this.isOverlappingAny()) {
                placed = true;
                this.baseY = this.y;
                Bottle.allBottles.push(this);
            }
            tries++;
        }
    }

    isOverlappingAny() {
        return Bottle.allBottles.some(bottle => this.isColliding(bottle));
    }

    isColliding(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}