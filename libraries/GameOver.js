function GameOver(game) {
    this.game = game;
    this.width = 192;
    this.height = 42;

    this.init = function () {
        this.x = this.game.width / 2 - (this.width / 2);
        this.y = 150;
        this.count = 0;
        this.show = false;
        this.image = null;
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "./assets/images/gameover.png";
    }

    this.update = function () {
        if (this.game.bird.y + this.game.bird.height >= this.game.height - this.game.base.height) {
            this.show = true;
            if (this.count != 0)
                return;
            this.count++;
            setTimeout(function () {
                this.count = 0;
                this.show = false;
                this.game.over = false;
                this.game.start = false;
                this.game.reset();
            }.bind(this), 2000);
        }
    }

    this.draw = function () {
        if (this.show)
            this.game.context.drawImage(this.image, this.x, this.y);
    }
}