import {
    Container,
    Loader,
    Sprite,
    Text,
    TextStyle,
    Graphics,
    Ticker
} from '/js/pixi.mjs';
import {
    showIncorretInputScreen
} from "/js/screen_incorrect.js";
import {
    app
} from "/js/app.js";

let screen_gameOver = new Container();

export async function gameOver({
    callingScreen,
    roundScore
}) {
    await showIncorretInputScreen("GAME OVER!!");
    showScoreBoard({
        callingScreen,
        roundScore
    });
}

function showScoreBoard({
    callingScreen,
    roundScore
}) {
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
    text.x = app.view.width / 2;
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
    showScores(roundScore);
    // button start
    let btn = Sprite.from(textures.button_welcome);
    btn.anchor.set(0.5);
    btn.x = app.view.width / 2;
    btn.y = app.view.height / 1.1;
    btn.height = app.view.height / 10;
    btn.width = app.view.width / 3;
    btn.interactive = true;
    btn.buttonMOde = true;
    btn.on('pointertap', exitGame);
    btn.on('pointerover', () => {
        btn.height = app.view.height / 9.5;
        btn.width = app.view.width / 2.5;
    });
    btn.on('pointerout', () => {
        btn.height = app.view.height / 10;
        btn.width = app.view.width / 3;
    });
    // text - rules
    let textStart = new Text('Quit', new TextStyle({
        align: "center",
        fill: "black",
        fontSize: 26,
        fontWeight: 500,
        fontFamily: "Verdana",
    }));
    textStart.anchor.set(0.5);
    textStart.x = app.view.width / 2;
    textStart.y = app.view.height / 1.1;


    // * add to container
    screen_gameOver.addChild(bar);
    screen_gameOver.addChild(s_bar);
    screen_gameOver.addChild(btn);
    screen_gameOver.addChild(textStart);

    // screen change
    screen_gameOver.visible = true;
    callingScreen.visible = false;

    // ? Add container to app
    app.stage.addChild(screen_gameOver);
}

const style = new TextStyle({
    align: "left",
    dropShadow: true,
    dropShadowAlpha: 0.5,
    dropShadowBlur: 0,
    dropShadowColor: "black",
    dropShadowDistance: 3,
    fill: "white",
    fontSize: 26,
    fontWeight: 200,
    letterSpacing: 0,
});

function showScores(roundScore) {
    let y = app.view.height / 1.8 + app.view.height / 12;
    let ex = app.view.height / 15;

    const max = Math.max(roundScore[0], roundScore[1], roundScore[2]);
    let maxChosen = false;
    for (let index = 0; index < 3; index++) {
        let text = new Text(`Round  ${index+1}`, style);
        text.anchor.set(0.5);
        text.x = app.view.width / 4;
        text.y = y + index * ex;
        screen_gameOver.addChild(text);

        text = new Text(`${roundScore[index]}`, style);
        text.anchor.set(0.5);
        text.x = app.view.width - app.view.width / 6;
        text.y = y + index * ex;
        screen_gameOver.addChild(text);

        if (roundScore[index] == max && !maxChosen) {
            let sheet = Loader.shared.resources["./images/items.json"].spritesheet;
            let txtBackground = new Sprite.from(sheet.textures.bg_trans_black);
            txtBackground.height = app.view.height / 12;
            txtBackground.width = app.view.width - app.view.width / 8;
            txtBackground.anchor.set(0.5);
            txtBackground.x = app.view.width / 2;
            txtBackground.y = y + index * ex;
            screen_gameOver.addChild(txtBackground);

            let star = new Sprite.from(sheet.textures.star);
            
            star.height = star.width = app.view.width / 13;
            star.anchor.set(0.5);
            star.x = app.view.width * 0.9;
            star.y = y + index * ex;
            screen_gameOver.addChild(star);

            createMaxScore(roundScore[index]);

            maxChosen = true;
        }
    }
}

function createMaxScore(maxScore) {
    let graphic = new Graphics();
    graphic.x = app.view.width / 2;
    graphic.y = app.view.height / 4;
    screen_gameOver.addChild(graphic);
    const r = app.view.height / 7;
    graphic.lineStyle(3, 0xffffff);
    graphic.beginFill(0x213534);
    graphic.drawStar(0, 0, 5, r, r / 2.5);
    graphic.closePath();
    graphic.endFill();

    const ticker = new Ticker();
    ticker.add(gameloop);
    ticker.start();

    function gameloop() {
        graphic.rotation += 0.01;
    }

    let s = {
        ...style
    };
    s.fontSize = 45;
    let text = new Text(maxScore, s);
    text.anchor.set(0.5);
    text.x = app.view.width / 2;
    text.y = app.view.height / 4;
    screen_gameOver.addChild(text);
}

function exitGame() {
    screen_gameOver.visible = false;
}