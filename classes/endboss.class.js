class Endboss extends MovableObject {
    /**
     * Image sequence for alert animation.
     * Triggered when the endboss is idle but aware.
     * @type {string[]}
     */
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

    /**
     * Image sequence for hurt animation.
     * Triggered when the endboss takes damage.
     * @type {string[]}
     */
    images_hurt = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /**
     * Image sequence for death animation.
     * Triggered when the endboss dies.
     * @type {string[]}
     */
    images_dead = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Image sequence for walking animation.
     * Triggered when the endboss moves.
     * @type {string[]}
     */
    images_walking = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /**
     * Image sequence for attack animation.
     * Triggered when the endboss performs an attack.
     * @type {string[]}
     */
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
    endbossTriggered = false;
    endbossIsHurt = false;
    speed = 4;
    winTimeout;

    /**
     * Creates an instance of Endboss and initializes its animations and position.
     */
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

    /**
     * Starts the animation loop for the endboss.
     * Handles movement, animation switching, and game-over logic.
     */
    animate() {
        // Movement loop
        setInterval(() => {
            if (this.endbossTriggered && !this.isDead() && !this.endbossIsHurt) {
                if (world.endboss.x - world.character.x > 0) {
                    this.moveLeft();
                    this.otherDirection = false;
                } else {
                    this.moveRight();
                    this.otherDirection = true;
                }
            }
        }, 60);

        // Animation loop
        setInterval(() => {
            this.checkEndbossTrigger();
            console.log(this.endbossIsHurt);
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
                        resetGame()
                    }, 500);
                }, 1500);
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);
            } else if (this.endbossTriggered === true && !this.endbossIsHurt) {
                this.playAnimation(this.images_walking);
            } else {
                this.playAnimation(this.images_alert);
            }
        }, 160);
    }

    checkEndbossTrigger() {
        if (world.endboss.x - world.character.x <= 380) {
            this.endbossTriggered = true;
        } else {
            this.endbossTriggered = false;
        }
    }
}