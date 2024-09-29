let columns = ["Name", "Age"];

let data = [];

export let hitBoxes = new Array();

let selected = null;
let xPos = 0;
let yPos = 0;

import { submit } from "./handleSubmit.js";
import { ctx } from "./init.js";

let counter = 1;
export const createInput = (name, rect) => {
  return {
    label: name,
    value: "",
    rect: rect,
  };
};

function coordinate(x, y) {
  this.x = x;
  this.y = y;
}

const drawInput = (input) => {
  ctx.strokeRect(input.rect.x + 25, input.rect.y, input.rect.w, input.rect.h);
  ctx.font = "24px Unknown, serif";
  ctx.fillText(input.value, input.rect.x + 30, input.rect.y + 20);
  addHit(
    input.rect.x + 25,
    input.rect.y,
    input.rect.w,
    input.rect.h,
    input,
    selectInput
  );
};

const handleSubmit = (test) => {
  data.push(test);
  formReset();
};

export const handleMouse = (event) => {
  hitBoxes.forEach((hitbox) => {
    if (
      event.x >= hitbox.x &&
      event.x <= hitbox.x + hitbox.w &&
      event.y >= hitbox.y &&
      event.y <= hitbox.y + hitbox.h
    ) {
      hitbox.call(hitbox.obj);
      return;
    }
  });
};

function addHit(x, y, w, h, obj, call) {
  hitBoxes.push({ x: x, y: y, w: w, h: h, obj: obj, call: call });
  // <3
}

const handleReset = (event) => {
  if (event.x >= 110 && event.x <= 210 && event.y >= 450 && event.y <= 485) {
    data = [];
    form.name.value = "";
    form.age.value = "";
  }
};

const selectInput = (obj) => {
  selected = obj;
};

export const handleKeys = (event) => {
  let kc = event.keyCode;
  if (!selected) {
    return;
  }

  if (kc === 13) {
    //enter is 13
    selected = null;
    handleSubmit(event);
    return;
  }

  if (kc === 8) {
    //selected.value = selected.value.slice(-1)
    selected.value = selected.value.slice(0, -1);
    return;
  }

  if (kc >= 96 && kc <= 105) {
    kc -= 48;
  }

  if (kc === 16) {
    return;
  }

  if (event.shiftKey) {
    selected.value += String.fromCharCode(kc);
  } else {
    selected.value += String.fromCharCode(kc).toLowerCase();
  }
};

function createButton(xPos, yPos) {
  let newY = yPos + 15 * counter;
  hitBoxes.push({ x: xPos, y: newY });
  console.log(hitBoxes);
  counter += 1;
  console.log(counter);
  return;
}

function resetCounter() {
  counter = 1;
}

function clearButtons() {
  hitBoxes = [];
  createButton();
}

export class myNavbar {
  constructor({ name = "", x, y, w, h, id }) {
    this.name = name;
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.id = id;
  }

  draw() {
    let curX = this.x;
    let curY = this.y + 10;
    ctx.fillStyle = "#ADD8E6";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillStyle = "black";
    ctx.fillText(this.name, curX + 10, curY + 20);
    addHit(this.x, this.y, this.w, this.h, this, (obj) => {
      exportNavId = obj.id;
    });
  }
}

export let exportNavId = [];
export const personNavbar = new myNavbar({
  name: "Person Form",
  x: 5,
  y: 5,
  w: 125,
  h: 50,
  id: 1,
});
export const animalNavbar = new myNavbar({
  name: "Animal Form",
  x: 140,
  y: 5,
  w: 125,
  h: 50,
  id: 2,
});

export class table {
  constructor({ data = [], columns = [], x, y, w, h }) {
    this.data = data;
    this.columns = columns;
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
  }

  draw() {
    let curX = this.x;
    let curY = this.y + 15;

    ctx.strokeRect(this.x, this.y, this.w, this.h);

    this.columns.forEach((col) => {
      ctx.font = "bold 18px serif";
      ctx.fillStyle = "black";
      ctx.fillText(col, curX + 5, curY);
      ctx.moveTo(curX, curY + 6);
      ctx.lineTo(curX + 100, curY + 6);
      ctx.stroke();
      curX += 150;
    });

    curX = this.x;
    curY = this.y + 40;
    this.data.forEach((d) => {
      this.columns.forEach((col) => {
        ctx.font = "18px serif";
        ctx.fillText(d[col], curX + 5, curY + 5);
        curX += 150;
      });
      //AddHItbox Here d is the obj, d is the object that is drawn.
      curX = this.x;
      curY += 20;
    });
  }
}
export class form {
  constructor({ fields = {}, x, y, w, h, submit }) {
    this.fields = fields;
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.submit = submit;
  }

  draw() {
    let curX = this.x;
    let curY = this.y + 15;
    ctx.strokeStyle = "#00008B";
    ctx.strokeRect(this.x, this.y, this.w, this.h);

    Object.entries(this.fields).forEach(([k, v]) => {
      ctx.font = "bold 18px serif";
      ctx.fillText(`${v.label}:`, curX + 5, curY);
      v.rect.x = curX - 20;
      v.rect.y = curY + 5;
      drawInput(v);
      curY += v.rect.h + 25;
    });

    ctx.fillStyle = "#ADD8E6";
    ctx.fillRect(525, 450, 100, 45);
    ctx.font = "bold 24px serif";
    ctx.fillStyle = "black";
    ctx.fillText("SUBMIT", 528, 480);
    addHit(525, 450, 100, 45, this, this.submit);

    // ctx.strokeRect(110, 450, 100, 45);
    // ctx.font = "bold 24px serif"
    // ctx.fillText("RESET", 118, 480)
  }
}

//Person Form
export const personTable = new table({
  columns: ["Name", "Age"],
  x: 5,
  y: 75,
  w: 500,
  h: 500,
});
//PRETTIER SETTINGS
export const personForm = new form({
  fields: {
    name: createInput("Name", { x: 5, y: 0, w: 250, h: 25 }),
    age: createInput("Age", { x: 5, y: 0, w: 150, h: 25 }),
  },
  x: 510,
  y: 75,
  w: 500,
  h: 500,
  submit: (obj) => {
    personTable.data.push({
      Name: obj.fields.name.value,
      Age: obj.fields.age.value,
    });
  },
});

//Animal Form
export const animalTable = new table({
  columns: ["Breed", "Owner"],
  x: 5,
  y: 75,
  w: 500,
  h: 500,
});
export const animalForm = new form({
  fields: {
    breed: createInput("Breed", { x: 5, y: 0, w: 250, h: 25 }),
    owner: createInput("Owner", { x: 5, y: 0, w: 250, h: 25 }),
  },
  x: 510,
  y: 75,
  w: 500,
  h: 500,
  submit: (obj) => {
    animalTable.data.push({
      Breed: obj.fields.breed.value,
      Owner: obj.fields.owner.value,
    });
  },
});

const formReset = () => {
  form.name.value = "";
  form.age.value = "";
};
