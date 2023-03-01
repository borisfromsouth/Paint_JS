const canvas = document.getElementById('jsCanvas');
const context = canvas.getContext('2d');  // контекст для доступа к пикселям

canvas.width = 700;
canvas.height = 700;

let painting = false;
let x = 0, y = 0;
let color;

context.lineWidth = 2.5;
context.strokeStyle = '#2c2c2c';

function stopPainting(event){
    painting = false;
    context.stroke();
    //console.log(x, y, painting);
}

function onMouseMove(event){
    x = event.offsetX;
    y = event.offsetY;
    if(painting){
        context.lineTo(x, y);
        context.stroke();
    }else{
        context.beginPath();
        context.moveTo(x, y);
    }
    
    //console.log(x, y, painting);
}

function onMouseDown(event){
    painting = true;
    context.beginPath();
    //console.log(x, y, painting);
}

/*function onMouseUp(event){
    painting = false;
    context.stroke();
}*/

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}