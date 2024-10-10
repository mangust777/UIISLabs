// Получаем элементы
const svgCanvas = document.getElementById('svgCanvas');
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


// Функция для обновления рамки вокруг выбранной кнопки отвечающей за цвет линии
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
svgCanvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;

    if (currentShape === 'circle') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        currentElement.setAttribute('cx', startX);
        currentElement.setAttribute('cy', startY);
        currentElement.setAttribute('stroke', currentColor);
        currentElement.setAttribute('stroke-width', currentLineWidth);
        currentElement.setAttribute('fill', currentFillColor);
    } else if (currentShape === 'rect') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        currentElement.setAttribute('x', startX);
        currentElement.setAttribute('y', startY);
        currentElement.setAttribute('stroke', currentColor);
        currentElement.setAttribute('stroke-width', currentLineWidth);
        currentElement.setAttribute('fill', currentFillColor);
    } else if (currentShape === 'triangle') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        currentElement.setAttribute('stroke', currentColor);
        currentElement.setAttribute('stroke-width', currentLineWidth);
        currentElement.setAttribute('fill', currentFillColor);
    } else if (currentShape === 'ellipse') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        currentElement.setAttribute('stroke', currentColor);
        currentElement.setAttribute('stroke-width', currentLineWidth);
        currentElement.setAttribute('fill', currentFillColor);
    } else if (currentShape === 'pentagon') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        currentElement.setAttribute('stroke', currentColor);
        currentElement.setAttribute('stroke-width', currentLineWidth);
        currentElement.setAttribute('fill', currentFillColor);
    } else if (currentShape === 'line') {
        currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        currentElement.setAttribute('x1', startX);
        currentElement.setAttribute('y1', startY);
        currentElement.setAttribute('x2', startX);
        currentElement.setAttribute('y2', startY);
        currentElement.setAttribute('stroke', currentColor);
        currentElement.setAttribute('stroke-width', currentLineWidth);

        svgCanvas.appendChild(currentElement);
    }

    svgCanvas.appendChild(currentElement);
    drawnShapes.push(currentElement); // Добавляем фигуру в список отрисованных
});

// Функция для рисования в процессе движения мыши
svgCanvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    let currentX = e.offsetX;
    let currentY = e.offsetY;

    if (currentShape === 'circle') {
        let radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        currentElement.setAttribute('r', radius);
    } else if (currentShape === 'rect') {
        let width = currentX - startX;
        let height = currentY - startY;
        currentElement.setAttribute('width', Math.abs(width));
        currentElement.setAttribute('height', Math.abs(height));
        if (width < 0) {
            currentElement.setAttribute('x', currentX);
        }
        if (height < 0) {
            currentElement.setAttribute('y', currentY);
        }
    } else if (currentShape === 'triangle') {
        let points = [
            {x: startX, y: startY},
            {x: currentX, y: startY},
            {x: (startX + currentX) / 2, y: currentY}
        ];
        currentElement.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(' '));
    } else if (currentShape === 'ellipse') {
        let rx = Math.abs(currentX - startX);
        let ry = Math.abs(currentY - startY);
        currentElement.setAttribute('rx', rx);
        currentElement.setAttribute('ry', ry);
        currentElement.setAttribute('cx', (startX + currentX) / 2);
        currentElement.setAttribute('cy', (startY + currentY) / 2);
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
        currentElement.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(' '));
    } else if (currentShape === 'line') {
        currentElement.setAttribute('x2', currentX);
        currentElement.setAttribute('y2', currentY);
    }
});

// Функция для завершения рисования
svgCanvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Откат последней фигуры
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', () => {
    const lastShape = drawnShapes.pop(); // Убираем последнюю фигуру из массива
    if (lastShape) {
        svgCanvas.removeChild(lastShape); // Удаляем последнюю фигуру с холста
    }
});

// Очистка холста
const clearAllButton = document.getElementById('clearAllButton');
clearAllButton.addEventListener('click', () => {
    while (svgCanvas.firstChild) {
        svgCanvas.removeChild(svgCanvas.firstChild);
    }
    drawnShapes = []; // Очистка массива
});
