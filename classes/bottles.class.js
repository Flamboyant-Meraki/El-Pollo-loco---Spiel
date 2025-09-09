class Bottle extends DrawableObject {
    static allBottles = [];
    static MAX_TRIES = 100;
    
    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        
        this.width = 80;
        this.height = 70;

        this.randomPlaced();
    }

    /**
     * Attempts to place the bottle at a random position within a defined horizontal range.
     * Ensures that the bottle does not overlap with any existing bottles.
     * The method tries up to Bottle.MAX_TRIES times before giving up.
     */
    randomPlaced() {
        let placed = false;
        let tries = 0;
        while (!placed && tries < Bottle.MAX_TRIES) {
            this.x = Math.random() * (1500 - this.width - 210) + 250;
            this.y = 350;
            if (!this.isOverlappingAny()) {
                placed = true;
                this.baseY = this.y;
                Bottle.allBottles.push(this);
            }
            tries++;
        }
    }

    /**
     * Checks whether this bottle overlaps with any other bottle in the Bottle.allBottles array.
     * @returns {boolean} True if overlapping with any other bottle, false otherwise.
     */
    isOverlappingAny() {
        return Bottle.allBottles.some(bottle => this.isColliding(bottle));
    }

    /**
     * Determines whether this bottle is colliding with another bottle.
     * Collision is based on axis-aligned bounding box (AABB) logic.
     * @param {Bottle} other - The other bottle to check collision against.
     * @returns {boolean} True if the bottles are colliding, false otherwise.
     */
    isColliding(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}