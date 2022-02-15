function Pipe(game) {
    this.game = game;
    this.image = null;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;

    this.init = function () {
        this.width = 52;
        this.height = 320;
        this.x = this.game.width;
        this.y = this.height;
        this.loadImage();
    }

    this.loadImage = function () {
        this.image = new Image();
        this.image.src = "./images/pipe-green.png";
    }

    this.update = function () {
        if (this.game.over)
            return;
        this.x -= 3;
        if (this.x <= -this.width) {
            this.x = this.game.width;
            this.y = Math.floor(Math.random() * (320 - 120) + 120);
        }
    }

    this.draw = function () {
        let botPipeX = this.x;
        let botPipeY = this.y;
        let topPipeX = this.x;
        let topPipeY = botPipeY - this.height - 120;

        /* First pipe */
        // Bot pipe
        this.game.context.drawImage(this.image, botPipeX, botPipeY);
        // Top pipe
        this.game.context.drawImage(this.image, topPipeX, topPipeY);
    }
}