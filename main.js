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

let ticSound = document.querySelector('#tic');
ticSound.volume = "0.5";
let snare = document.querySelector('#snare');
snare.volume = "0.5";
let dunda = document.querySelector('#dunda');
dunda.volume = "0.5";
let pon = document.querySelector('#pon');
pon.volume = "0.5";

// Time

function getTime() {
    return Date.now() - startTime;
}


// Window

function handlerWindowOpenBeforeTic(){
    windowOpen = true;
    windowState = WINDOW_OPEN_AFTER_TIC;
}

function handlerWindowOpenAfterTic(){
    windowState = WINDOW_CLOSED;
    ticSound.play();
}

function handlerWindowClosed(ticInterval){
    windowState = WINDOW_OPEN_BEFORE_TIC;
    windowOpen = false;
    windowStart += ticInterval;
    windowEnd += ticInterval;
    ticTime += ticInterval;
    if (currentNote != ''){
        commandLine[noteCounter] = currentNote;
        noteCounter++;
        currentNote = '';
    } else {
        noteCounter = 0;
        commandLine.length = 0;
    }
    console.log(commandLine);
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
                    currentNote = "pata";
                    snare.play();
                    canvasColor = "#f07";
                    break;
                case "Numpad6":
                    currentNote = "pon";
                    pon.play();
                    canvasColor = "#70f";
                    break;
                case "Numpad2":
                    currentNote = "dunda";
                    dunda.play();
                    break;
                case "Numpad8":
                    currentNote = "pata";
                    snare.play();
                    break;
            }
        } else {
            console.log("outOfSync");
            currentNote = '';
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

startWindowLoop(200);
function frame(){
    updateWindowState(500);
    checkWindowOpen();
    keydownStartHandler();
    render();
    requestAnimationFrame(frame);
}

frame();