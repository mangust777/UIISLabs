// Получаем все элементы с классом "target"
const targets = document.querySelectorAll('.target');

// Переменные для хранения состояния перетаскивания
let isDragging = false;
let isPinned = false;
let currentElement = null;
let offsetX, offsetY;
let originalPosition = {};
let minWidth = 50; // Минимальная ширина
let maxWidth = 500; // Максимальная ширина
let minHeight = 50; // Минимальная высота
let maxHeight = 500; // Максимальная высота




// Функция для обработки начала перетаскивания (мышь)
function onMouseDown(event) {
    if (isPinned) return;

    currentElement = event.currentTarget;
    isDragging = true;
    offsetX = event.clientX - currentElement.getBoundingClientRect().left;
    offsetY = event.clientY - currentElement.getBoundingClientRect().top;

    // Сохраняем начальную позицию
    originalPosition.left = parseInt(currentElement.style.left) || 0;
    originalPosition.top = parseInt(currentElement.style.top) || 0;
}

// Функция для обработки окончания перетаскивания (мышь)
function onMouseUp() {
    if (isDragging) {
        isDragging = false;
    }
}

// Функция для обработки двойного клика
function onDoubleClick(event) {
    if (isPinned) return; // Если уже прикреплен, ничего не делаем
  
    currentElement = event.currentTarget;
    isPinned = true;
    currentElement.style.backgroundColor = 'blue'; // Меняем цвет при прикреплении
}

// Функция для обработки перемещения элемента (мышь)
function onMove(event) {
    if (isDragging) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        currentElement.style.left = `${clientX - offsetX}px`;
        currentElement.style.top = `${clientY - offsetY}px`;
    } else if (isPinned) {
        const clientX = event.clientX || event.touches[0].clientX;
        const clientY = event.clientY || event.touches[0].clientY;

        currentElement.style.left = `${clientX - offsetX}px`;
        currentElement.style.top = `${clientY - offsetY}px`;
    }
}

// Функция для обработки клика
function onClick(event) {
    if (isPinned && currentElement) {
        // Если элемент прикреплен, открепляем его
        isPinned = false;
        currentElement.style.backgroundColor = 'red'; // Возвращаем цвет
        currentElement = null; // Сбрасываем текущее состояние
    }
}

function onKeyDown(event) {
    // Отменяем действие по умолчанию для всех клавиш
    event.preventDefault();
  
    if (event.key === 'Escape' && currentElement) {
        // Вернуть элемент на исходную позицию
        currentElement.style.left = `${originalPosition.left}px`;
        currentElement.style.top = `${originalPosition.top}px`;
        isDragging = false;
        isPinned = false; // Убираем прикрепление
        currentElement.style.backgroundColor = 'red'; // Возвращаем цвет
        currentElement = null;
    } else if (isPinned && currentElement) {
        // Получаем текущую ширину и высоту
        const currentWidth = parseInt(currentElement.style.width) || 100; // Ширина по умолчанию
        const currentHeight = parseInt(currentElement.style.height) || 100; // Высота по умолчанию

        let newWidth = currentWidth;
        let newHeight = currentHeight;

        // Изменяем ширину и высоту только если оба условия выполнены
        if (event.key === '+') {
            newWidth += 10;
            newHeight += 10;
        } else if (event.key === '-') {
            newWidth -= 10;
            newHeight -= 10;
        }

        // Проверяем, можно ли изменить ширину и высоту
        if (
            newWidth >= minWidth && newWidth <= maxWidth &&
            newHeight >= minHeight && newHeight <= maxHeight
        ) {
            currentElement.style.width = `${newWidth}px`;
            currentElement.style.height = `${newHeight}px`;
        }
    }
}

  

// Добавляем обработчики событий для каждого элемента
targets.forEach(target => {
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('dblclick', onDoubleClick);
    target.addEventListener('click', onClick);
});

document.addEventListener('mousemove', onMove);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('keydown', onKeyDown);
