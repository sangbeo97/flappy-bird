function Pipe(game) {
    this.game = game;
    this.width = 52;
    this.height = 320;

    this.init = function () {
        this.x = this.game.width;
        this.y = this.randomPipe();;
        this.pipeGap = 111;
        this.pipeUp = null;
        this.pipeDown = null;
        this.loadImage();
    }

    this.loadImage = function () {
        this.pipeUp = new Image();
        this.pipeDown = new Image();
        this.pipeUp.src = "../images/pipe-green-up.png";
        this.pipeDown.src = "../images/pipe-green-down.png";
    }

    this.randomPipe = function () {
        let max = this.game.height - (this.height / 2);
        let min = 0 + (this.height / 2)
        return Math.floor(Math.random() * (max - min) + min);
    }

    this.update = function () {
        if (!this.game.start)
            return;
        if (this.game.over)
            return;
        this.x -= 3;

        /* Redraw pipe */
        if (this.x <= -this.width || this.x == this.game.width && this.y == this.game.height) {
            this.x = this.game.width;
            this.y = this.randomPipe();
        }
    }

    this.draw = function () {
        let botPipeX = this.x;
        let botPipeY = this.y;
        let topPipeX = this.x;
        let topPipeY = botPipeY - this.height - this.pipeGap;

        /* First pipe */
        // Pipe up
        this.game.context.drawImage(this.pipeUp, botPipeX, botPipeY);
        // Pipe down
        this.game.context.drawImage(this.pipeDown, topPipeX, topPipeY);
    }
}