class Cloud extends MovableObject{
    y = 10;
    width = 400;
    speed;

    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * (1500 - this.width);

        const minSpeed = 0.2;
        const maxSpeed = 1.0;
        this.speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

        this.animate();
    }

    animate() {
        setInterval(() => { 
            this.moveLeft();
        }, 60);
    }
}

