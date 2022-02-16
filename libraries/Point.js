function Point(game) {
    this.game = game;
    this.width = 24;
    this.height = 36;

    this.init = function () {
        this.x = this.game.width / 2;
        this.y = 10;
        this.imgIndex = 0;
        this.images = [];
        this.currentImage = null;
        this.loadImage();
    }

    this.loadImage = function () {
        for (let i = 0; i <= 9; ++i) {
            let img = new Image();
            img.src = `./assets/images/${i}.png`;
            this.images.push(img);
        }
    }

    this.update = function () {
        this.currentImage = this.images[this.imgIndex % 10];
        if (this.game.bird.x == this.game.pipe.x)
            this.imgIndex++;
    }

    this.draw = function () {
        this.game.context.drawImage(this.currentImage, this.x, this.y);
        if (this.imgIndex > 9) {
            this.game.context.drawImage(this.images[Math.floor(this.imgIndex / 10)], this.x - this.width + 5, this.y);
        }
    }
}