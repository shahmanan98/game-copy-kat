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
import {
    gameOver
} from "/js/screen_gameOver.js";
import {
    playBoxes,
    playMute,
} from "/js/sound/sound.js";
import {
    showHelpScreen
} from "/js/screen_help.js";


export let screen_play = new Container();
// ! Variables to manage game logics
let roundCount = 1;
let roundScore = [0, 0, 0];
let totalScore = 0;
let playerInputCount = 0;
let scoreText;
let roundText;
let watchNplayText;
let playerPlayed = false;
let timeout = 0;

let questionArray = [];
nextQuestion();
// * to manage mute
let mute = false;
let button_slash_black;
let button_slash_white;
let button_help;
// sleep to manage time outs with await
const sleep = m => new Promise(r => setTimeout(r, m));


const PINK = 0,
    BLUE = 1,
    YELLOW = 2,
    GREEN = 3,
    totalBlocks = 4;
let boxColor = [];
let boxClick = [];
let boxSuccess = [];
let checkMark = [];


let bW = app.view.width / 4;



export function createScreen() {
    let sheet1 = Loader.shared.resources["./images/itemcopyKat.json"].spritesheet;
    let sheet2 = Loader.shared.resources["./images/copyKat.json"].spritesheet;
    let sheet3 = Loader.shared.resources["./images/items.json"].spritesheet;
    // ? create boxes
    createBoxes(sheet1.textures, sheet2.textures);
    // ? create title bar
    createTitle(sheet3.textures);
    app.stage.addChild(screen_play);

    // ? create screen Incorrect
    createScreen_incorrect();
}

function createBoxes(boxTextures, glowTextures) {
    // sprites

    createSprite(boxTextures.pink, PINK, app.view.width / 2 - bW / 2, app.view.height / 2 - bW / 2, glowTextures);
    createSprite(boxTextures.blue, BLUE, app.view.width / 2 - bW / 2, app.view.height / 2 + bW / 2, glowTextures);
    createSprite(boxTextures.yellow, YELLOW, app.view.width / 2 + bW / 2, app.view.height / 2 + bW / 2, glowTextures);
    createSprite(boxTextures.green, GREEN, app.view.width / 2 + bW / 2, app.view.height / 2 - bW / 2, glowTextures);

    updateBoxSizes();
    for (let index = 0; index < boxColor.length; index++) {
        screen_play.addChild(boxColor[index]);
        screen_play.addChild(boxClick[index]);
        screen_play.addChild(boxSuccess[index]);
        screen_play.addChild(checkMark[index]);
        if (index == boxColor.length - 1) {
            showPattern();
        }
    }
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

    let check = new Sprite.from(glowTextures.check);
    check.anchor.set(0.5);
    check.zindex = 0;
    check.alpha = 0;

    bSuccess.on("pointerdown", (e) => glowBoxPlayed(index));
    boxColor[index] = bColour;

    boxClick[index] = bClick;
    boxSuccess[index] = bSuccess;
    checkMark[index] = check;
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
    text.x = app.view.width / 2;
    text.y = bar.height / 1.5;
    bar.addChild(text);

    // Title Bar Button - help
    let btn_help = Sprite.from(textures.button_help);
    btn_help.anchor.set(0.5);
    btn_help.x = app.view.width / 12;
    btn_help.y = bar.height / 1.5;
    btn_help.width = btn_help.height = bar.height / 1.5;
    btn_help.interactive = true;
    btn_help.buttonMode = true;
    btn_help.on('pointertap', () => {
        playerPlayed = true;
        showHelpScreen();
    });
    button_help = btn_help;
    bar.addChild(btn_help);

    // Title Bar Button - mute
    let btn_mute = Sprite.from(textures.button_mute);
    btn_mute.anchor.set(0.5);
    btn_mute.x = app.view.width * 1.2;
    btn_mute.y = bar.height / 1.5;
    btn_mute.width = btn_mute.height = bar.height / 2;
    btn_mute.interactive = true;
    btn_mute.buttonMode = true;
    btn_mute.on('pointertap', toggleMute);
    bar.addChild(btn_mute);
    let btn_mute_slash = Sprite.from(textures.button_slash_white);
    btn_mute_slash.anchor.set(0.5);
    btn_mute_slash.x = app.view.width * 1.2;
    btn_mute_slash.y = bar.height / 1.5;
    btn_mute_slash.width = btn_mute_slash.height = bar.height / 1.5;
    btn_mute_slash.visible = false;
    button_slash_white = btn_mute_slash;
    bar.addChild(btn_mute_slash);
    btn_mute_slash = Sprite.from(textures.button_slash_black);
    btn_mute_slash.anchor.set(0.5);
    btn_mute_slash.x = app.view.width * 1.2;
    btn_mute_slash.y = bar.height / 1.5;
    btn_mute_slash.width = btn_mute_slash.height = bar.height / 2.5;
    btn_mute_slash.visible = false;
    button_slash_black = btn_mute_slash;
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

    // 
    watchNplayText = new Text("Watch", style);
    watchNplayText.anchor.x = 0.5;
    watchNplayText.anchor.y = 0.5;
    watchNplayText.x = app.view.width / 2;
    watchNplayText.y = app.view.width / 3;

    screen_play.addChild(bar);
    screen_play.addChild(s_bar);
    screen_play.addChild(watchNplayText);
}


function toggleMute() {
    mute = !mute;
    button_slash_black.visible = mute;
    button_slash_white.visible = mute;
    playMute();
}

//  * to manage player input
async function glowBoxPlayed(index) {
    playerPlayed = true;
    console.log(roundScore);
    if (index == questionArray[playerInputCount]) {
        playerInputCount++;
        if (playerInputCount == questionArray.length) {
            playerInputCount = 0;
            await glowSuccessBox(index);
            increaseTotalScore();
            nextQuestion();
            showPattern();
        } else {
            glowClickBox(index);
        }
    } else {
        if (roundCount == 3) {
            changeInteractivity(false);
            gameOver({
                callingScreen: screen_play,
                roundScore: roundScore,
            });
        } else {
            playerInputCount = 0;
            changeInteractivity(false);
            if (index == -1) {
                await showIncorretInputScreen("Timer timed Out!  Watch Pattern Again!");
            } else {
                await showIncorretInputScreen();
            }
            // changeInteractivity(true);
            await sleep(150);
            if (questionArray.length > 2) {
                // ! Assumption if question length is less than two do not increase round
                increaseRoundCount();
            }
            await showPattern();
        }
    }
    playerPlayed = false;
    timeout++;
    playerTimeOut(timeout);
}
// * make app resizble
function updateBoxSizes(e) {
    setCanvasSize();
    bW = app.view.width / 2.4;

    for (let index = 0; index < boxColor.length; index++) {
        boxColor[index].height = boxColor[index].width = bW;
        boxClick[index].height = boxClick[index].width = bW;
        boxSuccess[index].height = boxSuccess[index].width = bW;
        checkMark[index].height = bW / 6;
        checkMark[index].width = bW / 5;
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
        checkMark[index].x = x[index];

        boxColor[index].y = y[index];
        boxClick[index].y = y[index];
        boxSuccess[index].y = y[index];
        checkMark[index].y = y[index];
    }

}

function updateSizes() {
    updateBoxSizes();
    watchNplayText.x = app.view.width / 2;
    watchNplayText.y = app.view.width / 3;
}
// Async function to glow box
// ! Assumption : Player can not click on the box while its glowing
async function glowClickBox(index) {
    await changeInteractivity(false);
    boxClick[index].alpha = 0.5;
    await sleep(20);
    playBoxes(index);
    boxClick[index].alpha = 1;
    await sleep(400);
    boxClick[index].alpha = 0;
    await changeInteractivity(true);
}
// ! Assumption : Player can not click on the box while its glowing
async function glowSuccessBox(index) {
    await changeInteractivity(false);
    boxSuccess[index].alpha = 0.5;
    await sleep(20);
    playBoxes(index);
    boxSuccess[index].alpha = 1;
    checkMark[index].alpha = 1;
    await sleep(50);
    checkMark[index].height = bW / 4;
    checkMark[index].width = bW / 3;
    await sleep(580);
    boxSuccess[index].alpha = 0;
    checkMark[index].alpha = 0;
    checkMark[index].height = bW / 6;
    checkMark[index].width = bW / 5;
}


// ! logic for game starts from here
// ! logic for game starts from here

// * function to generate question
function nextQuestion() {
    questionArray = [...questionArray, getRandomColor()];
}

// * function to show pattern of questions
async function showPattern() {
    if (watchNplayText) {
        watchNplayText.text = "Watch";
    }
    for (const color of questionArray) {
        await sleep(200);
        await (glowClickBox(color));
        changeInteractivity(false);
    }
    changeInteractivity(true);
    if (watchNplayText) {
        watchNplayText.text = "Play";
    }
    playerPlayed = false;
    timeout++;
    playerTimeOut(timeout);
}

// * to manage timeout if user is not focusing on game
async function playerTimeOut(calledTimeOut) {
    let callTime = questionArray.length; // to neglect previous call for time
    await sleep(5000);
    if (!playerPlayed && boxSuccess[0].interactive == true && timeout == calledTimeOut) {
        playerPlayed = true;
        glowBoxPlayed(-1);
    }
}
// * increase total score
function increaseTotalScore() {
    totalScore++;
    roundScore[roundCount - 1]++;
    scoreText.text = `Score : ${totalScore}`;
}
// * increase Round Count
function increaseRoundCount() {
    roundCount++;
    roundText.text = `Round : ${roundCount}/3`;
}
// * util to change interactive mode of boxes
async function changeInteractivity(flag) {
    if (button_help) {
        button_help.interactive = flag;
        button_help.buttonMode = flag;
        if (flag) {
            button_help.alpha = 1;
        } else {
            button_help.alpha = 0.5;
        }
    }
    for (const box of boxSuccess) {
        box.interactive = flag;
        box.buttonmode = flag;
    }
}
// * util to generate random color
function getRandomColor() {
    return Math.floor(Math.random() * Math.floor(4));
}

// ! to change screen visblity from other screen
export async function showScreenPlay(flag) {
    screen_play.visible = flag;
    if (flag) {
        await showPattern();
    }
}
export const createScreenPlay = createScreen;
export const updateScreenPlay = updateSizes;