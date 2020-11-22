let mute = false;
let boxes = [];
boxes[0] = PIXI.sound.add('music', '/audio/Pink.mp3');
boxes[1] = PIXI.sound.add('music', '/audio/Blue.mp3');
boxes[2] = PIXI.sound.add('music', '/audio/Green.mp3');
boxes[3] = PIXI.sound.add('music', '/audio/Yellow.mp3');
let clickHelp = PIXI.sound.add('music', '/audio/buttonClick.mp3');
let clickButton = PIXI.sound.add('music', '/audio/buttonClick.mp3');
let muteSound = PIXI.sound.add('music', '/audio/muteButton.mp3');
let incorrect = PIXI.sound.add('music', '/audio/Wrong.mp3');

export function playIncorrect() {
    if (!mute) {
        incorrect.play();
    }
}

export function playClick() {
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