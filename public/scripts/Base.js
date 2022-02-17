function Base(game) {
        this.game = game;
        this.width = 336;
        this.height = 112;

    this.init = function () {
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = null;
        this.loadImage();
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
