function Bird(game) {
    this.game = game;

    this.init = function () {
        this.images = [];
        this.currentImage = null;
        this.currentFrame = 0;
        this.flapFrame = 16;
        this.imageIndex = 0;
        this.sign = 1;
        this.width = 34;
        this.height = 24;
        this.x = 75;
        this.y = this.game.height / 2 - 24;
        this.speed = 0;
        this.distance = 0;
        this.loadImages();
    }

    this.loadImages = function () {
        let img1 = new Image();
        let img2 = new Image();
        let img3 = new Image();

        img1.src = "./assets/images/yellowbird-upflap.png";
        img2.src = "./assets/images/yellowbird-midflap.png";
        img3.src = "./assets/images/yellowbird-downflap.png";

        this.images.push(img1);
        this.images.push(img2);
        this.images.push(img3);
    }

    this.changeImage = function () {
        if (this.imageIndex == 2)
            this.sign = -1;
        if (this.imageIndex == 0)
            this.sign = 1;

        this.imageIndex += this.sign;
        this.currentImage = this.images[this.imageIndex];
    }

    // Flap per millisecond
    this.flap = function () {
        if (!this.game.start)
            this.flapFrame = 9;
        if (this.currentFrame % this.flapFrame == 0)
            this.changeImage();
        this.currentFrame++;
        if (this.currentFrame === 1000)
            this.currentFrame = 0;
    }

    this.fly = function () {
        if (!this.game.start) {
            this.y = this.game.height / 2;
            return
        }
        // If bird fall, reduce speed
        if (this.distance >= 0) {
            this.speed = 0.25;

            // Flap slower when falling down
            if (this.currentFrame % 4 == 0)
                this.flapFrame++;
        }
        // Distance = old distance + new distance has felt in 1 millisecond
        this.distance = this.distance + this.speed * 1;
        this.y += this.distance;
    }

    this.onClick = function () {
        if (this.game.over)
            return;

        // Fly up speed and distance
        this.distance = -14;
        this.speed = 1.5;

        // Flap faster when fly up
        this.flapFrame = 1;
    }
    this.checkHitPipe = function () {
        let birdLeft = this.x;
        let birdRight = this.x + this.width;
        let birdTop = this.y;
        let birdBot = this.y + this.height;
        let pipeLeft = this.game.pipe.x;
        let pipeRight = this.game.pipe.x + this.game.pipe.width;
        let topPipeBot = this.game.pipe.y - this.game.pipe.pipeGap;
        let botPipeTop = this.game.pipe.y;

        if ((birdRight >= pipeLeft && birdRight <= pipeRight)
            || (birdLeft >= pipeLeft && birdLeft <= pipeRight))
            if (birdTop <= topPipeBot || birdBot >= botPipeTop)
                this.game.over = true;
    }

    this.update = function () {
        this.fly();
        if (this.y + this.height >= this.game.height - this.game.base.height)
            this.game.over = true;
        if (this.game.over) {
            this.currentImage = this.images[1];
            return;
        }
        this.checkHitPipe();
        this.flap();
    }

    this.draw = function () {
        let h = this.game.height - this.game.base.height - this.height;
        if (this.y >= h)
            this.y = h;
        this.game.context.drawImage(this.currentImage, this.x, this.y);
    }
}