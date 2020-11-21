import { Container, Loader, Sprite, Text, TextStyle } from '/js/pixi.mjs';
import { showIncorretInputScreen } from "/js/screen_incorrect.js";
import { app } from "/js/app.js";

let screen_gameOver = new Container();

export async function gameOver({ callingScreen, roundScore }) {
    await showIncorretInputScreen("GAME OVER!!");
    showScore({ callingScreen, roundScore });
}

function showScore({ callingScreen, roundScore }) {
    let textures = Loader.shared.resources["./images/items.json"].spritesheet.textures;
    // Title Bar
    let bar = Sprite.from(textures.bg_titleBar);
    bar.anchor.set(0);
    bar.x = 0;
    bar.y = 0;
    bar.height = app.view.height / 11;
    bar.width = app.view.width;
    // * Title Bar Text
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
    text.x = bar.width / 2;
    text.y = bar.height / 1.5;
    bar.addChild(text);

    // Highest Score
    // ScoreCard title
    let s_bar = Sprite.from(textures.bg_scoreBar);
    s_bar.anchor.set(0);
    s_bar.x = 0;
    s_bar.y = app.view.height / 2.3;
    s_bar.height = app.view.height / 10;
    s_bar.width = app.view.width;
    // * scorecard title text
    text = new Text('Scorecard', style);
    text.anchor.x = 0;
    text.anchor.y = 0.5;
    text.x = s_bar.width / 2;
    text.y = s_bar.height / 1.5;
    s_bar.addChild(text);

    // Scores
    // button continue

    // add to container
    screen_gameOver.addChild(bar);
    screen_gameOver.addChild(s_bar);
    // screen change
    screen_gameOver.visible = true;
    callingScreen.visible = false;

    // ? Add container to app
    app.stage.addChild(screen_gameOver);
}