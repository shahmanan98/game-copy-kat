import { app } from '/js/app.js';
import {screen_play, updateScreenPlay } from '/js/screen_play.js';

// * make canvas resizable
window.addEventListener('resize', updateScreenPlay);

app.stage.addChild(screen_play);

