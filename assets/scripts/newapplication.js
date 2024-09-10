const canvas = document.getElementById("my-canvas")

const ctx = canvas.getContext('2d')

const columns = ["Name", "Age"]
let data = [];
//{Name: "Everett", Age: "70"} , {Name: "Curtis", Age: '14'}
let hitBoxes = new Array();

let selected = null



const createInput =(name, rect) => {
    return {
        label: name,
        value: '',
        rect: rect
    }
}

function coordinate(x, y){
    this.x = x;
    this.y = y
}

const form = {
    name: createInput("Name", {x: 5, y: 0, w: 250, h: 25}),
    age: createInput("Age", {x: 5, y: 0, w: 150, h: 25})
}

const drawInput = (input) => {
    ctx.strokeRect(input.rect.x + 25, input.rect.y, input.rect.w, input.rect.h)
    ctx.font = "24px Unknown, serif"
    ctx.fillText(input.value, input.rect.x + 30, input.rect.y + 20)
}

const handleMouse = (event) => {
    if(selectInput(event)){
        console.log("HIT")
        return
    } else {
        handleSubmit(event);
        handleReset(event);
    }

    if(gatherData(event)){
        console.log("Hit Info")
        return
    }
}

const gatherData = (event) => {
    // if(event.x >= 710 && event.x <= 810 && event.y >= 40 && event.y <= 55){
    //     form.name.value = data[0].Name;
    //     form.age.value = data[0].Age;
    //     data.splice(data, 1)
    //     return
    // }

    //&& event.x <= (hitBoxes[i].x + 100) && event.y >= hitBoxes[i].y && event.y <= (hitBoxes[i] + 15)
    for(var i = 0; i < hitBoxes.length; i++){
        console.log(event.y + " " + ((hitBoxes[i].y) + 8))
        if(event.x >= hitBoxes[i].x && event.x <= (hitBoxes[i].x + 100) && event.y >= hitBoxes[i].y && event.y <= ((hitBoxes[i].y) + 18)){
            // if(hitBoxes[i] === hitBoxes[0]){
                form.name.value = data[i].Name;
                form.age.value = data[i].Age;
                data.splice(i, 1)
                hitBoxes.splice(i, 1)
                resetCounter();
                createButton();
            // }
            // if(hitBoxes[i] === hitBoxes[1]){
            //     form.name.value = data[1].Name;
            //     form.age.value = data[1].Age;
            //     data.splice(i, 1)
            //     hitBoxes.splice(i, 1)
            //     resetCounter();
            //     createButton();
            // }
            // if(hitBoxes[i] === hitBoxes[2]){
            //     form.name.value = data[2].Name;
            //     form.age.value = data[2].Age;
            //     data.splice(i, 1)
            //     hitBoxes.splice(i, 1)
            //     resetCounter();
            //     createButton();
            // }
            // if(hitBoxes[i] === hitBoxes[3]){
            //     form.name.value = data[3].Name;
            //     form.age.value = data[3].Age;
            //     data.splice(i, 1)
            //     hitBoxes.splice(i, 1)
            //     resetCounter();
            //     createButton();
            // }
        }
    }
}

const handleSubmit = (event) => {
    if(event.x >= 5 && event.x <= 105 && event.y >= 450 && event.y <= 485){
        if(form.name.value === "" || form.age.value === ""){
            window.alert("Input Fields are Empty.")
            return
        }

        if(!isNumber(form.age.value)){
            window.alert("AGE HAS TO BE A NUMBER")
            return
        }

        const obj = {
            Name: form.name.value,
            Age: form.age.value
        }
        data.push(obj);
        form.name.value = "";
        form.age.value = "";
        createButton(700, 20)
    }
}

const handleReset = (event) => {
    if(event.x >= 110 && event.x <= 210 && event.y >= 450 && event.y <= 485){
        data = [];
        form.name.value = "";
        form.age.value = "";
    }
}

function isNumber(value) {
    return !isNaN(value);
}

// const isNumber = (value) = {
//     return !isNaN(value);
// }

const selectInput = (event) => {
    let hit = false
    selected = Object.values(form).find(input => {
        if(event.x >= input.rect.x && event.x <= input.rect.x + input.rect.w && event.y >= input.rect.y && event.y <= input.rect.y + input.rect.h){
            hit = true
            return true;
        }
    });


    return hit
}

const handleKeys = (event) => {
    let kc = event.keyCode;
    if(!selected) {
        return
    }

    if(kc === 13){ //enter is 13
        selected = null;
        handleSubmit(event)
        return
    }

    if(kc === 8){
        //selected.value = selected.value.slice(-1)
        selected.value = selected.value.slice(0, -1)
        return
    }

    if(kc >= 96 && kc <= 105){
        kc -= 48;
    }

    if(kc === 16){
        return
    }

    if(event.shiftKey) {
        selected.value += String.fromCharCode(kc)
    } else {
        selected.value += String.fromCharCode(kc).toLowerCase()
    }
    
}
let counter = 1
function createButton(xPos, yPos) {
    let newY = yPos + (15 * counter) 
    hitBoxes.push({x:xPos, y:newY})
    console.log(hitBoxes)
    counter += 1;
    console.log(counter)
    return
}

function resetCounter(){
    counter = 1
}

function clearButtons(){
    hitBoxes = [];
    createButton();
}

const drawTableData = () => {
    xPos = 510;
    yPos = 40;

    // for(var i = 0; i < hitBoxes.length; i++){
    //     ctx.strokeRect(hitBoxes[i].x, hitBoxes[i].y, 100, 15)
       
    // }

   
    
    for(var i = 0; i < hitBoxes.length; i++){
        ctx.strokeRect(hitBoxes[i].x, hitBoxes[i].y, 100, 15)
    }
    
    data.forEach(d=>{
        
        
        
        columns.forEach(col=> {
            ctx.font = "18px serif"
            ctx.fillText(d[col], xPos + 5, yPos + 5)
            xPos += 150
        });
         
        xPos = 510;
        yPos += 20;
     });
}

const drawForm = () => {
    let xPos = 0;
    let yPos = 25;

    

    ctx.strokeStyle = "blue"
    ctx.strokeRect(0,0, 500, 500)
    

    //Input Field Tags
    ctx.font = "bold 18px serif"
    ctx.fillText("Name:", 5, 20)
    ctx.fillText("Age:", 5, 70)

    Object.values(form).forEach(input => {
        input.rect.x = xPos - 20;
        input.rect.y = yPos;
        drawInput(input);
        yPos += input.rect.h + 25;
    });

    ctx.strokeRect(5, 450, 100, 45);
    ctx.font = "bold 24px serif"
    ctx.fillText("SUBMIT", 8, 480)

    ctx.strokeRect(110, 450, 100, 45);
    ctx.font = "bold 24px serif"
    ctx.fillText("RESET", 118, 480)


    ctx.strokeRect(505,0,495,500)
    //Column Headers
    xPos = 510
    yPos = 20
	columns.forEach(col=> {
        ctx.font = "bold 18px serif";
        ctx.fillStyle = "black";
		ctx.fillText(col, xPos + 5, yPos);
        ctx.moveTo(xPos, yPos + 6);
        ctx.lineTo(xPos + 100,yPos + 6)     
        ctx.stroke();
		xPos += 150
    });

     //Go Down a spot
     xPos = 510;
     yPos += 20;
 
}

canvas.addEventListener("mouseup", handleMouse);
window.addEventListener("keyup", handleKeys);

function updateUI() {
    window.setTimeout(updateUI, 20)
    ctx.clearRect(0,0, 1000, 500)
    drawTableData()
    drawForm()
}

updateUI()