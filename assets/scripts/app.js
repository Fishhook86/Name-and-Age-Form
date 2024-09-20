import { canvas, ctx } from "./init.js";
import { createInput, form, handleKeys, handleMouse, hitBoxes, personForm, personTable, table } from "./newapplication.js";

//INIT of APP
canvas.addEventListener("mouseup", handleMouse);
window.addEventListener("keyup", handleKeys);

const view1 = [
    personForm, 
    personTable
]

const view2 = [
    personForm, 
    personTable
]

let view = view1

function updateUI() {
    window.setTimeout(updateUI, 20)
    hitBoxes.length = 0;
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    //TODO: Loop through Navbar list of buttons, navbar change views, 2 differnet views
    view.forEach(el => el.draw())
}

updateUI()


// const test = {x:300, y:0, w:0, h:0}
// let {x, y} = test
// console.log(x)