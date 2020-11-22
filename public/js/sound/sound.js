let mute = false;
let boxes = [];

let clickHelp;
let clickButton;
let muteSound;
let incorrect;

function initiateAll() {
    mute = false;
    boxes[0] = PIXI.sound.add('music', '/audio/Pink.mp3');
    boxes[1] = PIXI.sound.add('music', '/audio/Blue.mp3');
    boxes[2] = PIXI.sound.add('music', '/audio/Green.mp3');
    boxes[3] = PIXI.sound.add('music', '/audio/Yellow.mp3');
    clickHelp = PIXI.sound.add('music', '/audio/homeButton.mp3');
    clickButton = PIXI.sound.add('music', '/audio/buttonClick.mp3');
    muteSound = PIXI.sound.add('music', '/audio/muteButton.mp3');
    incorrect = PIXI.sound.add('music', '/audio/Wrong.mp3');
}
export function playIncorrect() {
    if (!mute) {
        incorrect.play();
    }
}

export function playClick() {
    initiateAll();
    if (!mute) {
        clickButton.play();
    }
}
export function playHelp() {
    if (!mute) {
        clickHelp.play();
    }
}

export function playMute() {
    mute = !mute;
    if (!mute) {
        muteSound.play();
    }
}

export function playBoxes(index) {
    if (!mute) {
        boxes[index].play();
    }
}