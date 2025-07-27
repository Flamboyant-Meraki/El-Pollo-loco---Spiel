class Endboss extends MovableObject {
    images_alert = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    images_hurt = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    images_dead = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    images_walking = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    images_attack = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    height = 400;
    width = 300;
    y = 50;
    energy = 60;
    world;
    

    constructor() {
        super().loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.images_alert);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_walking);
        this.loadImages(this.images_attack);
        this.x = 1500;
        this.animate();
    }

    animate(){
        setInterval(() => {
            if (this.isDead() && !this.gameOver) {
                this.playAnimation(this.images_dead);
                this.gameOver = true;
                setTimeout(() => {
                    document.getElementById('menuScreen').style.display = 'flex';
                    document.getElementById("controlside").style.display = "none";
                    document.getElementById('youLooseScreen').style.display = 'none';
                    document.getElementById('start').style.display = 'none';
                    document.getElementById('youWinScreen').style.display = 'flex';
                    setTimeout(() => {
                        resetGame();
                    }, 50);
                }, 1500);
            } else if(this.isHurt()){
                this.playAnimation(this.images_hurt);
            } else {
                this.playAnimation(this.images_alert);
            }
        }, 160);
    }
}