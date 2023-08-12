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
let notePlayed = false;
let outOfRythm = false;

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
    if(notePlayed){
        chant[noteCount] = currentNote;
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
    } else if ((measureTimeCounter > 450 && measureTimeCounter < 550)){
        hihat.volume = "0.1";
        createWindow();
    } else if ((measureTimeCounter > 950 && measureTimeCounter < 1050)){
        hihat.volume = "0.1";
        createWindow();
    } else if ((measureTimeCounter > 1450 && measureTimeCounter < 1550)){
        hihat.volume = "0.1";
        createWindow();
    } else {
        currentNote = '0';
        notePlayed = false;
        windowStart = true;
        outOfRythm = true;
    }
}


//notes




// keys

function translateKeys(){
}

function keydownStartHandler(e){
    if (e == "Numpad6"){
        if (notePlayed || outOfRythm) {
            console.log("Broken rythm");
        } else {
            currentNote = "Pon";
            console.log("pon");
            notePlayed = true;
        }
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