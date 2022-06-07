const API_KEY = '89f4321a-db93-4655-85ed-fdaed3dfa5d7';
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=';
const API_URL_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_URL_VIDEO = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const API_URL_PREMIER = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=';

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });
  const responseData = await response.json();
  showMovies(responseData);
}

// async function getInfo(url) {
//   const response = await fetch(url, {
//     headers: {
//       'Content-Type': 'application/json',
//       'X-API-KEY': API_KEY,
//     },
//   });
//   const responseData = await response.json();
// }

function pagination(e) {
  e.preventDefault();
  if (e.target.classList.contains('button')) {
    // console.log(e.target.value);
    getMovies(`${API_URL_POPULAR}${e.target.value}`);
  }
}

function getClassByRate(rate) {
  if (rate >= 7) {
    return 'green';
  } if (rate >= 5) {
    return 'orange';
  }
  return 'red';
}

function showMovies(data) {
  const moviesEl = document.querySelector('.movies');
  document.querySelector('.movies').innerHTML = '';

  data.films.forEach((movie) => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `    
        <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}">
          <div class="movie__cover-darkened"></div>
        </div>
        <div class="movie_info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__genre">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>          
          <div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>  
        </div>
      `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.getElementById('searchId');
const search = document.querySelector('.header__search');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = '';
  }
});

// const form1 = document.getElementById('searchPremierId');
// const search1 = document.querySelector('.header__searchPremier');
// form1.addEventListener('submit', (event) => {
//   event.preventDefault();
//   // console.log(search1);
//   const apiSearchUrl1 = `${API_URL_PREMIER}${search1.value}`;
//   if (search1.value) {
//     getMovies(apiSearchUrl1);
//     search1.value = '';
//   }
// });

// const form1 = document.getElementById('showPremier');
// const premierBtn = document.querySelector('.premierBtn');
// premierBtn.addEventListener('click', (event) => {
//   event.preventDefault();
//   console.log('sdfsd');
//   // const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
//   // if (search.value) {
//   //   getMovies(apiSearchUrl);
//   //   search.value = '';
//   // }
// });

// function showPremier(eve) {
//   eve.preventDefault();
//   if (eve.target.classList.contains('premierBtn')) {
//     console.log('dfkjskj');
//   }
// }

// async function showVideo(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('movie__fav')) {
//     // console.log(e.target.dataset.id);
//     const id = { id: e.target.dataset.id };
//     console.log(id);
//     const aaa = await fetch(`${API_URL_VIDEO}${id.id}/videos`, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-API-KEY': API_KEY,
//       },
//     });
//     const b = await aaa.json();
//     console.log(b);
//     fetch('http://localhost:3000/showTrailer', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'Application/json',
//       },
//       body: JSON.stringify({ b }),
//     });
//     window.location = '/showTrailer';
//    }
// }

// function movieInfo(e) {
//   e.preventDefault();
//   if (e.target.classList.contains('movie__info')) {
//     // console.log(e.target.dataset.id);
//     const id = {
//       id: e.target.dataset.id,
//     };
//     fetch(https://kinopoiskapiunofficial.tech/api/v2.2/films/, {
//       // method: '',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }

// document.querySelector('.movies')?.addEventListener('click', movieInfo);
document.querySelector('.pagiStr')?.addEventListener('click', pagination);
document.querySelector('.showPremier')?.addEventListener('click', showPremier);
