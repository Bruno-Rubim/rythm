let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasColor = "rgb(0, 0, 0)";


let keyIsPressed = {};


let startTime = Date.now();
let measureStartTime = 0;
let measureTimeCounter = 0;

let windowStart = true;
let notePlayed = false;
let outOfCheckWindow = false;
let outOfRythm = false;

let chant = ['0', '0', '0', '0'];
let currentNote;

let hihat = document.querySelector('#hihat');
hihat.volume = "0.1";

function getTime() {
    return Date.now() - startTime;
}

// metronome

function tic(){
    hihat.play();
    canvasColor = "#f02";
}

function updateMeasureTimeCounter(){
    measureTimeCounter = getTime() - measureStartTime;
}

function resetMeasure(noteCount){
    measureStartTime -= noteCount;
    chant = ["0", "0", "0", "0"];
}

function createWindow(noteCount, gap){
    canvasColor = "#702";
    if(windowStart){
        setTimeout(tic, gap/3);
    }
    if(notePlayed){
        chant[noteCount] = currentNote;
        console.log(currentNote);
    }
    outOfCheckWindow = false;
    windowStart = false;
}

function resetChant(){
    chant = ["0", "0", "0", "0"];
    outOfRythm = false;
    measureStartTime -= (Math.floor(measureTimeCounter/250) + 1) * 500;
}

function actChant(){
    console.log(chant);
    measureStartTime = getTime() - 2000;
    resetChant();
}

function timeCheck(gap){
    noteCount = Math.floor(measureTimeCounter/500);
    if (measureTimeCounter > 2000) {
        actChant();
    }
    if (noteCount < 0) {
        hihat.volume = "0.01";
    } else if (noteCount > 2) {
        hihat.volume = "0.5";
    } else {
        hihat.volume = "0.1";
    }
    console.log(measureTimeCounter);
    if ((measureTimeCounter > -1 && measureTimeCounter < gap)){
        createWindow(noteCount, 200);
    } else if ((measureTimeCounter > 500 && measureTimeCounter < 500 + gap)){
        createWindow(noteCount, 200);
    } else if ((measureTimeCounter > 1000 && measureTimeCounter < 1100 + gap)){
        createWindow(noteCount, 200);
    } else if ((measureTimeCounter > 1500 && measureTimeCounter < 1600 + gap)){
        createWindow(noteCount, 200);
    } else {
        canvasColor = "#000";
        currentNote = '0';
        if (outOfRythm) {
            resetMeasure(noteCount);
        }
        notePlayed = false;
        windowStart = true;
        outOfCheckWindow = true;
    }
}


// keys

function translateKeys(){
}

function keydownStartHandler(e){
    if (notePlayed || outOfCheckWindow) {
        console.log("Broken rythm");
        resetChant();
    } else {
        switch(e){
            case "Numpad6":
                currentNote = "pon";
                break;
            case "Numpad4":
                currentNote = "pata";
                break;
        }
        notePlayed = true;
    }
}

function keydownHandler(e){
    if (!keyIsPressed[e.code]) {
        keydownStartHandler(e.code);
    }
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
    updateMeasureTimeCounter();
    timeCheck(200);
    translateKeys();
    render();
    requestAnimationFrame(frame);
}

frame();