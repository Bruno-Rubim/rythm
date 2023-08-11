let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let keyIsPressed = {};

let canvasColor = "rgb(0, 0, 0)";

let startTime = Date.now();
let measureStartTime = Date.now() - startTime;
let measureTimeCounter = Date.now() - measureStartTime;

let windowStart = true;

let chant = ['0', '0', '0', '0'];
let currentNote;

let hihat = document.querySelector('#hihat');
hihat.volume = "0.1";


// metronome

function metronomeSound(){
    hihat.play();
}

function resetMeasure(){
    measureStartTime = Date.now();
}

function updateMeasure(){
    measureTimeCounter = Date.now() - measureStartTime;
}

function createWindow(noteCount){
    if(windowStart){
        setTimeout(metronomeSound, 50);
    }

    windowStart = false;
}

function timeCheck(){
    if (measureTimeCounter > 2000) {
        resetMeasure();
        console.log(chant);
    }
    if ((measureTimeCounter > 1950 || measureTimeCounter < 50)){
        hihat.volume = "0.5";
        createWindow();
        chant[0] = currentNote;
        console.log(currentNote);
    } else if ((measureTimeCounter > 450 && measureTimeCounter < 550)){
        hihat.volume = "0.1";
        createWindow();
        chant[1] = currentNote;
    } else if ((measureTimeCounter > 950 && measureTimeCounter < 1050)){
        hihat.volume = "0.1";
        createWindow();
        chant[2] = currentNote;
    } else if ((measureTimeCounter > 1450 && measureTimeCounter < 1550)){
        hihat.volume = "0.1";
        createWindow();
        chant[3] = currentNote;
    } else {
        currentNote = '0';
        windowStart = true;
    }
    //console.log(measureTimeCounter);
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