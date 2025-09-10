class Cloud extends MovableObject{
    y = 10;
    width = 400;
    speed;

    /**
     * Represents a moving cloud object in the background layer.
     * Initializes its position and movement speed, and starts the animation loop.
     */
    constructor() {
        // Load the initial cloud image
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        /**
         * Horizontal position of the cloud, randomized within screen bounds.
         * @type {number}
         */
        this.x = Math.random() * (1500 - this.width);

        /**
         * Movement speed of the cloud, randomized between minSpeed and maxSpeed.
         * @type {number}
         */
        const minSpeed = 0.2;
        const maxSpeed = 1.0;
        this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

        // Start the animation loop
        this.animate();
    }

    /**
     * Starts the animation loop that moves the cloud to the left at regular intervals.
     * The movement simulates drifting across the screen.
     */
    animate() {
        setInterval(() => { 
            this.moveLeft();
        }, 60); // Move every 60 milliseconds
    }
}

