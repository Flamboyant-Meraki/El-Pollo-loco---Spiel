class Character extends MovableObject {
  images_walking = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png"
  ];

  images_jumping = [
    'assets/img/2_character_pepe/3_jump/J-31.png',
    'assets/img/2_character_pepe/3_jump/J-32.png',
    'assets/img/2_character_pepe/3_jump/J-33.png',
    'assets/img/2_character_pepe/3_jump/J-34.png',
    'assets/img/2_character_pepe/3_jump/J-35.png',
    'assets/img/2_character_pepe/3_jump/J-36.png',
    'assets/img/2_character_pepe/3_jump/J-37.png',
    'assets/img/2_character_pepe/3_jump/J-38.png',
    'assets/img/2_character_pepe/3_jump/J-39.png'
  ];

  y = 180; 
  currentImage = 0;
  world;
  speed = 10;

  constructor() {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        // this.walking_sound.play();
      }

      if(this.world.keyboard.LEFT && this.x > 0) {
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
      if (this.isAboveGround()) {
          this.playAnimation(this.images_jumping);
      } else {
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          // Walk animation
          this.playAnimation(this.images_walking);
        }
      }
    }, 50);
  }
}
