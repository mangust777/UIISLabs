// Функция для генерации карточек продуктов
function generateProductCards() {
    const productContainer = document.getElementById('main-container');

    shirts.forEach((shirt, index) => {
        // Создание карточки
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Заголовок
        const title = document.createElement('h2');
        title.textContent = shirt.name;
        card.appendChild(title);

        // Изображение майки (предпочитаем белый цвет или дефолт)
        const img = document.createElement('img');
        const imgSrc = shirt.colors.white ? shirt.colors.white.front : shirt.default.front;
        img.src = imgSrc;
        card.appendChild(img);

        // Описание
        const description = document.createElement('p');
        description.textContent = shirt.description;
        card.appendChild(description);

        // Цена
        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = shirt.price;
        card.appendChild(price);

        // Кнопки
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Кнопка "See Page"
        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See Page';
        seePageButton.addEventListener('click', () => {
            const url = `details.html?index=${index}`; // Передаём индекс через URL
            window.location.href = url; // Переход на страницу деталей
        });
        buttonContainer.appendChild(seePageButton);





        // Кнопка "Quick View"
        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick View';
        quickViewButton.addEventListener('click', () => openQuickView(index));
        buttonContainer.appendChild(quickViewButton);

        card.appendChild(buttonContainer);

        // Добавляем карточку в контейнер
        productContainer.appendChild(card);
    });
}

// Функция для открытия Quick View
function openQuickView(index) {
    const modal = document.getElementById('quick-view-modal');
    const quickViewContent = document.getElementById('quick-view-content');

    // Очищаем контент
    quickViewContent.innerHTML = '';

    const shirt = shirts[index];

    // Заголовок
    const title = document.createElement('h2');
    title.textContent = shirt.name;
    quickViewContent.appendChild(title);

    // Изображение (предпочитаем белый цвет или дефолт)
    const img = document.createElement('img');
    const imgSrc = shirt.colors.white ? shirt.colors.white.front : shirt.default.front;
    img.src = imgSrc;
    quickViewContent.appendChild(img);

    // Описание
    const description = document.createElement('p');
    description.textContent = shirt.description;
    quickViewContent.appendChild(description);

    // Цена
    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = shirt.price;
    quickViewContent.appendChild(price);

    // Открываем модальное окно
    modal.style.display = 'block';
}

// Функция для закрытия Quick View
function closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    modal.style.display = 'none';
}

// Закрытие модального окна по клику на крестик
document.querySelector('.close-button').addEventListener('click', closeQuickView);

// Генерация контента при загрузке страницы
document.addEventListener('DOMContentLoaded', generateProductCards);
