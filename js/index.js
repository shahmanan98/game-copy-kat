const app = new PIXI.Application({
    width: window.screen.availWidth / 2,
    height: window.innerHeight
});

document.getElementById("gameDiv").appendChild(app.view);

const PINK = 0,
    BLUE = 1,
    YELLOW = 2,
    GREEN = 3,
    totalBlocks = 4;
let player;
let box = [];
let mask = [];

const bW = app.view.width / 5;

app.loader.add("assetPink", "./images/pink.png");
app.loader.add("assetBlue", "./images/blue.png");
app.loader.add("assetYellow", "./images/yellow.png");
app.loader.add("assetGreen", "./images/green.png");
app.loader.load(doneLoading);

function doneLoading(e) {
    createBoxes();

    app.ticker.add(gameLoop);
}

function createBoxes(params) {
    // sprites
    let loaderResources = app.loader.resources;

    createSprite(loaderResources.assetPink.url, PINK, app.view.width / 2 - bW, app.view.height / 2 - bW);
    createSprite(loaderResources.assetBlue.url, BLUE, app.view.width / 2 - bW, app.view.height / 2 + bW);
    createSprite(loaderResources.assetYellow.url, YELLOW, app.view.width / 2 + bW, app.view.height / 2 + bW);
    createSprite(loaderResources.assetGreen.url, GREEN, app.view.width / 2 + bW, app.view.height / 2 - bW);

    for (let index = 0; index < box.length; index++) {
        app.stage.addChild(box[index]);
        app.stage.addChild(mask[index]);
    }
}

function createSprite(imgUrl, index, x, y, name = null) {
    let player = new PIXI.Sprite.from(imgUrl);
    player.anchor.set(0.5);
    player.x = x;
    player.y = y;
    player.height = player.width = app.view.width / 5;

    player.name = name;

    let m = new PIXI.Graphics();
    m.beginFill(0xFFFFFF);
    m.alpha = 0;
    m.drawRoundedRect(x - bW / 2, y - bW / 2, bW, bW);
    m.endFill();

    m.interactive = true;
    m.buttonMode = false;

    m.on("pointerdown", (e) => glowBox(index));

    box[index] = player;
    mask[index] = m;
}


// function to glow the box
function glowBox(index) {
    mask[index].alpha = 0.6;
    setTimeout(function () {
        mask[index].alpha = 0;
    }, 400);
}
let flag = true;

function gameLoop(delta) {
    if (!flag) {
        showPattern();
    }
}



// ! logic for game starts from here

let roundCount;
let roundScore;
let trueAttempts;

let questionArray = [];

// * function to generate question
function appendQuestio(params) {
    questionArray = [...questionArray, getRandomColor()];
    showPattern();
}

// * function to run questions
function showPattern() {
    for (const color of questionArray) {
        glowBox(color);
    }
}

// * utility to generate random color
function getRandomColor() {
    return Math.floor(Math.random() * Math.floor(totalBlocks));
}