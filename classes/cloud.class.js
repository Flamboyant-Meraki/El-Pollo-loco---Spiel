class Cloud extends MovableObject{

    constructor(){
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.y = 30;
        this.width = 400;
    }
}