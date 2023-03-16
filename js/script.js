const divContainer = document.querySelector('.movies-container');
const movies = document.querySelector('.movies');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const hidden = document.querySelector('.hidden')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal__close')
let pagePosition = 0;

let movieId
let moviePoster;
let movieTitle;
let movieVotes;

async function loadInfoMovies() {
    try {
        const { data } = await api.get('');
        const infoMovies = data.results;

        infoMovies.length = 18;

        for (let index = 0; index <= 5; index++) {

            const movie = infoMovies[index];

            movieId = movie.id;
            moviePoster = movie.poster_path;
            movieTitle = movie.title;
            movieVotes = movie.vote_average;

            createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
        }

        buttonPrev.addEventListener('click', (event) => {
            event.stopPropagation();

            if (pagePosition === 0) {
                pagePosition = 2

                for (let index = 12; index <= 17; index++) {
                    removeDivMovie()
                    const movie = infoMovies[index];

                    movieId = movie.id;
                    moviePoster = movie.poster_path;
                    movieTitle = movie.title;
                    movieVotes = movie.vote_average;

                    createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
                }
            } else if (pagePosition === 2) {
                pagePosition = 1
                for (let index = 6; index <= 11; index++) {
                    removeDivMovie()
                    const movie = infoMovies[index];

                    movieId = movie.id;
                    moviePoster = movie.poster_path;
                    movieTitle = movie.title;
                    movieVotes = movie.vote_average;

                    createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
                }
            } else if (pagePosition === 1) {
                pagePosition = 0
                for (let index = 0; index <= 5; index++) {
                    removeDivMovie()
                    const movie = infoMovies[index];

                    movieId = movie.id;
                    moviePoster = movie.poster_path;
                    movieTitle = movie.title;
                    movieVotes = movie.vote_average;

                    createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
                }
            }
        });

        buttonNext.addEventListener('click', (event) => {
            event.stopPropagation();
            if (pagePosition === 0) {
                pagePosition = 1;
                for (let index = 6; index <= 11; index++) {
                    removeDivMovie()
                    const movie = infoMovies[index];

                    movieId = movie.id;
                    moviePoster = movie.poster_path;
                    movieTitle = movie.title;
                    movieVotes = movie.vote_average;

                    createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
                }
            } else if (pagePosition === 1) {
                pagePosition = 2;
                for (let index = 12; index <= 17; index++) {
                    removeDivMovie()
                    const movie = infoMovies[index];

                    movieId = movie.id;
                    moviePoster = movie.poster_path;
                    movieTitle = movie.title;
                    movieVotes = movie.vote_average;

                    createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
                }
            } else if (pagePosition === 2) {
                pagePosition = 0;
                for (let index = 0; index <= 5; index++) {
                    removeDivMovie()
                    const movie = infoMovies[index];

                    movieId = movie.id;
                    moviePoster = movie.poster_path;
                    movieTitle = movie.title;
                    movieVotes = movie.vote_average;

                    createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
                }
            }
        });

    } catch (error) {

    };
};

async function loadSearchMovie(movieName) {
    const data = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false' + `&query=${movieName}`, { method: "GET" }).then((response) => response.json()).then((data) => { return data });
    const movieResults = data.results;

    movieResults.length = 6;

    for (let index = 0; index <= 5; index++) {
        removeDivMovie()
        const movie = movieResults[index];

        movieId = movie.id;
        moviePoster = movie.poster_path;
        movieTitle = movie.title;
        movieVotes = movie.vote_average;

        createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies);
    }
};

function searchNovie() {
    const input = document.querySelector('.input');

    input.addEventListener('keypress', ({ key, target }) => {
        if (key === 'Enter') {
            const movieName = target.value;
            loadSearchMovie(movieName)
            target.value = "";
        };
    });
}

function createDivMovie(movieId, moviePoster, movieTitle, movieVotes, movies) {
    const img = moviePoster;
    const divMovie = document.createElement('div');
    const divMovieInfo = document.createElement('div');
    const spanMovieTitle = document.createElement('span');
    const spanMovieRating = document.createElement('span');
    const imgStar = document.createElement('img')

    spanMovieTitle.textContent = movieTitle;
    spanMovieRating.textContent = movieVotes;
    divMovie.style.backgroundImage = `url(${img})`;
    imgStar.src = "./assets/estrela.svg"

    divMovie.appendChild(divMovieInfo);
    divMovieInfo.appendChild(spanMovieTitle);
    divMovieInfo.appendChild(spanMovieRating);
    divContainer.appendChild(divMovie);
    spanMovieRating.appendChild(imgStar);
    movies.appendChild(divMovie);

    divMovie.classList.add('movie');
    divMovieInfo.classList.add('movie__info');
    spanMovieTitle.classList.add('movie__title');
    spanMovieRating.classList.add('movie__rating');

    movies.appendChild(divMovie)

    divMovie.addEventListener('click', () => {
        const id = movieId;

        async function loadModalInfo() {
            const modalTitle = document.querySelector('.modal__title');
            const modalImg = document.querySelector('.modal__img');
            const modalDescription = document.querySelector('.modal__description');
            const modalVotes = document.querySelector('.modal__average');

            const data = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/' + `${id}` + '?language=pt-BR', { method: "GET" }).then((response) => response.json()).then((data) => { return data });
            const { backdrop_path, title, vote_average, genres, release_date, overview } = data;

            modalTitle.textContent = title;
            modalImg.src = backdrop_path.toString();
            modalDescription.textContent = overview;
            modalVotes.textContent = vote_average.toFixed(1);
        }

        loadModalInfo()

        hidden.style.display = 'flex'
    });

};

function removeDivMovie() {
    const divMovie = document.querySelector('.movie');
    divMovie.remove()
};


async function loadHighLightMovies() {
    const data = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR', { method: "GET" }).then((response) => response.json()).then((data) => { return data });
    const video = await fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR', { method: "GET" }).then((response) => response.json()).then((data) => { return data.results });
    const { backdrop_path, title, vote_average, genres, release_date, overview } = data;
    const key = video[0].key

    highLightMovie(backdrop_path, title, vote_average, genres, release_date, overview, key);
}

function highLightMovie(backdrop_path, title, vote_average, genres, release_date, overview, key) {
    const highLightVideo = document.querySelector('.highlight__video');
    const hightLightTitle = document.querySelector('.highlight__title');
    const hightLightVote = document.querySelector('.highlight__rating');
    const highLightGenre = document.querySelector('.highlight__genres');
    const highLightLaunch = document.querySelector('.highlight__launch');
    const hightLightDescription = document.querySelector('.highlight__description');
    const videoLink = document.querySelector('.highlight__video-link')
    const img = backdrop_path

    highLightVideo.style = `
    background-image:  url(${img});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    `;

    const genreName = []

    genres.forEach(genre => {
        genreName.push(genre.name);
    });

    const dateLaunch = new Date(release_date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    });

    hightLightTitle.textContent = title
    hightLightVote.textContent = vote_average.toFixed(1);
    highLightGenre.textContent = genreName.join(',');
    highLightLaunch.textContent = `/ ${dateLaunch}`;
    hightLightDescription.innerText = overview;
    videoLink.href = `https://www.youtube.com/watch?v=${key}`;
};

function modalClickClose() {
    modalClose.addEventListener('click', () => {
        hidden.style.display = 'none'
    });
};

function modalSelfClose() {
    modal.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}

loadInfoMovies();
loadHighLightMovies();
modalSelfClose();
modalClickClose();
searchNovie();



