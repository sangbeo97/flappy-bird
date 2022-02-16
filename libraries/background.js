function Background(game) {
    this.game = game;

    this.init = function () {
        this.x = 0;
        this.y = 0;
        this.image = null;
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "./assets/images/background-day.png";
    }

    this.update = function () {
        this.x -= 5;
        if (this.x <= -290)
            this.x = 0;
    }

    this.draw = function () {
        this.game.context.drawImage(this.image, this.x, this.y);
        this.game.context.drawImage(this.image, this.x + 290, this.y);
    }
}