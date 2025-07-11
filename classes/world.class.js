class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    statusbarCoins = new StatusBarCoins();
    statusbarBottle = new StatusBarBottles();
    throwBottle = [new ThrowBottle()];

    constructor(canvas, keyboard){
        this.level = level1;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkCollisions();
            this.checkThrownBottle();
        }, 200);
    }

    checkCollisions(){
        this.level.enemies.forEach( (enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
        this.level.coins.forEach( (coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                this.statusbarCoins.setPercentage(this.character.coins);
                const index = this.level.coins.indexOf(coin);
                if (index > -1) {
                    this.level.coins.splice(index, 1);
                }
            }
        });
        this.level.bottles.forEach( (bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                this.statusbarBottle.setPercentage(this.character.bottle);
                const index = this.level.bottles.indexOf(bottle);
                if (index > -1) {
                    this.level.bottles.splice(index, 1);
                }
            }
        });
    }

    checkThrownBottle(){
        if (this.keyboard.E) {
            let bottle = new ThrowBottle(this.character.x, this.character.y);
            this.throwBottle.push(bottle);
        }
    }
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.statusbarCoins);
        this.addToMap(this.statusbarBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwBottle)
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flippImg(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flippImgBack(mo);
        }
    }

    flippImg(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flippImgBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}