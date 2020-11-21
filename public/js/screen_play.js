// > create container to hold the screen with blocks
import {
    Container,
    Loader,
    Sprite,
    Text,
    TextStyle
} from '/js/pixi.mjs';
import {
    app,
    setCanvasSize
} from "/js/app.js";
import {
    createScreen_incorrect,
    showIncorretInputScreen
} from "/js/screen_incorrect.js";

export let screen_play = new Container();

const PINK = 0,
    BLUE = 1,
    YELLOW = 2,
    GREEN = 3,
    totalBlocks = 4;
let boxColor = [];
let boxClick = [];
let boxSuccess = [];


let bW = app.view.width / 4;

// ? load sprites from single image with spritesheet
Loader.shared.add("./images/itemcopyKat.json").add("./images/copyKat.json").add("./images/items.json").load(createScreen);

function createScreen() {
    let sheet1 = Loader.shared.resources["./images/itemcopyKat.json"].spritesheet;
    let sheet2 = Loader.shared.resources["./images/copyKat.json"].spritesheet;
    let sheet3 = Loader.shared.resources["./images/items.json"].spritesheet;
    // ? create boxes
    createBoxes(sheet1.textures, sheet2.textures);
    // ? create title bar
    createTitle(sheet3.textures);

    // ? create svreen Incorrect
    createScreen_incorrect();

}

function createBoxes(boxTextures, glowTextures) {
    // sprites

    createSprite(boxTextures.pink, PINK, app.view.width / 2 - bW / 2, app.view.height / 2 - bW / 2, glowTextures);
    createSprite(boxTextures.blue, BLUE, app.view.width / 2 - bW / 2, app.view.height / 2 + bW / 2, glowTextures);
    createSprite(boxTextures.yellow, YELLOW, app.view.width / 2 + bW / 2, app.view.height / 2 + bW / 2, glowTextures);
    createSprite(boxTextures.green, GREEN, app.view.width / 2 + bW / 2, app.view.height / 2 - bW / 2, glowTextures);

    updateSizes();
    for (let index = 0; index < boxColor.length; index++) {
        screen_play.addChild(boxColor[index]);
        screen_play.addChild(boxClick[index]);
        screen_play.addChild(boxSuccess[index]);
    }
    showPattern();
}

function createSprite(imgUrl, index, x, y, glowTextures) {

    // Create colores boxes
    let bColour = new Sprite.from(imgUrl);
    bColour.anchor.set(0.5);
    bColour.tint = 0xeeeeee;
    bColour.zindex = 0;

    // Create sprites for interactions
    let bClick = new Sprite.from(glowTextures.clickBox);
    bClick.anchor.set(0.5);
    bClick.zindex = 0;
    bClick.alpha = 0;


    let bSuccess = new Sprite.from(glowTextures.successBox);
    bSuccess.anchor.set(0.5);
    bSuccess.zindex = 1;
    bSuccess.alpha = 0;
    bSuccess.interactive = true;
    bSuccess.buttonmode = true;

    bSuccess.on("pointerdown", (e) => glowBoxPlayed(index));
    boxColor[index] = bColour;

    boxClick[index] = bClick;
    boxSuccess[index] = bSuccess;
}

function createTitle(textures) {
    // title Bar
    let bar = Sprite.from(textures.bg_titleBar);
    bar.anchor.set(0);
    bar.x = 0;
    bar.y = 0;
    bar.height = app.view.height / 11;
    bar.width = app.view.width;

    // Score Bar
    let s_bar = Sprite.from(textures.bg_scoreBar);
    s_bar.anchor.set(0);
    s_bar.x = 0;
    s_bar.y = app.view.height / 11;
    s_bar.height = app.view.height / 10;
    s_bar.width = app.view.width;

    // Title Bar Text
    const style = new TextStyle({
        align: "center",
        dropShadow: true,
        dropShadowAlpha: 0.5,
        dropShadowBlur: 2,
        dropShadowColor: "black",
        dropShadowDistance: 3,
        fill: "white",
        fontSize: 38,
        fontWeight: 200,
        letterSpacing: 1,
        lineJoin: "round",
        stroke: "white"
    });
    let text = new Text('CopyKat', style);
    text.anchor.x = 0;
    text.anchor.y = 0.5;
    text.x = bar.width / 2;
    text.y = bar.height / 1.5;
    bar.addChild(text);

    // Title Bar Button - help
    let btn_help = Sprite.from(textures.button_help);
    btn_help.anchor.set(0.5);
    btn_help.x = bar.width / 12;
    btn_help.y = bar.height / 1.5;
    btn_help.width = btn_help.height = bar.height / 1.5;
    bar.addChild(btn_help);

    // Title Bar Button - mute
    let btn_mute = Sprite.from(textures.button_mute);
    btn_mute.anchor.set(0.5);
    btn_mute.x = bar.width * 1.2;
    btn_mute.y = bar.height / 1.5;
    btn_mute.width = btn_mute.height = bar.height / 2;
    bar.addChild(btn_mute);
    let btn_mute_slash = Sprite.from(textures.button_slash_white);
    btn_mute_slash.anchor.set(0.5);
    btn_mute_slash.x = bar.width * 1.2;
    btn_mute_slash.y = bar.height / 1.5;
    btn_mute_slash.width = btn_mute_slash.height = bar.height / 1.5;
    btn_mute_slash.visible = false;
    bar.addChild(btn_mute_slash);
    btn_mute_slash = Sprite.from(textures.button_slash_black);
    btn_mute_slash.anchor.set(0.5);
    btn_mute_slash.x = bar.width * 1.2;
    btn_mute_slash.y = bar.height / 1.5;
    btn_mute_slash.width = btn_mute_slash.height = bar.height / 2.5;
    btn_mute_slash.visible = false;
    bar.addChild(btn_mute_slash);

    // Score Bar - Score Text
    text = new Text(`Score : ${totalScore}`, style);
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.x = s_bar.width;
    text.y = s_bar.height / 1.5;
    scoreText = text;
    s_bar.addChild(text);
    // Score Bar - Round Text
    text = new Text(`Round : ${roundCount}/3`, style);
    text.anchor.x = 0;
    text.anchor.y = 0.5;
    text.x = s_bar.width / 15;
    text.y = s_bar.height / 1.5;
    roundText = text;
    s_bar.addChild(text);

    screen_play.addChild(bar);
    screen_play.addChild(s_bar);
}
// * make app resizble
function updateSizes(e) {
    setCanvasSize();
    bW = app.view.width / 2.4;

    for (let index = 0; index < boxColor.length; index++) {
        boxColor[index].height = boxColor[index].width = bW;
        boxClick[index].height = boxClick[index].width = bW;
        boxSuccess[index].height = boxSuccess[index].width = bW;
    }
    let x = [];
    let y = [];
    x[PINK] = x[BLUE] = app.view.width / 2 - bW / 1.9;
    x[YELLOW] = x[GREEN] = app.view.width / 2 + bW / 1.9;
    y[YELLOW] = y[BLUE] = app.view.height / 2 + bW / 2 + bW / 2.6;
    y[PINK] = y[GREEN] = app.view.height / 2 - bW / 2 + bW / 3;

    for (let index = 0; index < boxColor.length; index++) {
        boxColor[index].x = x[index];
        boxClick[index].x = x[index];
        boxSuccess[index].x = x[index];

        boxColor[index].y = y[index];
        boxClick[index].y = y[index];
        boxSuccess[index].y = y[index];
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


// ! logic for game starts from here
// ! logic for game starts from here
// ! logic for game starts from here

let roundCount = 1;
let roundScore = [0, 0, 0];
let totalScore = 0;
let playerInputCount = 0;
let scoreText;
let roundText;

let questionArray = [];
nextQuestion();

// * to manage player input
function glowBoxPlayed(index) {
    if (playerInputCount < questionArray.length - 1) {
        if (index == questionArray[playerInputCount]) {
            glowClickBox(index);
            playerInputCount++;
        } else {
            // ? THROW ERROR FOR WRONG INPUT
            playerInputCount = 0;
            const call = async () => {
                await showIncorretInputScreen();
                await sleep(150);
                showPattern();
            };
            call();
            increaseRoundCount();
        }
    } else {
        if (index == questionArray[playerInputCount]) {
            playerInputCount = 0;
            const run = async () => {
                await glowSuccessBox(index);
                nextQuestion();
            }
            run();
            increaseTotalScore();
        } else {
            // ? THROW ERROR FOR WRONG INPUT
            playerInputCount = 0;
            const call = async () => {
                await showIncorretInputScreen();
                await sleep(150);
                showPattern();
            };
            call();
            increaseRoundCount();
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

// * increase total score
function increaseTotalScore() {
    totalScore++;
    roundScore[roundCount]++;
    scoreText.text = `Score : ${totalScore}`;
}
// * increase Round Count
function increaseRoundCount() {
    roundCount++;
    roundText.text = `Round : ${roundCount}/3`;
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

export const createScreenPlay = createScreen;
export const updateScreenPlay = updateSizes;