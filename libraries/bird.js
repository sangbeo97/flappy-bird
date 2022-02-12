function Bird(game) {
    this.game = game;
    this.images = [];
    this.currentImage = null;
    this.currentFrame = 0;
    this.flapFrame = 0;
    this.imageIndex = 0;
    this.sign = 0;
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0
    this.speed = 0;
    this.distance = 0;


    this.init = function () {
        this.loadImages();
        this.sign = 1;
        this.width = 34;
        this.height = 24;
        this.flapFrame = 16;
        this.x = 75;
        this.y = this.game.height / 2 - 24;
    }

    this.loadImages = function () {
        let img1 = new Image();
        let img2 = new Image();
        let img3 = new Image();

        img1.src = "../images/yellowbird-upflap.png";
        img2.src = "../images/yellowbird-midflap.png";
        img3.src = "../images/yellowbird-downflap.png";

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
        if (this.currentFrame % this.flapFrame == 0)
            this.changeImage();
        this.currentFrame++;
        if (this.currentFrame === 1000)
            this.currentFrame = 0;
    }

    this.fly = function () {
        // If bird fall, reduce speed
        if (this.distance >= 0) {
            this.speed = 0.3;

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
        this.distance = -14;
        this.speed = 2;
        this.flapFrame = 1;
    }

    this.update = function () {
        this.fly();
        if (this.game.over) {
            this.currentImage = this.images[1];
            return;
        }
        this.flap();
    }

    this.draw = function () {
        let h = this.game.height - this.game.base.height - this.height;
        if (this.y >= h)
            this.y = h;
        this.game.context.drawImage(this.currentImage, this.x, this.y);
    }
}