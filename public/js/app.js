import {Application} from '/js/pixi.mjs';

export const app = new Application({
    width: document.getElementById("gameDiv").offsetWidth,
    height: window.innerHeight,
    backgroundColor: 0x120952
});
document.getElementById("gameDiv").appendChild(app.view);

// * make ratio for the canvas
export function setCanvasSize() {
    const ratio = 1.3345;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let rw = h / ratio;
    let rh = w * ratio;

    if (true) {
        app.view.height = h;
        app.view.width = Math.min(rw,w);
    }
}
