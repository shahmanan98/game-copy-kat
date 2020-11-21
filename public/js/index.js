import {
    app
} from '/js/app.js';
import {
    screen_play,
    updateScreenPlay
} from '/js/screen_play.js';
import {
    screen_incorrect
} from '/js/screen_incorrect.js';

window.onload = () => {
    // * make canvas resizable
    window.addEventListener('resize', updateScreenPlay);

    app.stage.addChild(screen_play);
    app.stage.addChild(screen_incorrect);
}