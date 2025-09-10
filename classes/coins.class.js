class Coin extends DrawableObject {
    static allCoins = [];
    static MAX_TRIES = 100;
    
    /**
     * Represents a collectible coin object in the game world.
     * Initializes its size, position, and optionally starts its animation.
     */
    constructor() {
        // Load the coin image
        super().loadImage('assets/img/8_coin/coin_2.png');

        /**
         * Width of the coin sprite in pixels.
         * @type {number}
         */
        this.width = 150;

        /**
         * Height of the coin sprite in pixels.
         * @type {number}
         */
        this.height = 150;

        // Randomly place the coin on the map without overlapping others
        this.randomPlaced();

        // Optional floating animation (currently disabled)
        // this.floatAnimation();
    }

    /**
     * Randomly places the coin within the game area.
     * Ensures that it does not overlap with any existing coins.
     */
    randomPlaced() {
        let placed = false;
        let tries = 0;

        while (!placed && tries < Coin.MAX_TRIES) {
            /**
             * Horizontal position of the coin.
             * Randomized within a safe range to avoid UI overlap.
             * @type {number}
             */
            this.x = Math.random() * (1500 - this.width - 210) + 250;

            /**
             * Vertical position of the coin.
             * Randomized within the visible game height.
             * @type {number}
             */
            this.y = Math.random() * (450 - this.height);

            if (!this.isOverlappingAny()) {
                placed = true;

                /**
                 * Base Y position used for animation reference.
                 * @type {number}
                 */
                this.baseY = this.y;

                // Register this coin in the global coin list
                Coin.allCoins.push(this);
            }

            tries++;
        }
    }

    /**
     * Checks whether this coin overlaps with any other coin.
     * @returns {boolean} True if overlapping with another coin, false otherwise.
     */
    isOverlappingAny() {
        return Coin.allCoins.some(coin => this.isColliding(coin));
    }

    /**
     * Determines whether this coin is colliding with another coin.
     * Uses axis-aligned bounding box (AABB) collision detection.
     * @param {Coin} other - Another coin to check collision against.
     * @returns {boolean} True if the coins are colliding, false otherwise.
     */
    isColliding(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}