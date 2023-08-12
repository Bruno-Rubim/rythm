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
let outOfCheckWindow = false;
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

function resetChant(){
    chant = ["0", "0", "0", "0"];
    outOfRythm = false;
    measureStartTime -= (Math.floor(measureTimeCounter/250) + 1) * 500;
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
    if ((measureTimeCounter > 0 || measureTimeCounter < 100)){
        hihat.volume = "0.5";
        createWindow(Math.floor(measureTimeCounter/250));
    } else if ((measureTimeCounter > 500 && measureTimeCounter < 600)){
        hihat.volume = "0.1";
        createWindow(Math.floor(measureTimeCounter/250));
    } else if ((measureTimeCounter > 1000 && measureTimeCounter < 1100)){
        hihat.volume = "0.1";
        createWindow(Math.floor(measureTimeCounter/250));
    } else if ((measureTimeCounter > 1500 && measureTimeCounter < 1600)){
        hihat.volume = "0.1";
        createWindow(Math.floor(measureTimeCounter/250));
    } else {
        currentNote = '0';
        notePlayed = false;
        windowStart = true;
        outOfCheckWindow = true;
    }
}


//notes




// keys

function translateKeys(){
}

function keydownStartHandler(e){
    if (e == "Numpad6"){
        if (notePlayed || outOfCheckWindow) {
            console.log("Broken rythm");
            resetChant();
        } else {
            currentNote = "pon";
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