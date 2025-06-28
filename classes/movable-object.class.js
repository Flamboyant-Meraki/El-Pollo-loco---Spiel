class MovableObject {
    x = 120;
    y = 180;
    img;
    height = 250;
    width = 125;
    imageCache = [];
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path
            this.imageCache[path] = img;
        });
        
    }

    moveRight() {
        console.log('moving right');
    }
}