class ThrowBottle extends MovableObject {
    images_throw = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    images_splash = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    // static allThrownBottles = [];
    splash = false;


    constructor(x, y){
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_throw);
        this.loadImages(this.images_splash);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 70;
        this.throw();
    }

    throw() {
        this.speedY = 14;
        this.applyGravity();

        this.throwInterval = setInterval(() => {
            if (!this.splash) {
                this.x += 12;
            } else {
                this.x += 0;
            }
        }, 20);

        this.animationInterval = setInterval(() => {
            if (!this.splash) {
                this.playAnimation(this.images_throw);
            } else {
                this.playAnimation(this.images_splash);
            }
        console.log(this.splash);aa
        
        }, 60);
    }
}