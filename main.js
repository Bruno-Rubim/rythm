let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let keyIsPressed = {};

let canvasColor = "rgb(0, 0, 0)";

let startTime = Date.now();
let measureStartTime = Date.now() - startTime;
let measureCounter = Date.now() - measureStartTime;

let chant = ['0', '0', '0', '0'];
let currentNote;

let hihat = document.querySelector('#hihat');
hihat.volume = "0.1";measureCounter = Date.now() - measureStartTime;


// metronome

function metronomeSound(){
    hihat.play();
}

function resetMeasure(){
    measureStartTime = Date.now();
}

function updateMeasure(){
    measureCounter = Date.now() - measureStartTime;
}

function timeCheck(){
    if (measureCounter > 2000) {
        resetMeasure();
    }
    if ((measureCounter > 1950 || measureCounter < 50)){
        chant[0] = currentNote;
        console.log(chant);
    }
    if ((measureCounter > 450 && measureCounter < 550)){
        chant[1] = currentNote;
        console.log(chant);
    }
    if ((measureCounter > 950 && measureCounter < 1050)){
        chant[2] = currentNote;
        console.log(chant);
    }
    if ((measureCounter > 1450 && measureCounter < 1550)){
        chant[3] = currentNote;
        console.log(chant);
    }
    //console.log(measureCounter);
}


//notes




// keys

function translateKeys(){
}

function keydownStartHandler(e){
    if (e == "Numpad6"){
        currentNote = "Pon";
        console.log("pon");
    } else {
    }
}

function keydownHandler(e){
    if (!keyIsPressed[e.code]) {
        keydownStartHandler(e.code);
    }
    currentNote = "0";
    keyIsPressed[e.code] = true;
}
window.addEventListener("keydown", keydownHandler);

function keyupHandler(e){
    keyIsPressed[e.code] = false;
}

window.addEventListener("keyup", keyupHandler);


// rendering

function clearCanvas(){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paintCanvas(color){
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function render(){
    paintCanvas(canvasColor);
}

function frame(){
    updateMeasure();
    timeCheck();
    translateKeys();
    render();
    requestAnimationFrame(frame);
}

frame();