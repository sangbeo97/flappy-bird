function Game() {
    this.width = 288;
    this.height = 512;

    this.init = function () {
        /* Create canvas and add to html body */
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.appendChild(this.canvas);

        this.over = false;
        this.start = false;
        this.dieSound = new Audio("./assets/audio/die.ogg");
        this.hitSound = new Audio("./assets/audio/hit.ogg");
        this.pointSound = new Audio("./assets/audio/point.ogg");
        this.swooshSound = new Audio("./assets/audio/swoosh.ogg");
        this.wingSound = new Audio("./assets/audio/wing.ogg");
        this.wingSound.preload = "auto";
        this.wingSound.buffered;

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

        /* Create point */
        this.point = new Point(this);
        this.point.init();

        this.gameOver = new GameOver(this);
        this.gameOver.init();

        this.startScreen = new StartScreen(this);
        this.startScreen.init();

        this.canvas.addEventListener("click", function () {
            console.log("Clicked");
            this.play();
        }.bind(this))


        /* Events loop */
        this.loop();
    }

    document.addEventListener("keyup", function (event) {
        console.log(event.code);
        if (event.code === "ArrowUp" || event.code === "Space") {
            this.play();
        }
    }.bind(this));

    this.play = function () {
        if (!this.start && this.startScreen.show)
            this.start = true;
        this.bird.onClick();
    }

    this.update = function () {
        this.pipe.update();
        this.base.update();
        this.point.update();
        this.bird.update();
        this.startScreen.update();
        this.gameOver.update();
    }

    this.draw = function () {
        this.background.draw();
        this.pipe.draw();
        this.base.draw()
        this.point.draw();
        this.bird.draw();
        this.startScreen.draw();
        this.gameOver.draw();
    }

    this.loop = function () {
        this.update();
        this.draw();
        setTimeout(this.loop.bind(this), 16);
    }

    this.reset = function () {
        this.swooshSound.play();
        this.bird.init();
        this.pipe.init();
        this.point.init();
    }
}

const game = new Game();
game.init();

game.canvas.style.display = "block";
game.canvas.style.margin = "auto";
