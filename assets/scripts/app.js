import { canvas, ctx } from "./init.js";
import {
  animalNavbar,
  createInput,
  form,
  handleKeys,
  handleMouse,
  hitBoxes,
  personNavbar,
  personForm,
  personTable,
  table,
  exportNavId,
  animalForm,
  animalTable,
} from "./newapplication.js";

//INIT of APP
canvas.addEventListener("mouseup", handleMouse);
window.addEventListener("keyup", handleKeys);

const personFormView = [personForm, personTable, personNavbar, animalNavbar];

const animalFormView = [animalForm, animalTable, personNavbar, animalNavbar];

let view = personFormView;

function updateUI() {
  window.setTimeout(updateUI, 20);
  hitBoxes.length = 0;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  //TODO: Loop through Navbar list of buttons, navbar change views, 2 differnet views
  if (exportNavId === 1) {
    view = personFormView;
  } else if (exportNavId === 2) {
    view = animalFormView;
  }
  view.forEach((el) => el.draw());
}

updateUI();

// const test = {x:300, y:0, w:0, h:0}
// let {x, y} = test
// console.log(x)
