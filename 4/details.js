document.addEventListener('DOMContentLoaded', function () {

    const detailsContainer = document.getElementById('details-container');
    const imageContainer = document.getElementById('image-container');

    // Извлечение индекса из URL
    const urlParams = new URLSearchParams(window.location.search);
    const shirtIndex = urlParams.get('index');

    console.log('Извлечённый индекс из URL:', shirtIndex);

    if (!shirtIndex || isNaN(parseInt(shirtIndex, 10))) {
        detailsContainer.innerHTML = '<p>Майка не найдена.</p>';
        return;
    }

    const parsedShirtIndex = parseInt(shirtIndex, 10);
    const shirt = shirts[parsedShirtIndex];

    if (!shirt) {
        detailsContainer.innerHTML = '<p>Майка не найдена.</p>';
        return;
    }

    // Переменные для отслеживания состояния текущего цвета и стороны
    let currentColor = Object.keys(shirt.colors)[0];  // По умолчанию выбираем первый доступный цвет
    let currentSide = 'front';  // По умолчанию показываем лицевую сторону

    // Изображение по умолчанию (первый доступный цвет)
    const img = document.createElement('img');
    img.src = shirt.colors[currentColor].front || shirt.default.front;
    img.alt = `${shirt.name} (${currentColor})`;
    imageContainer.appendChild(img);
    
    // Заголовок
    const title = document.createElement('h2');
    title.textContent = shirt.name;
    detailsContainer.appendChild(title);

    // Описание
    const description = document.createElement('p');
    description.textContent = shirt.description;
    detailsContainer.appendChild(description);

    // Цена
    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `Цена: ${shirt.price}`;
    detailsContainer.appendChild(price);

    // Цветные кнопки для выбора цвета
    const colorContainer = document.createElement('div');
    colorContainer.classList.add('color-buttons');

    // Добавляем заголовок "Color"
    const colorLabel = document.createElement('p');
    colorLabel.textContent = 'Color';
    colorContainer.appendChild(colorLabel);

    Object.keys(shirt.colors).forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.textContent = color;
        colorButton.style.backgroundColor = color;
        
        // Установим черный цвет текста для светлых кнопок
        if ((color === 'yellow') || (color === 'white')) {
            colorButton.style.color = '#000'; // Черный
        } else {
            colorButton.style.color = '#fff'; // Белый для остальных
        }
        colorButton.style.margin = '10px';
        colorButton.style.padding = '10px 20px';
        colorButton.style.border = '2px solid #333';
        colorButton.style.borderRadius = '5px';  
        colorButton.style.cursor = 'pointer';
        
        // Делаем кнопки для текущего цвета неактивными
        if (color === currentColor) {
            colorButton.disabled = true;
        } else {
            colorButton.disabled = false;
        }

        colorButton.addEventListener('click', () => {
            currentColor = color;  // Обновляем текущий выбранный цвет
            img.src = shirt.colors[currentColor][currentSide]; // Обновляем изображение в зависимости от стороны
            img.alt = `${shirt.name} (${currentColor} - ${currentSide})`;

            // Обновляем состояние кнопок (активируем/деактивируем)
            updateColorButtons();
        });
        colorContainer.appendChild(colorButton);
    });

    detailsContainer.appendChild(colorContainer);



    // Кнопки для выбора стороны (лицевая/обратная сторона)
    const sideContainer = document.createElement('div');
    sideContainer.classList.add('side-buttons');

    // Добавляем заголовок "Side"
    const sideLabel = document.createElement('p');
    sideLabel.textContent = 'Side';
    sideContainer.appendChild(sideLabel);

    const frontButton = document.createElement('button');
    frontButton.textContent = 'front';
    
    // Делаем кнопку для текущей стороны неактивной
    if (currentSide === 'front') {
        frontButton.disabled = true;
    } else {
        frontButton.disabled = false;
    }

    frontButton.addEventListener('click', () => {
        currentSide = 'front';  // Устанавливаем лицевую сторону
        img.src = shirt.colors[currentColor].front; // Показываем лицевую сторону
        img.alt = `${shirt.name} (${currentColor} - front)`;

        // Обновляем состояние кнопок
        updateSideButtons();
    });
    sideContainer.appendChild(frontButton);

    const backButton = document.createElement('button');
    backButton.textContent = 'back';

    // Делаем кнопку для текущей стороны неактивной
    if (currentSide === 'back') {
        backButton.disabled = true;
    } else {
        backButton.disabled = false;
    }

    backButton.addEventListener('click', () => {
        currentSide = 'back';  // Устанавливаем обратную сторону
        img.src = shirt.colors[currentColor].back; // Показываем обратную сторону
        img.alt = `${shirt.name} (${currentColor} - back side)`;

        // Обновляем состояние кнопок
        updateSideButtons();
    });
    sideContainer.appendChild(backButton);

    detailsContainer.appendChild(sideContainer);

    // Функции для обновления состояния кнопок
    function updateColorButtons() {
        const colorButtons = colorContainer.querySelectorAll('button');
        colorButtons.forEach(button => {
            if (button.textContent === currentColor) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    }

    function updateSideButtons() {
        const sideButtons = sideContainer.querySelectorAll('button');
        sideButtons.forEach(button => {
            if (button.textContent.toLowerCase() === currentSide) {
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    }
});
