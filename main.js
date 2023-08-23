let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasColor = "#000";

let keyIsPressed = {};

let startTime = Date.now();

let currentNote = undefined;
let noteCounter = 0;
let currentCommand = [];
let possibleCommands = [];
possibleCommands[0] = ["left", undefined, "left", undefined, "left", undefined, "right", undefined];

let ticSound = document.querySelector('#tic');
let left = document.querySelector('#left');
let down = document.querySelector('#down');
let right = document.querySelector('#right');
let up = document.querySelector('#up');

const BEFORE_MAIN_TIC = "bm";
const AFTER_MAIN_TIC = "am";
const BEFORE_HALF_TIC = "bh";
const AFTER_HALF_TIC = "ah";
let noteState = BEFORE_MAIN_TIC;
let ticGap;
let ticTime;
let noteTimeStart;
let noteTimeEnd;

let outOfRythm;

let background = document.querySelector('#background');
background.volume = "1";
background.loop = "loop";

// Time

function getTime() {
    return Date.now() - startTime;
}


// Note

function startNoteLoop(bpm){
    ticGap = 250*(bpm/250);
    noteTimeStart = getTime();
    noteTimeEnd = noteTimeStart + ticGap;
    ticTime = noteTimeStart + ticGap/4;
}

function handlerBeforeMainTic(){
    if (getTime() > ticTime){
        noteState = AFTER_MAIN_TIC;
        ticSound.cloneNode(true).play();
    }
}

function handlerAfterMainTic(){
    if (getTime() > noteTimeEnd) {
        noteState =  BEFORE_HALF_TIC;
        currentNote = undefined;
        noteTimeStart += ticGap;
        noteTimeEnd += ticGap;
        ticTime += ticGap;
        noteCounter++;
    }
}

function handlerBeforeHalfTic(){
    if (getTime() > ticTime){
        noteState = AFTER_HALF_TIC;
        //ticSound.cloneNode(true).play();
    }
}

function handlerAfterHalfTic(){
    if (getTime() > noteTimeEnd) {
        noteState =  BEFORE_MAIN_TIC;
        currentNote = undefined;
        noteTimeStart += ticGap;
        noteTimeEnd += ticGap;
        ticTime += ticGap;
        noteCounter++;
        outOfRythm = false;
    }
}

function updateNoteState(){
    switch(noteState){
        case BEFORE_MAIN_TIC:
            handlerBeforeMainTic();
            break;
        case AFTER_MAIN_TIC:
            handlerAfterMainTic();
            break;
        case BEFORE_HALF_TIC:
            handlerBeforeHalfTic();
            break;
        case AFTER_HALF_TIC:
            handlerAfterHalfTic();
            break;
    }
    if (noteCounter > 7) {
        noteCounter = -8;
    }
}

function checkRythm(){
    for (let i = 0; i < possibleCommands.length; i++){
        if (!(currentNote == possibleCommands[i][noteCounter])){
            outOfRythm = true;
        }
        console.log(currentNote, possibleCommands[i][noteCounter], i, noteCounter);
    }

    if (outOfRythm){
        noteCounter = 0;
        currentNote = "wrong";
        canvasColor = "#000";
    } else {
        canvasColor = "#333";
    }
}

// keys

function keydownStartHandler(key){
    noteAttempt = false;
    if(key == "Numpad4" || 
    key == "Numpad6" || 
    key == "Numpad2" ||
    key == "Numpad8"){
        noteAttempt = true;
    }
    if(noteAttempt){
        if (currentNote == undefined){
            switch(key){
                case "Numpad4":
                    currentNote = "left";
                    left.cloneNode(true).play();
                    canvasColor = "#f07";
                    break;
                case "Numpad6":
                    currentNote = "right";
                    right.cloneNode(true).play();
                    canvasColor = "#07f";
                    break;
                case "Numpad2":
                    currentNote = "down";
                    down.cloneNode(true).play();
                    canvasColor = "#f70";
                    break;
                case "Numpad8":
                    currentNote = "key";
                    up.cloneNode(true).play();
                    canvasColor = "#0f7";
                    break;
            }
        } else {
            outOfRythm = true;
        }
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

function paintCanvas(color){
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function render(){
    paintCanvas(canvasColor);
}

startNoteLoop(1200);

function frame(){
    updateNoteState();
    keydownStartHandler();
    checkRythm();
    render();
    requestAnimationFrame(frame);
    //console.log(outOfRythm);
}

frame();