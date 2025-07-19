class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbar = new StatusBar();
    statusbarCoins = new StatusBarCoins();
    statusbarBottle = new StatusBarBottles();
    throwBottle = [new ThrowBottle()];
    canThrow = false;
    cooldownReady = true;

    constructor(canvas, keyboard, level){
        this.level = level;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.canBeHit = true;
        this.buttonImage = new Image();
        this.buttonImage.src = 'assets/img/icons/fullscreen.png';
        this.clickListener();
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
        }, 60);
    }

    checkCollisions(){
        this.collideWithEnemy();
        this.collideWithCoin();
        this.collideWithBottle();
    }
   
    collideWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.canBeHit) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
                this.canBeHit = false;
                setTimeout(() => {
                    this.canBeHit = true;
                }, 1300);
            }
        });
    }

    collideWithCoin(){
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
    }

    collideWithBottle(){
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

    checkThrownBottle() {
        this.checkBottleAvailability();
        if (this.canThrow == true && this.cooldownReady && this.keyboard.E) {
            this.bottleThrow();
            
            let bottlePercentage = this.character.bottle;  
            this.statusbarBottle.setPercentage(bottlePercentage);
            this.canThrow = false;
            this.cooldownReady = false;

            setTimeout(() => {
            this.cooldownReady = true;  
        }, 300);
        }
    }

    checkBottleAvailability() {
        if (this.character.bottle >= 20) {
            this.canThrow = true;
        } else {
            this.canThrow = false;
        }
    }

    bottleThrow(){
        let bottle = new ThrowBottle(this.character.x, this.character.y);
        this.throwBottle.push(bottle);
        this.character.bottle -= 20;
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
        this.drawButton();
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

    drawButton() {
        const x = 670;
        const y = 440;
        const width = 30;
        const height = 25;

        const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
        if (isFullscreen) {
            document.getElementById('canvas').style.border = 'none'
            return;
        }

        if (this.buttonImage.complete) {
            this.ctx.drawImage(this.buttonImage, x, y, width, height);
            document.getElementById('canvas').style.border = '8px solid rgb(135, 36, 0)';
        }
    }

    clickListener(){
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const btnX = 600;    
            const btnY = 430;
            const btnWidth = 120;
            const btnHeight = 40;

            if (x >= btnX && x <= btnX + btnWidth &&
                y >= btnY && y <= btnY + btnHeight) {

                this.activateFullscreen();
            }
        });
    }

    activateFullscreen() {
        const fsElement = document.fullscreenElement || document.webkitFullscreenElement;

        if (fsElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            console.log('Vollbild deaktiviert!');
        } else {
            if (this.canvas.requestFullscreen) {
                this.canvas.requestFullscreen();
            } else if (this.canvas.webkitRequestFullscreen) {
                this.canvas.webkitRequestFullscreen();
            }
            console.log('Vollbild aktiviert!');
        }
    }
}