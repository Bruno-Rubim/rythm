let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasColor = "#000";

let keyIsPressed = {};

let startTime = Date.now();

const WINDOW_OPEN_BEFORE_TIC = "window open bt";
const WINDOW_OPEN_AFTER_TIC = "window open at";
const WINDOW_CLOSED = "window closed";
let windowState;
let windowStart;
let windowEnd;
let ticTime;
let windowOpen = false;

let currentNote = '';
let noteCounter = 0;
let commandLine = [];


let background = document.querySelector('#background');
background.volume = "1";
background.loop = "loop";

let ticSound = document.querySelector('#tic');
let left = document.querySelector('#left');
let down = document.querySelector('#down');
let right = document.querySelector('#right');
let up = document.querySelector('#up');

// Time

function getTime() {
    return Date.now() - startTime;
}


// Window

function updateTempoState(){

}

function handlerWindowOpenBeforeTic(){
    windowOpen = true;
    windowState = WINDOW_OPEN_AFTER_TIC;
}

function handlerWindowOpenAfterTic(){
    windowState = WINDOW_CLOSED;
    if(noteCounter%2){
        //background.play();
        ticSound.cloneNode(true).play();
    }
}

function handlerWindowClosed(ticInterval){
    windowState = WINDOW_OPEN_BEFORE_TIC;
    //windowOpen = false;
    windowStart += ticInterval;
    windowEnd += ticInterval;
    ticTime += ticInterval;
    if (currentNote != ''){
        commandLine[noteCounter - 1] = currentNote;
        console.log(noteCounter, );
        currentNote = '';
    } else if (noteCounter%2 == 0){
        noteCounter = 0;
        commandLine.length = 0;
    }
    noteCounter++;
}

function startWindowLoop(windowGap){
    windowState = WINDOW_OPEN_BEFORE_TIC;
    windowStart = getTime();
    windowEnd = windowStart + windowGap;
    ticTime = windowStart + (windowGap/2);
}

function updateWindowState(ticInterval) {
    switch(windowState) {
        case WINDOW_OPEN_BEFORE_TIC:
            if (getTime() >= ticTime) {
                handlerWindowOpenBeforeTic();
            }
            break;
        case WINDOW_OPEN_AFTER_TIC:
            if (getTime() >= windowEnd) {
                handlerWindowOpenAfterTic();
            }
            break;
        case WINDOW_CLOSED:
            if (getTime() >= windowStart){
                handlerWindowClosed(ticInterval);
            }
            break;
    }
}


function checkWindowOpen(){
    if (windowOpen){
        canvasColor = "#201";
    } else {
        canvasColor = "#000";
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
        if(windowOpen){
            switch(key){
                case "Numpad4":
                    currentNote = "left";
                    left.cloneNode(true).play();
                    canvasColor = "#f07";
                    break;
                case "Numpad6":
                    currentNote = "right";
                    right.cloneNode(true).play();
                    canvasColor = "#70f";
                    break;
                case "Numpad2":
                    currentNote = "down";
                    down.cloneNode(true).play();
                    break;
                case "Numpad8":
                    currentNote = "key";
                    up.cloneNode(true).play();
                    break;
            }
        } else {
            console.log("outOfSync");
            currentNote = '';
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


startWindowLoop(1000);
function frame(){
    updateWindowState(250);
    checkWindowOpen();
    keydownStartHandler();
    render();
    requestAnimationFrame(frame);
}

frame();