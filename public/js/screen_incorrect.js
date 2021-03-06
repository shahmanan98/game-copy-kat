import {
    Container,
    Text,
    TextStyle,
    Loader,
    Sprite
} from "/js/pixi.mjs";
import {
    app
} from "/js/app.js";
import { playIncorrect } from "/js/sound/sound.js";

export const screen_incorrect = new Container();
let textSprite;

export function createScreen_incorrect() {
    let sheet = Loader.shared.resources["./images/items.json"].spritesheet;

    let background = new Sprite.from(sheet.textures.bg_trans_blue);
    background.height = app.view.height;
    background.width = app.view.width;
    background.anchor.set(0);
    background.x = 0;
    background.y = app.view.height/11;

    let txtBackground = new Sprite.from(sheet.textures.bg_trans_black);
    txtBackground.height = app.view.height / 6;
    txtBackground.width = app.view.width;
    txtBackground.anchor.set(0.5);
    txtBackground.x = app.view.width / 2;
    txtBackground.y = app.view.height / 2;

    const text = new Text('Incorrect Input Watch pattern Again!', new TextStyle({
        align: "center",
        fill: "white",
        fontSize: 30,
        fontWeight: 500,
        fontFamily: "Verdana",
        wordWrap: true,
        wordWrapWidth: txtBackground.width / 1.5,
        fontFamily: "Verdana",
    }));
    text.anchor.set(0.5);
    text.x = app.view.width / 2;
    text.y = app.view.height / 2;
    textSprite = text;

    screen_incorrect.addChild(background);
    screen_incorrect.addChild(txtBackground);
    screen_incorrect.addChild(text);

    screen_incorrect.visible = false;
    app.stage.addChild(screen_incorrect);
}

const sleep = m => new Promise(r => setTimeout(r, m));

export async function showIncorretInputScreen(txt = "Incorrect Input Watch pattern Again!") {
    playIncorrect();
    textSprite.text = txt;
    screen_incorrect.visible = true;
    await sleep(2000);
    screen_incorrect.visible = false;
}