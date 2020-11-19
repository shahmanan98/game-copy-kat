const app = new PIXI.Application({
    width: document.getElementById("gameDiv").offsetWidth,
    height: window.innerHeight,
    backgroundColor : 0x3b4889
});
console.log(document.getElementById("gameDiv").offsetWidth);

document.getElementById("gameDiv").appendChild(app.view);

const PINK = 0,
    BLUE = 1,
    YELLOW = 2,
    GREEN = 3,
    totalBlocks = 4;
let player;
let boxColor = [];
let boxClick = [];
let boxSuccess = [];

const bW = app.view.width / 4;

// ? load sprites from single image with spritesheet
PIXI.Loader.shared.add("./images/itemcopyKat.json").add("./images/copyKat.json").load(doneLoading);

function doneLoading() {
    let sheet1 = PIXI.Loader.shared.resources["./images/itemcopyKat.json"].spritesheet;
    let sheet2 = PIXI.Loader.shared.resources["./images/copyKat.json"].spritesheet;
    createBoxes(sheet1.textures,sheet2.textures);

    app.ticker.add(gameLoop);
}

function createBoxes(boxTextures,glowTextures) {
    // sprites

    createSprite(boxTextures.pink, PINK, app.view.width / 2 - bW/2, app.view.height / 2 - bW/2, glowTextures);
    createSprite(boxTextures.blue, BLUE, app.view.width / 2 - bW/2, app.view.height / 2 + bW/2, glowTextures);
    createSprite(boxTextures.yellow, YELLOW, app.view.width / 2 + bW/2, app.view.height / 2 + bW/2, glowTextures);
    createSprite(boxTextures.green, GREEN, app.view.width / 2 + bW/2, app.view.height / 2 - bW/2, glowTextures);

    for (let index = 0; index < boxColor.length; index++) {
        app.stage.addChild(boxColor[index]);
        app.stage.addChild(boxClick[index]);
        app.stage.addChild(boxSuccess[index]);

    }

    showPattern();
}

function createSprite(imgUrl, index, x, y, glowTextures) {
    x -= bW / 2;
    y -= bW / 2;
    
    // Create colores boxes
    let bColour = new PIXI.Sprite.from(imgUrl);
    bColour.anchor.set(0);
    bColour.x = x;
    bColour.y = y;
    bColour.height = bColour.width = bW;
    bColour._zindex = 0;
    bColour.interactive = true;
    bColour.buttonmode = true;

    // Create sprites for interactions
    let bClick = new PIXI.Sprite.from(glowTextures.clickBox);
    bClick.anchor.set(0);
    bClick.x = x-1;
    bClick.y = y-1;
    bClick.height = bClick.width = bW-1;
    bClick._zindex = 1;
    bClick.alpha = 0;
    
    let bSuccess = new PIXI.Sprite.from(glowTextures.successBox);
    bSuccess.anchor.set(0);
    bSuccess.x = x-3;
    bSuccess.y = y-3;
    bSuccess.height = bSuccess.width = bW;
    bSuccess._zindex = 2;
    bSuccess.alpha = 0;

    bColour.on("pointerdown", (e) => glowBox(index));
    boxColor[index] = bColour;

    boxClick[index] = bClick;
    boxSuccess[index] = bSuccess;
}

const sleep = m => new Promise(r => setTimeout(r, m));

// Async function to glow box
async function glowBox(index) {
    boxClick[index].alpha = 0.45;
    await sleep(400);
    boxClick[index].alpha = 0;
}

function gameLoop(delta) {

}



// ! logic for game starts from here

let roundCount;
let roundScore;
let trueAttempts;

let questionArray = [0,1,2,3];

// * function to generate question
function appendQuestio(params) {
    questionArray = [...questionArray, getRandomColor()];
    showPattern();
}

// * function to show pattern of questions
async function showPattern() {
    changeInteractivity(false);
    for (const color of questionArray) {
        await sleep(200);
        await (glowBox(color));
    }
    changeInteractivity(true);
}

// * util to change interactive mode of boxes
function changeInteractivity(flag) {
    for (const box of boxColor) {
        box.interactive = flag;
    }
}
// * util to generate random color
function getRandomColor() {
    return Math.floor(Math.random() * Math.floor(totalBlocks));
}