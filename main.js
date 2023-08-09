let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

let keyIsPressed = {};

let hihat = document.querySelector('#hihat');
hihat.volume = "0.0";

// keys

function translateKeys(){
}

function keydownHandler(e){
    keyIsPressed[e.code] = true;
    console.log(e.code);
}

window.addEventListener("keydown", keydownHandler);

function keyupHandler(e){
    keyIsPressed[e.code] = false;
}

window.addEventListener("keyup", keyupHandler);


// metronome

function noteCheck(){
    hihat.play();
}

function addBasicMetronome(bpm){
    setInterval(noteCheck, (bpm/240)*1000);
}

// rendering

function clearCanvas(){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function render(){
    clearCanvas();
}

function frame(){
    translateKeys();
    render();
    requestAnimationFrame(frame);
}

addBasicMetronome(120);
frame();