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

export const screen_incorrect = new Container();

export function createScreen_incorrect() {
    let sheet = Loader.shared.resources["./images/items.json"].spritesheet;

    let background = new Sprite.from(sheet.textures.bg_trans_blue);
    background.height = app.view.height;
    background.width = app.view.height;
    background.anchor.set(0);
    background.x = background.y = 0;

    let txtBackground = new Sprite.from(sheet.textures.bg_trans_black);
    txtBackground.height = app.view.height / 6;
    txtBackground.width = app.view.height;
    txtBackground.anchor.set(0.5);
    txtBackground.x = app.view.width / 2;
        txtBackground.y = app.view.height / 2;

    const style = new TextStyle({
        fill: "white",
        textBaseline: "bottom"
    });
    const text = new Text('Incorrect Input Watch pattern Again!', style);
    text.anchor.set(0.5);
    text.x = app.view.width / 2;
    text.y = app.view.height / 2;

    screen_incorrect.addChild(background);
    screen_incorrect.addChild(txtBackground);
    screen_incorrect.addChild(text);

    screen_incorrect.visible = false;
}

const sleep = m => new Promise(r => setTimeout(r, m));

export async function showIncorretInputScreen() {
    screen_incorrect.visible = true;
    await sleep(2500);
    screen_incorrect.visible = false;
}