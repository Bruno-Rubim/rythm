let canvas = document.querySelector('canvas');
let ctx = canvas.getContext("2d");

let keyIsPressed = {};

let canvasColor = "rgb(0, 0, 0)"

let hihat = document.querySelector('#hihat');
hihat.volume = "0.1";

// keys

function translateKeys(){
    if (keyIsPressed["Numpad6"]){
        console.log("Pon");
    }
}

function keydownHandler(e){
    keyIsPressed[e.code] = 1;
    //console.log(e.code);
}

window.addEventListener("keydown", keydownHandler);

function keyupHandler(e){
    keyIsPressed[e.code] = false;
}

window.addEventListener("keyup", keyupHandler);


// metronome

function metronomeSound(){
    hihat.play();
}

function noRythmTimer(){
    canvasColor = "rgb(0, 0, 0)"
    setTimeout(noteCheck, (120/240)*800);
}

function noteCheck(){
    canvasColor = "rgb(0, 255, 32)"
    if(keyIsPressed["Numpad6"]){
        canvasColor = "rgb(32, 0, 255)"
    }
    setTimeout(noRythmTimer, (120/240)*200);
}

function addBasicMetronome(bpm){
    setInterval(metronomeSound, (bpm/240)*1000);

}

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
    translateKeys();
    render();
    requestAnimationFrame(frame);
}

setTimeout(noRythmTimer, 450); 
addBasicMetronome(120);
frame();