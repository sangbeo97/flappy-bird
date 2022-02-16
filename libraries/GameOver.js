function GameOver(game) {
    this.game = game;
    this.width = 192;
    this.height = 42;

    this.init = function () {
        this.x = this.game.width / 2 - (this.width / 2);
        this.y = this.game.height / 2 - this.height;
        this.show = false;
        this.image = null;
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "./assets/images/gameover.png";
    }

    this.update = function () {
        
    }

    this.draw = function () {
        if (this.show)
            this.game.context.drawImage(this.image, this.x, this.y);
    }
}