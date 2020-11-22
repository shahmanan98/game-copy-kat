import {
    Loader
} from '/js/pixi.mjs';
import {
    createScreenWelcome
} from "/js/screen_welcome.js";
import {
    updateScreenPlay,
} from '/js/screen_play.js';


window.onload = () => {
    // * make canvas resizable
    window.addEventListener('resize', updateScreenPlay);

    // ? load sprites from single image with spritesheet
    Loader.shared.add("./images/itemcopyKat.json")
        .add("./images/copyKat.json")
        .add("./images/items.json")
        .add("/audio/Blue.mp3")
        .add("/audio/Green.mp3")
        .add("/audio/Pink.mp3")
        .add("/audio/Yellow.mp3")
        .add("/audio/buttonClick.mp3")
        .add("/audio/homeButton.mp3")
        .load(createScreenWelcome);
}