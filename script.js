function start() {
    console.log("started")
    fadeOutStart();
    startGame();
}

function fadeOutStart() {
    document.getElementById("gps").classList.add("fade");
}

function startGame() {

    const woof = document.getElementById("woof");
    const arf = document.getElementById("arf");



    const spriteBig = document.getElementById("big");
    const bigAnimal = new Animal(
        spriteBig,
        "big_idle1.png",
        "big_idle2.png",
        "big_sing.png",
        "a",
        woof
    );


    const spriteSmall = document.getElementById("small");
    const smallAnimal = new Animal(
        spriteSmall,
        "small_idle1.png",
        "small_idle2.png",
        "small_sing.png",
        "s",
        arf
    );

    
    setInterval(() => {
        bigAnimal.updateIdle();
        smallAnimal.updateIdle();
    }, 500);
}

class Animal {
    constructor(element, idle1, idle2, singImg, charKey, audioEl) {
        this.element = element;
        this.idle1 = idle1;
        this.idle2 = idle2;
        this.singImg = singImg;
        this.charKey = charKey;
        this.currentIdle = this.idle1;
        this.isSinging = false;

        this.audioEl = audioEl;
        this.element.src = this.currentIdle;

        window.addEventListener("keydown", (e) => {
            if (e.key.toLowerCase() === this.charKey.toLowerCase()) {
                this.startSing();
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.key.toLowerCase() === this.charKey.toLowerCase()) {
                this.stopSing();
            }
        });
    }

    updateIdle() {
        if (this.isSinging) return;

        this.currentIdle = (this.currentIdle === this.idle1) ? this.idle2 : this.idle1;
        this.element.src = this.currentIdle;
    }

    startSing() {
        if (!this.isSinging) {
            this.isSinging = true;
            this.element.src = this.singImg;
            this.element.style.filter = "brightness(1.3) drop-shadow(0 0 10px goldenrod)";

            this.audioEl.currentTime = 0;
            this.audioEl.play();
        }
    }

    stopSing() {
        if (this.isSinging) {

            this.isSinging = false;
            this.element.src = this.currentIdle;

            this.element.style.filter = "none";
        }
    }

}