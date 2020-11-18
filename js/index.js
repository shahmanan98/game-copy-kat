// const { Graphics } = require("./pixi_5");

const app = new PIXI.Application({
    width: window.screen.availWidth / 2,
    height: window.screen.availHeight
});

document.getElementById("gameDiv").appendChild(app.view);

const PINK = 0, BLUE = 1, YELLOW = 2, GREEN = 3;
let boxes = {};
let player;
let bPink, bBlue, bYellow, bGreen;
let mask;

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
    console.log(loaderResources);

    bPink = createSprite(loaderResources.assetPink.url, app.view.width / 2 - bW, app.view.height / 2 - bW);
    bBlue = createSprite(loaderResources.assetBlue.url, app.view.width / 2 - bW, app.view.height / 2 + bW);
    bYellow = createSprite(loaderResources.assetYellow.url, app.view.width / 2 + bW, app.view.height / 2 + bW);
    bGreen = createSprite(loaderResources.assetGreen.url, app.view.width / 2 + bW, app.view.height / 2 - bW);

    app.stage.addChild(bPink);
    app.stage.addChild(bBlue);
    app.stage.addChild(bYellow);
    app.stage.addChild(bGreen);

    mask = createMask();
    app.stage.addChild(mask);

}

function createSprite(imgUrl, x, y, name = null) {
    let player = new PIXI.Sprite.from(imgUrl);
    player.anchor.set(0.5);
    player.x = x;
    player.y = y;
    player.height = player.width = app.view.width / 5;

    player.name = name;
    player.interactive = true;
    player.buttonMode = true;

    player.on("pointerdown", glowBox);
    return player;
}

function createMask() {
    let mask = new PIXI.Graphics();
    console.log(mask);
    mask.beginFill(0xFFFFFF);
    mask.drawRoundedRect(bW, bW+25, bW, bW);
    // mask.endFill();
    mask.alpha = 0.5;

    return mask;
}
// function to glow the box
function glowBox(e) {
    console.log(this);

    setTimeout(function () {
        console.log(this);
    }, 3000);
}

function gameLoop(delta) {}