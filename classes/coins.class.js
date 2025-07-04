class Coin extends DrawableObject {
    static allCoins = [];
    static MAX_TRIES = 100;
    
    constructor() {
        super().loadImage('assets/img/8_coin/coin_2.png');
        
        this.width = 200;
        this.height = 200;

        this.randomPlaced();
        this.floatAnimation();
    }

    randomPlaced(){
        let placed = false;
        let tries = 0;
        while (!placed && tries < Coin.MAX_TRIES) {
            this.x = Math.random() * (1500 - this.width);
            this.y = Math.random() * (450 - this.height);
            if (!this.isOverlappingAny()) {
                placed = true;
                this.baseY = this.y;
                Coin.allCoins.push(this);
            }
            tries++;
        }
    }

    isOverlappingAny() {
        return Coin.allCoins.some(coin => this.isColliding(coin));
    }

    isColliding(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }

    floatAnimation(){
        this.floatAmplitude = 10 + Math.random() * 5;
        this.floatSpeed = 0.03 + Math.random() * 0.02;
        this.floatPhase = Math.random() * Math.PI * 2;
    }

    updateFloatPosition(time) {
        this.y = this.baseY + Math.sin(time * this.floatSpeed + this.floatPhase) * this.floatAmplitude;
    }
}