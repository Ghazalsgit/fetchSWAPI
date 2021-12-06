/* Empty array to fill with the movies when fetched successfully */
let movies = []; 
//Making the modal a variable for easy access 
const modal = document.getElementById("modal");
// setting the loader gif the default value for both cards and main page
document.getElementById("characters-container").innerHTML = `<img src="/img/loader.gif">`;
document.querySelector("#movie-card").innerHTML = `<img src="/img/loader.gif">`;

/* getFilms function fetches all the movies from the API and with the json()-method
writes json code to javascript. The function will not "move on" to the next line if
the line with "await" is not executed correctly*/
async function getFilms() {
  try {
    const res = await fetch("https://swapi.dev/api/films/");
    let data = await res.json();
    const films = data.results;
    //mapping the movies and pushing each to the movies array
    films.map((film) => {
      movies.push(film);
    });
    //Whenever the movies are fetches then the cards will render
    if (movies.length > 1) {
      renderCards();
    }
    //If anything goes wrong, console the error
  } catch (error) {
    console.log(error);
  }
}
/* The function will fetch a list av URLs that were fetched in the function abow.
Promise all will fetch several URLs at the same time */
const getCharacters = async (index) => {
  const persons = await Promise.all(
    movies[index].characters.map((url) => fetch(url).then((res) => res.json()))
  );
  //mapping out every perons name in a correct alphabetical order
  document.getElementById("characters-container").innerHTML = persons
    .map((person) => `<p>${person.name}</p>`)
    .sort()
    .join("");
};
/* mapping out every single movie fron the movies array and giving each movie a eventlister
that will run the funcion cardsEventlistner when clicked. It will also show the movie title
and relase date on the card*/
const renderCards = () => {
  const movieCard = document.querySelector("#movie-card");
  //passing the movie index so that when clicked on a movie the characters of that specifik movie will show up
  movieCard.innerHTML = movies
    .map(
      (film, i) =>
        `<div onclick ="cardsEventlistner(${i})" class="movieHolder"><h1>${film.title}</h1>
    <p>${film.release_date}</p></div>`
    )
    .sort()
    .join("");
};
/* Displaying the modal when the card is being clicked and showing the title and the
characters of the movie*/
const cardsEventlistner = (index) => {
  modal.style.display = "flex";
  document.getElementById("title").innerHTML = `${movies[index].title}`;
  getCharacters(index);
};
// closing the modal when clicked on the button 
const closeCardModal = () => {
  modal.style.display = "none";
};
//calling the function to fetch the movies
getFilms();
