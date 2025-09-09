class Chicken extends MovableObject {
    height = 70;
    width = 60;
    y = 355;
    images_walking = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    
    /**
     * Creates a new instance of the chicken enemy.
     * Loads the default image and animation frames, sets a random starting position and speed,
     * and starts movement and animation loops.
     */
    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.x = 600 + Math.random() * 1500; // Random horizontal position
        this.speed = 3 + Math.random() * 5;  // Random movement speed
        this.animate(); // Start movement and animation
    }

    /**
     * Starts two intervals:
     * - One for moving the enemy to the left continuously.
     * - One for cycling through walking animation frames.
     */
    animate() {
        // Movement loop: updates position every 60ms
        setInterval(() => { 
            this.moveLeft();
        }, 60);

        // Animation loop: updates image every 80ms
        setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 80);
    }
}