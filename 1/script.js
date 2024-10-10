// 1) Создать переменную numberOfFilms и в неё поместить ответ от пользователя на вопрос: 'Сколько фильмов вы уже посмотрели?'
let numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '');

// 2) Создать объект personalMovieDB и в него поместить такие свойства: 
// count – сюда передается ответ на первый вопрос; 
// movies – в это свойство поместить пустой объект
let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

// 3) Задайте пользователю по два раза вопросы:
for (let i = 0; i < 2; i++) {
    // 'Один из последних просмотренных фильмов?' 
    let lastWatchedMovie = prompt('Один из последних просмотренных фильмов?', '');

    // 'На сколько оцените его?'
    let movieRating = prompt('На сколько оцените его?', '');

    // 4) Проверка ответов: строка не может быть пустой, отмененной или слишком длинной
    if (lastWatchedMovie != null && movieRating != null && lastWatchedMovie != '' && movieRating != '' && lastWatchedMovie.length < 50) {
        // 5) Записываем ответы в объект movies
        personalMovieDB.movies[lastWatchedMovie] = movieRating;
    } else {
        // Возврат к вопросам, если не выполнены условия
        i--;
    }
}

// 6) Вывод объекта personalMovieDB в консоль
console.log(personalMovieDB);
