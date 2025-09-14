class Character extends MovableObject {
  /**
   * Array of image paths used for the walking animation of the character.
   * @type {string[]}
   */
  images_walking = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of image paths used for the jumping animation of the character.
   * @type {string[]}
   */
  images_jumping = [
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
  ];

  /**
   * Array of image paths used for the dying animation of the character.
   * @type {string[]}
   */
  images_dying = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Array of image paths used for the hurt animation of the character.
   * @type {string[]}
   */
  images_hurt = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  /**
   * Array of image paths used for the idle animation of the character.
   * @type {string[]}
   */
  images_idle = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  y = 180;
  currentImage = 0;
  world;
  speed = 10;
  loseTimeout;

  /**
   * Initializes the character by loading images and starting animations.
   * @constructor
   */
  constructor() {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_dying);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_idle);
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts the animation loop for character movement and state transitions.
   * Handles user input and updates character animation accordingly.
   */
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        // this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        // this.walking_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead() && !this.gameOver) {
        this.playAnimation(this.images_dying);
        this.jump();
        this.gameOver = true;
        console.log(this.gameOver);
        loseTimeout = setTimeout(() => {
          document.getElementById("menuScreen").style.display = "flex";
          document.getElementById("controlside").style.display = "none";
          document.getElementById("youWinScreen").style.display = "none";
          document.getElementById("start").style.display = "none";
          document.getElementById("youLooseScreen").style.display = "flex";
          setTimeout(() => {
            resetGame()
          }, 500);
        }, 1500);

        return;
      }

      if (this.isDead()) {
        return;
      }

      if (this.isHurt()) {
        this.playAnimation(this.images_hurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.images_jumping);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.images_walking);
      } else {
        this.playAnimation(this.images_idle);
      }
    }, 100);
  }
}
