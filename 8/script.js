// Получаем элементы
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); // Получаем контекст рисования для canvas
const shapeSelector = document.getElementById('shape');
const lineWidthInput = document.getElementById('lineWidth');
const lineWidthValue = document.getElementById('lineWidthValue');

// Переменные для отслеживания состояния рисования
let isDrawing = false;
let startX = 0;
let startY = 0;
let currentShape = 'circle'; // По умолчанию рисуем круг
let currentColor = 'black'; // По умолчанию цвет - черный
let currentFillColor = 'transparent'; // По умолчанию цвет заливки - прозрачный
let currentLineWidth = 2; // По умолчанию толщина линии
let currentElement = null;

// Массив для хранения отрисованных фигур
let drawnShapes = []; 

// Устанавливаем значение выпадающего списка на "circle" при загрузке страницы
window.addEventListener('load', () => {
    shapeSelector.value = 'circle'; // Устанавливаем значение выпадающего списка на "circle"
    updateButtonBorder(currentColor); 
    updateFillButtonBorder(currentFillColor);
    toggleFillButtons(currentShape); // Включаем/выключаем кнопки заливки при загрузке страницы
    lineWidthInput.value = currentLineWidth; // Устанавливаем значение ползунка на 2
});

// Слушаем изменение выбранной фигуры
shapeSelector.addEventListener('change', (e) => {
    currentShape = e.target.value;
    toggleFillButtons(currentShape); // Включаем/выключаем кнопки заливки при изменении фигуры
});

// Функция для блокировки или разблокировки кнопок заливки
function toggleFillButtons(shape) {
    const fillColorButtons = document.querySelectorAll('.fillColorButton');
    if (shape === 'line') {
        fillColorButtons.forEach(button => {
            button.disabled = true; // Блокируем кнопки заливки
        });
    } else {
        fillColorButtons.forEach(button => {
            button.disabled = false; // Разблокируем кнопки заливки
        });
    }
}

// Обработчики кнопок для выбора цвета линии
document.getElementById('colorRed').addEventListener('click', () => {
    currentColor = 'red';
    updateButtonBorder(currentColor);
});
document.getElementById('colorGreen').addEventListener('click', () => {
    currentColor = 'green';
    updateButtonBorder(currentColor);
});
document.getElementById('colorBlue').addEventListener('click', () => {
    currentColor = 'blue';
    updateButtonBorder(currentColor);
});
document.getElementById('colorYellow').addEventListener('click', () => {
    currentColor = 'yellow';
    updateButtonBorder(currentColor);
});
document.getElementById('colorBlack').addEventListener('click', () => {
    currentColor = 'black';
    updateButtonBorder(currentColor);
});


// Обработчики кнопок для выбора цвета заливки
document.getElementById('fillColorRed').addEventListener('click', () => {
    currentFillColor = 'red';
    updateFillButtonBorder(currentFillColor);
});
document.getElementById('fillColorGreen').addEventListener('click', () => {
    currentFillColor = 'green';
    updateFillButtonBorder(currentFillColor);
});
document.getElementById('fillColorBlue').addEventListener('click', () => {
    currentFillColor = 'blue';
    updateFillButtonBorder(currentFillColor);
});
document.getElementById('fillColorYellow').addEventListener('click', () => {
    currentFillColor = 'yellow';
    updateFillButtonBorder(currentFillColor);
});
document.getElementById('fillColorBlack').addEventListener('click', () => {
    currentFillColor = 'black';
    updateFillButtonBorder(currentFillColor);
});
document.getElementById('fillColorTransparent').addEventListener('click', () => {
    currentFillColor = 'transparent';
    updateFillButtonBorder(currentFillColor);
});

// Функция для обновления рамки вокруг выбранной кнопки отвечающей за линию
function updateButtonBorder(currentColor) {
    // Снимаем рамки со всех кнопок
    const colorButtons = document.querySelectorAll('.colorButton');
    colorButtons.forEach(button => {
        button.style.border = 'none';
    });

    // Добавляем рамку вокруг текущей выбранной кнопки
    const currentButton = document.querySelector(`#color${currentColor.charAt(0).toUpperCase() + currentColor.slice(1)}`);
    if (currentButton) { 
        if (currentColor === 'black'){
            currentButton.style.border = '3px solid #fff';
        } else{
            currentButton.style.border = '3px solid #000';
        }
    }
}

// Функция для обновления рамки вокруг выбранной кнопки отвечающей за заливку
function updateFillButtonBorder(currentFillColor) {
    // Снимаем рамки со всех кнопок
    const colorButtons = document.querySelectorAll('.fillColorButton');
    colorButtons.forEach(button => {
        button.style.border = 'none';
    });

    // Добавляем рамку вокруг текущей выбранной кнопки
    const currentButton = document.querySelector(`#fillColor${currentFillColor.charAt(0).toUpperCase() + currentFillColor.slice(1)}`);
    console.log(`#fillColor${currentFillColor.charAt(0).toUpperCase() + currentFillColor.slice(1)}`);
    if (currentButton) { 
        if (currentFillColor === 'black'){
            currentButton.style.border = '3px solid #fff';
        } else{
            currentButton.style.border = '3px solid #000';
        }
    }
}

// Слушаем изменение ползунка для изменения толщины линии
lineWidthInput.addEventListener('input', (e) => {
    currentLineWidth = e.target.value;
    lineWidthValue.textContent = currentLineWidth; // Отображаем текущую толщину рядом с ползунком
});


// Функция для начала рисования
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    ctx.lineWidth = currentLineWidth;
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentFillColor;
});

// Функция для рисования в процессе движения мыши
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    let currentX = e.offsetX;
    let currentY = e.offsetY;

    if (currentShape === 'circle') {
        let radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        clearAndRedraw();
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (currentShape === 'rect') {
        let width = currentX - startX;
        let height = currentY - startY;
        clearAndRedraw();
        ctx.beginPath();
        ctx.rect(startX, startY, width, height);
        ctx.fill();
        ctx.stroke();
    } else if (currentShape === 'triangle') {
        clearAndRedraw(); 
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, startY);
        ctx.lineTo((startX + currentX) / 2, currentY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (currentShape === 'ellipse') {
        let rx = Math.abs(currentX - startX);
        let ry = Math.abs(currentY - startY);
        clearAndRedraw(); 
        ctx.beginPath();
        ctx.ellipse((startX + currentX) / 2, (startY + currentY) / 2, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    } else if (currentShape === 'pentagon') {
        let points = [];
        let radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        let angleOffset = -Math.PI / 2;
        for (let i = 0; i < 5; i++) {
            let angle = angleOffset + (i * 2 * Math.PI) / 5;
            let x = startX + radius * Math.cos(angle);
            let y = startY + radius * Math.sin(angle);
            points.push({x, y});
        }
        clearAndRedraw(); 
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (currentShape === 'line') {
        clearAndRedraw(); 
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
    }
});

// Функция для завершения рисования
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;

    let currentX = e.offsetX;
    let currentY = e.offsetY;

    // Сохраняем фигуру в массив
    let shapeData = {
        type: currentShape,
        startX,
        startY,
        currentX,
        currentY,
        color: currentColor,
        fillColor: currentFillColor,
        lineWidth: currentLineWidth
    };

    drawnShapes.push(shapeData); // Добавляем фигуру в массив

});

// Метод для очистки холста и перерисовки всех фигур
function clearAndRedraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Очищаем холст

    // Перерисовываем все фигуры из массива
    drawnShapes.forEach(shape => {
        ctx.lineWidth = shape.lineWidth;
        ctx.strokeStyle = shape.color;
        ctx.fillStyle = shape.fillColor;
        ctx.beginPath();
        if (shape.type === 'circle') {
            let radius = Math.sqrt(Math.pow(shape.currentX - shape.startX, 2) + Math.pow(shape.currentY - shape.startY, 2));
            ctx.arc(shape.startX, shape.startY, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (shape.type === 'rect') {
            let width = shape.currentX - shape.startX;
            let height = shape.currentY - shape.startY;
            ctx.rect(shape.startX, shape.startY, width, height);
            ctx.fill();
            ctx.stroke();
        } else if (shape.type === 'triangle') {
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.currentX, shape.startY);
            ctx.lineTo((shape.startX + shape.currentX) / 2, shape.currentY);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (shape.type === 'ellipse') {
            let rx = Math.abs(shape.currentX - shape.startX);
            let ry = Math.abs(shape.currentY - shape.startY);
            ctx.ellipse((shape.startX + shape.currentX) / 2, (shape.startY + shape.currentY) / 2, rx, ry, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (shape.type === 'pentagon') {
            let points = [];
            let radius = Math.sqrt(Math.pow(shape.currentX - shape.startX, 2) + Math.pow(shape.currentY - shape.startY, 2));
            let angleOffset = -Math.PI / 2;
            for (let i = 0; i < 5; i++) {
                let angle = angleOffset + (i * 2 * Math.PI) / 5;
                let x = shape.startX + radius * Math.cos(angle);
                let y = shape.startY + radius * Math.sin(angle);
                points.push({x, y});
            }
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            points.forEach(point => {
                ctx.lineTo(point.x, point.y);
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (shape.type === 'line') {
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.currentX, shape.currentY);
            ctx.stroke();
        }
        // Обновляем чтобы рисуемая фигура имела свои параметры, а не предыдущей рисуемой
        ctx.lineWidth = currentLineWidth;
        ctx.strokeStyle = currentColor;
        ctx.fillStyle = currentFillColor;
    });
}

// Обработчик для кнопки "Откатить"
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    // Удаляем последнюю фигуру из массива
    drawnShapes.pop();
    
    // Перерисовываем все фигуры (без последней)
    clearAndRedraw();
});

// Очистка холста
const clearAllButton = document.getElementById('clearAllButton');
clearAllButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем весь холст
    drawnShapes = []; // Очистка массива
});
