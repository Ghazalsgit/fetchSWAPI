let movies = [];
const modal = document.getElementById("modal");
document.getElementById("characters-container").innerHTML = `<img src="/img/loader.gif">`;
document.querySelector("#movie-card").innerHTML = `<img src="/img/loader.gif">`;


async function getFilms() {
  try {
    const res = await fetch("https://swapi.dev/api/films/");
    let data = await res.json();
    const films = data.results;
    films.map((film) => {
      movies.push(film);
    });
    if (movies.length > 1) {
      renderCards();
    }
  } catch (error) {
    console.log(error);
  }
}
const getCharacters = async (index) => {
  const persons = await Promise.all(
    movies[index].characters.map((url) => fetch(url).then((res) => res.json()))
  );
  document.getElementById("characters-container").innerHTML = persons
    .map((person) => `<p>${person.name}</p>`)
    .sort()
    .join("");
};

const renderCards = () => {
  const movieCard = document.querySelector("#movie-card");
  movieCard.innerHTML = movies
    .map(
      (film, i) =>
        `<div onclick ="cardsEventlistner(${i})" class="movieHolder"><h1>${film.title}</h1>
    <p>${film.release_date}</p></div>`
    )
    .sort()
    .join("");
};

const cardsEventlistner = (index) => {
  modal.style.display = "flex";
  document.getElementById("title").innerHTML = `${movies[index].title}`;
  getCharacters(index);
};

const closeCardModal = () => {
  modal.style.display = "none";
};

getFilms();
