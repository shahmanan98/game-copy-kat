import * as PIXI from '/js/pixi.mjs';

const app = new PIXI.Application({
    width: document.getElementById("gameDiv").offsetWidth,
    height: window.innerHeight,
    backgroundColor: 0x120952
});
document.getElementById("gameDiv").appendChild(app.view);

// * make canvas resizable
window.addEventListener('resize', updateSizes);

const PINK = 0,
    BLUE = 1,
    YELLOW = 2,
    GREEN = 3,
    totalBlocks = 4;
let player;
let boxColor = [];
let boxClick = [];
let boxSuccess = [];

let bW = app.view.width / 4;

// ? load sprites from single image with spritesheet
PIXI.Loader.shared.add("./images/itemcopyKat.json").add("./images/copyKat.json").load(doneLoading);

function doneLoading() {
    let sheet1 = PIXI.Loader.shared.resources["./images/itemcopyKat.json"].spritesheet;
    let sheet2 = PIXI.Loader.shared.resources["./images/copyKat.json"].spritesheet;
    createBoxes(sheet1.textures, sheet2.textures);

    app.ticker.add(gameLoop);
}

function createBoxes(boxTextures, glowTextures) {
    // sprites

    createSprite(boxTextures.pink, PINK, app.view.width / 2 - bW / 2, app.view.height / 2 - bW / 2, glowTextures);
    createSprite(boxTextures.blue, BLUE, app.view.width / 2 - bW / 2, app.view.height / 2 + bW / 2, glowTextures);
    createSprite(boxTextures.yellow, YELLOW, app.view.width / 2 + bW / 2, app.view.height / 2 + bW / 2, glowTextures);
    createSprite(boxTextures.green, GREEN, app.view.width / 2 + bW / 2, app.view.height / 2 - bW / 2, glowTextures);

    updateSizes();
    for (let index = 0; index < boxColor.length; index++) {
        app.stage.addChild(boxColor[index]);
        app.stage.addChild(boxClick[index]);
        app.stage.addChild(boxSuccess[index]);
    }
    showPattern();
}

function createSprite(imgUrl, index, x, y, glowTextures) {

    // Create colores boxes
    let bColour = new PIXI.Sprite.from(imgUrl);
    bColour.anchor.set(0.5);
    // bColour.x = x;
    // bColour.y = y;
    // bColour.height = bColour.width = bW;
    bColour._zindex = 2;

    // Create sprites for interactions
    let bClick = new PIXI.Sprite.from(glowTextures.clickBox);
    bClick.anchor.set(0.5);
    // bClick.x = x - 1;
    // bClick.y = y - 1;
    // bClick.height = bClick.width = bW - 1;
    bClick._zindex = 1;
    bClick.alpha = 0;


    let bSuccess = new PIXI.Sprite.from(glowTextures.successBox);
    bSuccess.anchor.set(0.5);
    // bSuccess.x = x - 3;
    // bSuccess.y = y - 3;
    // bSuccess.height = bSuccess.width = bW;
    bSuccess._zindex = 0;
    bSuccess.alpha = 0;
    bSuccess.interactive = true;
    bSuccess.buttonmode = true;

    // bColour.on("pointerdown", (e) => glowBoxPlayed(index));
    // bClick.on("pointerdown", (e) => glowBoxPlayed(index));
    bSuccess.on("pointerdown", (e) => glowBoxPlayed(index));
    boxColor[index] = bColour;

    boxClick[index] = bClick;
    boxSuccess[index] = bSuccess;
}
// * make app resizble
function updateSizes(e) {
    // app.view.height = window.innerHeight;
    // app.view.width = window.innerWidth / 2;
    setCanvasSize();
    bW = app.view.width / 2.4;

    for (let index = 0; index < boxColor.length; index++) {
        boxColor[index].height = boxColor[index].width = bW;
        boxClick[index].height = boxClick[index].width = bW;
        boxSuccess[index].height = boxSuccess[index].width = bW;
    }
    let x = [];
    let y = [];
    x[PINK] = x[BLUE] = app.view.width / 2 - bW / 1.9 ;
    x[YELLOW] = x[GREEN] = app.view.width / 2 + bW / 1.9;
    y[YELLOW] = y[BLUE] = app.view.height / 2 + bW / 2 + bW/2.6;
    y[PINK] = y[GREEN] = app.view.height / 2 - bW / 2 + bW/3;

    for (let index = 0; index < boxColor.length; index++) {
        boxColor[index].x = x[index];
        boxClick[index].x = x[index];
        boxSuccess[index].x = x[index];
        
        boxColor[index].y = y[index];
        boxClick[index].y = y[index];
        boxSuccess[index].y = y[index];
    }
}

// * make ratio for the canvas
function setCanvasSize() {
    const ratio = 1.3345;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rw = h / ratio;
    let rh = w * ratio;

    if (true) {
        app.view.height = h;
        app.view.width = rw;
    }
    else{
        app.view.height = rh;
        app.view.width = w;
    }
}

const sleep = m => new Promise(r => setTimeout(r, m));

// Async function to glow box
async function glowClickBox(index) {
    boxClick[index].alpha = 0.45;
    await sleep(400);
    boxClick[index].alpha = 0;
}
async function glowSuccessBox(index) {
    boxSuccess[index].alpha = 0.45;
    await sleep(400);
    boxSuccess[index].alpha = 0;
}

function gameLoop(delta) {}


// ! logic for game starts from here

let roundCount = 0;
let roundScore = [0, 0, 0];
let totalScore = 0;
let playerInputCount = 0;

let questionArray = [];
nextQuestion();

// * to manage player input
function glowBoxPlayed(index) {
    if (playerInputCount < questionArray.length - 1) {
        if (index == questionArray[playerInputCount]) {
            glowClickBox(index);
            playerInputCount++;
        } else {
            // ! THROW ERROR FOR WRONG INPUT
            playerInputCount = 0;
            window.prompt("WRONG INOUT see again");
            console.log("WRONG INOUT");
        }
    } else {
        if (index == questionArray[playerInputCount]) {
            playerInputCount = 0;
            roundScore[roundCount]++;
            const run = async () => {
                await glowSuccessBox(index);
                nextQuestion();
            }
            run();
        } else {
            // ! THROW ERROR FOR WRONG INPUT
            console.log("WRONG INOUT");

        }
    }
}
// * function to generate question
async function nextQuestion() {
    await sleep(400); // ! check the interacaivity here 
    questionArray = [...questionArray, getRandomColor()];
    showPattern();
}

// * function to show pattern of questions
async function showPattern() {
    changeInteractivity(false);
    for (const color of questionArray) {
        await sleep(200);
        await (glowClickBox(color));
    }
    changeInteractivity(true);
}

// * util to change interactive mode of boxes
function changeInteractivity(flag) {
    for (const box of boxSuccess) {
        box.interactive = flag;
        box.buttonmode = flag;
    }
}
// * util to generate random color
function getRandomColor() {
    return Math.floor(Math.random() * Math.floor(totalBlocks));
}