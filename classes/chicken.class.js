class Chicken extends MovableObject {
    height = 70;
    width = 60;
    y = 355;
    images_walking = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    
    constructor(){
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_walking);
        this.x = 400 + Math.random() * 500;
        this.speed = 3 + Math.random() * 5;
        this.animate();
    }

    animate() {
      this.moveLeft();
      setInterval(() => {
          this.playAnimation(this.images_walking);
      }, 80);
  }
}