function Base(game) {
    this.game = game;
    this.image = null;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;

    this.init = function () {
        this.loadImage();
        this.width = 336;
        this.height = 112;
        this.y = this.game.height - this.height;
    }

    this.update = function () {
        if (this.game.over)
            return;
        this.x -= 3;
        if (this.x == -this.width)
            this.x = 0;

    }
    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "../images/base.png";
    }

    this.draw = function () {
        this.game.context.drawImage(this.image, this.x, this.game.height - this.height);
        this.game.context.drawImage(this.image, this.x + this.width, this.y);
    }
}
