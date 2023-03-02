const canvas = document.getElementById('jsCanvas');
const context = canvas.getContext('2d');  // контекст для доступа к пикселям
const color_btns = document.getElementById('jsColors');
const lineWidth = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const cleanCanvas = document.getElementById('jsClean');
const savePicture = document.getElementById('jsSave');

canvas.width = 700;  /* задаем размер виртуальной заны рисования внутренний размер canvas-а */
canvas.height = 700;

context.fillStyle = 'white';  /*инициализируем цвет фона чтобы нормально сохранить картинку */
context.fillRect(0, 0, 700, 700);

let painting = false;
let fill = false;
context.lineWidth = 2.5;
context.strokeStyle = '#2c2c2c';

function stopPainting(event){
    painting = false;
}

function onMouseMove(event){
    x = event.offsetX; /* получаем координаты с самого объекта */
    y = event.offsetY;
    if(painting){
        context.lineTo(x, y);  // формируем линию от точки beginPath до новой точки с коорд (x, y)
        context.stroke();  // рисуем линию
    }else{
        context.beginPath();  // создаем стартовую позицию для рисования
        context.moveTo(x, y);  // перемещаем курсор и по сути получаем току в котрую возможно надо будет нарисовать линию
    }
}

function onMouseDown(event){
    painting = true;
    if(fill){
        context.fillStyle = context.strokeStyle;
        context.fillRect(0, 0, event.target.width, event.target.height);
    }
}

function onColorClick(event){
    context.strokeStyle = event.target.style.backgroundColor;
}

function onLineWidthChange(event){
    context.lineWidth = event.target.value;
}

function modeChange(event){
    if(event.target.innerHTML == 'Заливка'){
        mode.innerHTML="Рисование";
        fill = true;
    }else{
        mode.innerHTML="Заливка";
        fill = false;
    }
}

function clearCanvas(event){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function savePictureToFile(event){
    const image = canvas.toDataURL();  // преобразуем в URL данные
    const link = document.createElement('a');  // создаем ссылку
    link.href = image;  // передаем содержимое в ссылку
    link.download = 'image';  // задаем имя скачеваемого файла
    link.click();
}

function handleContextMenu(event){
    event.preventDefault();  /* отменяем действие по умолчанию */
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('contextmenu', handleContextMenu);
}

if(color_btns){
    color_btns.addEventListener('click', onColorClick);
}

if(lineWidth){
    lineWidth.addEventListener('input', onLineWidthChange);
}

if(mode){
    mode.addEventListener('click', modeChange);
}

if(cleanCanvas){
    cleanCanvas.addEventListener('click', clearCanvas);
}

if(savePicture){
    savePicture.addEventListener('click', savePictureToFile);
}

