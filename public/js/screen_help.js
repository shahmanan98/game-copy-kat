import {
    Container,
    Text,
    TextStyle,
    Loader,
    Sprite
} from "/js/pixi.mjs";
import {
    app, setCanvasSize
} from "/js/app.js";
import {
    createScreenPlay,
    screen_play
} from "/js/screen_play.js";
import { playClick } from "./sound/sound.js";

export const screen_help = new Container();

export function createScreenHelp() {
    setCanvasSize();
    screen_play.visible = false;

    let textures = Loader.shared.resources["./images/items.json"].spritesheet.textures;

    // Title Bar
    let bar = Sprite.from(textures.bg_titleBar);
    bar.anchor.set(0);
    bar.x = 0;
    bar.y = 0;
    bar.height = app.view.height / 11;
    bar.width = app.view.width;
    // * Title Bar Text
    let text = new Text('CopyKat', new TextStyle({
        fill: "white",
        fontSize: 38,
        fontWeight: 200,
        fontFamily: "Verdana",
    }));
    text.anchor.x = 0;
    text.anchor.y = 0.5;
    text.x = app.view.width / 2;
    text.y = bar.height / 1.2;
    bar.addChild(text);

    // notice - how to play
    let s_bar = Sprite.from(textures.bg_help_how);
    s_bar.anchor.set(0.5);
    s_bar.x = app.view.width / 2;
    s_bar.y = app.view.height / 4;
    s_bar.height = app.view.height / 8;
    s_bar.width = app.view.width / 1.2;
    // text - how to play
    let textHow = new Text('How To Play', new TextStyle({
        fill: "white",
        fontSize: 35,
        fontWeight: 200,
        fontFamily: "Verdana",
    }));
    textHow.anchor.set(0.5);
    textHow.x = app.view.width / 2;
    textHow.y = app.view.height / 4;

    // notice - rules
    let r_bar = Sprite.from(textures.bg_help_how);
    r_bar.anchor.set(0.5);
    r_bar.x = app.view.width / 2;
    r_bar.y = app.view.height / 2;
    r_bar.height = app.view.height / 4;
    r_bar.width = app.view.width / 1.2;
    // text - how to play
    let textRule = new Text('Remember and repeat the sequence of color.', new TextStyle({
        align : "center",
        fill: "white",
        fontSize: 30,
        fontWeight: 300,
        wordWrap: true,
        wordWrapWidth: r_bar.width / 1.5,
        fontFamily: "Verdana",
    }));
    textRule.anchor.set(0.5);
    textRule.x = app.view.width / 2;
    textRule.y = app.view.height / 2;

    
    // button start
    let btn = Sprite.from(textures.button_welcome);
    btn.anchor.set(0.5);
    btn.x = app.view.width / 2;
    btn.y = app.view.height / 1.2;
    btn.height = app.view.height / 10;
    btn.width = app.view.width / 3;
    btn.interactive = true;
    btn.buttonMOde = true;
    btn.on('pointertap', () => { showHelpScreen(false) });
    // text - continue
    let textStart = new Text('Continue', new TextStyle({
        align : "center",
        fill: "black",
        fontSize: 26,
        fontWeight: 300,
        fontFamily: "Verdana",
    }));
    textStart.anchor.set(0.5);
    textStart.x = app.view.width / 2;
    textStart.y = app.view.height / 1.2;


    screen_help.addChild(bar);
    screen_help.addChild(s_bar);
    screen_help.addChild(textHow);
    screen_help.addChild(r_bar);
    screen_help.addChild(textRule);
    screen_help.addChild(btn);
    screen_help.addChild(textStart);

    app.stage.addChild(screen_help);
}

export function showHelpScreen(flag = true) {
    playClick();
    createScreenHelp();
    screen_help.visible = flag;
    screen_play.visible = !flag;
    if (!flag) {
        createScreenPlay();
    }
}