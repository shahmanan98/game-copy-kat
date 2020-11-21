let incorrect = PIXI.sound.add('music', '/audio/Wrong.mp3');

export function playIncorrect() {
    incorrect.play();
}

let boxes = [];
boxes[0] = PIXI.sound.add('music', '/audio/Pink.mp3');
boxes[1] = PIXI.sound.add('music', '/audio/Blue.mp3');
boxes[2] = PIXI.sound.add('music', '/audio/Green.mp3');
boxes[3] = PIXI.sound.add('music', '/audio/Yellow.mp3');
export function playBoxes(index) {
    boxes[index].play();
}