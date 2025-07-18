class Cloud extends MovableObject{
    y = 10;
    width = 400;
    speed = 1;

    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * (1500 - this.width);

        this.animate();
    }

    animate() {
        setInterval(() => { 
            this.moveLeft();
        }, 60);
    }
}

