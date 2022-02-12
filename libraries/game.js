function Game() {
    this.canvas = null;
    this.context = null;
    this.width = 288;
    this.height = 512;
    this.bird = null;
    this.pipe = null;
    this.base = null;
    this.background = null;
    this.over = false;

    this.init = function () {

        /* Create canvas and add to html body */
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);

        /* Create background */
        this.background = new Background(this);
        this.background.init();

        /* Create base */
        this.base = new Base(this);
        this.base.init();

        /* Create pipe */
        this.pipe = new Pipe(this);
        this.pipe.init();

        /* Create bird */
        this.bird = new Bird(this);
        this.bird.init();

        /* Events loop */
        this.mouseClick();

        this.loop();
    }

    this.mouseClick = function () {
        this.canvas.addEventListener("click", function () {
            this.bird.onClick();
        }.bind(this));
    }

    // this.gameOver = function () {
    //     if (this.overk)
    // }

    document.addEventListener("keyup", function (event) {
        console.log(event.code);
        if (event.code === "ArrowUp" || event.code === "Space")
            this.bird.onClick();
    }.bind(this));

    this.checkHitPipe = function () {
        let birdLeft = this.bird.x;
        let birdRight = this.bird.x + this.bird.width;
        let birdTop = this.bird.y;
        let birdBot = this.bird.y + this.bird.height;
        let pipeLeft = this.pipe.x;
        let pipeRight = this.pipe.x + this.pipe.width;
        let topPipeBot = this.pipe.y - 120;
        let botPipeTop = this.pipe.y;

        if ((birdRight >= pipeLeft && birdRight <= pipeRight)
            || (birdLeft >= pipeLeft && birdLeft <= pipeRight))
            if (birdTop <= topPipeBot || birdBot >= botPipeTop)
                this.over = true;
    }

    this.update = function () {
        if (this.bird.y + this.bird.height == this.height - this.base.height)
            this.over = true;
        // this.background.update();
        this.pipe.update();
        this.base.update();
        this.bird.update();
        this.checkHitPipe();
    }

    this.draw = function () {
        this.background.draw();
        this.pipe.draw();
        this.base.draw()
        this.bird.draw();
    }

    this.loop = function () {
        this.update();
        this.draw();
        setTimeout(this.loop.bind(this), 16);
    }
}

let game = new Game();
game.init();

game.canvas.style.display = "block";
game.canvas.style.margin = "auto";