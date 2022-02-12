function Background(game) {
    this.game = game;
    this.image = null;
    this.x = 0;

    this.init = function () {
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "../images/background-day.png";
    }

    this.update = function () {
        this.x -= 5;
        if (this.x <= -290)
            this.x = 0;
    }

    this.draw = function () {
        this.game.context.drawImage(this.image, this.x, 0);
        this.game.context.drawImage(this.image, this.x + 290, 0);
    }
}