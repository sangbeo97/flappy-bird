function StartScreen(game) {
    this.game = game;
    this.width = 184;
    this.height = 267;

    this.init = function () {
        this.x = (this.game.width / 2) - (this.width / 2);
        this.y = (this.game.height / 2) - (this.height / 2);
        this.image = null;
        this.show = true;
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "./assets/images/message.png";
    }

    this.update = function () {
        if (this.game.over && !this.game.gameOver.show)
            this.show = true;
        else
            this.show = false;
    }

    this.draw = function () {
        if (this.show)
            this.game.context.drawImage(this.image, this.x, this.y);
    }

}