let mute = false;

export function playIncorrect() {
    let incorrect = PIXI.sound.add('music', '/audio/Wrong.mp3');
    if (!mute) {
        incorrect.play();
    }
}

export function playClick() {
    let click = PIXI.sound.add('music', '/audio/buttonClick.mp3');
    if (!mute) {
        click.play();
    }
}

export function playMute() {
    mute = !mute;
    let click = PIXI.sound.add('music', '/audio/muteButton.mp3');
    if (!mute) {
        click.play();
    }
}

let boxes = [];
boxes[0] = PIXI.sound.add('music', '/audio/Pink.mp3');
boxes[1] = PIXI.sound.add('music', '/audio/Blue.mp3');
boxes[2] = PIXI.sound.add('music', '/audio/Green.mp3');
boxes[3] = PIXI.sound.add('music', '/audio/Yellow.mp3');
export function playBoxes(index) {
    if (!mute) {
        boxes[index].play();
    }
}