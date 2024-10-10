// 1) Создать объект personalMovieDB с нужными свойствами
let personalMovieDB = {
    privat: false, // Данное поле может принимать значение true или false
    movies: {
        "РЭД": 9,
        "Маугли": 8,
        "Крепкий орешек": 7
    }
};

// 2) Создать функцию, которая выводит объект movies в виде таблицы на страницу
function showMovies() {
    // Проверка поля privat
    if (!personalMovieDB.privat) {
        // Создание заголовка
        let heading = document.createElement('h1');
        heading.textContent = "Список просмотренных фильмов";
        document.body.appendChild(heading);

        // Создание таблицы
        let table = document.createElement('table');

        // Создание заголовков таблицы
        let headerRow = document.createElement('tr');
        let titleHeader = document.createElement('th');
        titleHeader.textContent = "Название фильма";
        let ratingHeader = document.createElement('th');
        ratingHeader.textContent = "Оценка";

        headerRow.appendChild(titleHeader);
        headerRow.appendChild(ratingHeader);
        table.appendChild(headerRow);

        // Заполнение таблицы данными из personalMovieDB.movies
        for (let movie in personalMovieDB.movies) {
            let row = document.createElement('tr');

            let titleCell = document.createElement('td');
            titleCell.textContent = movie;

            let ratingCell = document.createElement('td');
            ratingCell.textContent = personalMovieDB.movies[movie];

            row.appendChild(titleCell);
            row.appendChild(ratingCell);
            table.appendChild(row);
        }

        // Вставляем таблицу в тело страницы
        document.body.appendChild(table);
    } else {
        console.log("Доступ к базе фильмов закрыт, так как свойство 'privat' установлено в true.");
    }
}

// 3) Вызов функции
showMovies();
