// Получаем все элементы с классом "target"
const targets = document.querySelectorAll('.target');

// Переменные для хранения состояния перетаскивания
let isDragging = false;
let isPinned = false;
let currentElement = null;
let offsetX, offsetY;
let originalPosition = {};
let lastTouchTime = 0;
const doubleTapDelay = 300; // Время для определения двойного касания
let isClickBlocked = false; // Флаг для блокировки кликов

// Функция для открепления элемента
function unpinElement(event) {
    isPinned = false;
    currentElement.style.backgroundColor = 'red'; // Возвращаем цвет

    const rect = currentElement.getBoundingClientRect();
    const elementCenterX = rect.width / 2;
    const elementCenterY = rect.height / 2;

    // Учитываем смещение для центрирования элемента относительно курсора
    const newLeft = event.clientX - elementCenterX;
    const newTop = event.clientY - elementCenterY;

    currentElement.style.left = `${newLeft}px`;
    currentElement.style.top = `${newTop}px`;
    currentElement = null;
}

// Функция для инициализации перетаскивания
function initDrag(event) {
    if (isClickBlocked) return;
    if (isPinned) {
        unpinElement(event); // Вызываем функцию открепления
        return;
    }

    currentElement = event.currentTarget;
    isDragging = true;

    const rect = currentElement.getBoundingClientRect();
    offsetX = (event.clientX || event.touches[0].clientX) - rect.left;
    offsetY = (event.clientY || event.touches[0].clientY) - rect.top;

    originalPosition.left = parseInt(currentElement.style.left) || 0;
    originalPosition.top = parseInt(currentElement.style.top) || 0;
}

// Функция для обработки начала перетаскивания мышью
function onMouseDown(event) {
    initDrag(event);
}

// Функция для обработки начала перетаскивания на сенсорном экране
function onTouchStart(event) {
    const currentTime = Date.now();

    if (event.touches.length === 1) {
        if (currentTime - lastTouchTime <= doubleTapDelay) {
            onDoubleClick(event);
        } else if (!isPinned) {
            initDrag(event);
        }
    }

    lastTouchTime = currentTime;
}

// Функция для завершения перетаскивания
function onEnd() {
    if (isDragging) {
        isDragging = false;
    }
}

// Функция для обработки перемещения элемента
function onMove(event) {
    const clientX = event.clientX || (event.touches ? event.touches[0].clientX : 0);
    const clientY = event.clientY || (event.touches ? event.touches[0].clientY : 0);

    // Проверка на мультикасание
    if (event.touches && event.touches.length > 1) {
        resetPosition(); // Сброс позиции при мультикасании
        return; // Выходим из функции
    }

    if (isDragging || isPinned) {
        const rect = currentElement.getBoundingClientRect(); // Размеры элемента

        // Перемещаем элемент по центру, используя текущее смещение
        currentElement.style.left = `${clientX - offsetX}px`;
        currentElement.style.top = `${clientY - offsetY}px`;
    }
}

// Функция для обработки двойного клика или двойного касания
function onDoubleClick(event) {
    isClickBlocked = true; // Блокируем клики после двойного нажатия

    if (!isPinned) {
        isPinned = true;
        currentElement = event.currentTarget;
        currentElement.style.backgroundColor = 'blue'; // Меняем цвет при прикреплении
    } else {
        // Открепляем элемент
        unpinElement(event);
    }

    // Сбрасываем блокировку через небольшой интервал, чтобы позволить обработать одиночные клики
    setTimeout(() => {
        isClickBlocked = false;
    }, doubleTapDelay);
}

// Глобальная функция для обработки кликов
function onGlobalClick(event) {
    if (isPinned && currentElement && !currentElement.contains(event.target) && !isClickBlocked) {
        unpinElement(event);
    }
}

// Функция для обработки нажатия клавиш
function onKeyDown(event) {
    event.preventDefault();
    if (event.key === 'Escape' && currentElement) {
        resetPosition();
    }
}

// Функция для сброса позиции элемента
function resetPosition() {
    if (currentElement) {
        currentElement.style.left = `${originalPosition.left}px`;
        currentElement.style.top = `${originalPosition.top}px`;
        isDragging = false;
        isPinned = false;
        currentElement.style.backgroundColor = 'red'; // Возвращаем цвет
        currentElement = null;
    }
}

// Обновляем событие для окончания касания
function onTouchEnd() {
    onEnd();
}

// Добавляем обработчики событий для каждого элемента
targets.forEach(target => {
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('touchstart', onTouchStart);
    target.addEventListener('dblclick', onDoubleClick);
});

// Глобальные обработчики событий
document.addEventListener('mousemove', onMove);
document.addEventListener('mouseup', onEnd);
document.addEventListener('touchmove', onMove);
document.addEventListener('touchend', onTouchEnd);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('click', onGlobalClick); 


