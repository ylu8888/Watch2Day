import React, {useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import Heading from './components/Heading';
import Search from './components/Search';
import AddFavs from './components/AddFavs';
import RemoveFavs from './components/RemoveFavs';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const key = '7283eef1';

  //movies, search, query state variables
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  //async operation to reduce overall processing time by running other parts of code while API fetches data
 const getMovies = async () => { //await pauses this function while data is fetched.
  const response = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=${key}`);
  const data = await response.json(); //turn response to json and store in data

  if(data.Search){ // "Search" is an Omdb API array that true if a query matches any movies
    setMovies(data.Search); //movie data is stored in movies state
    
  }
   
 };

 //useEffect hook always gets called on the first render when the page loads
//when the search state changes, useEffect hook runs getMovies to fetch from API
useEffect(() => { 
  getMovies(search);
}, [search]);

useEffect(() => {
  const movieFavs = JSON.parse( //favorites stored in object 'movieFavs'
    localStorage.getItem('react-movie-app-favorites')
  );
  
  if(movieFavs){ //prevent null mapping error
    setFavorites(movieFavs);
  }
  
}, []);

const saveStorage = (items) => {
  localStorage.setItem('react-movie-app-favorites', JSON.stringify(items)) //need a key to save and retrieve items from local storage
  
}

const addFavMovie = (movie) => {
  const newFavList = [...favorites, movie]; //create new array with new added fav
  setFavorites(newFavList); //update state with new favorite movies
  saveStorage(newFavList); //save fav movies to local storage
}

const removeFavMovie = (movie) => {
  const newFavList = favorites.filter( //when remove is clicked, the movie is filtered out the array
    (favorite) => favorite.imdbID !== movie.imdbID //every movie has a API imdb ID
    );

    setFavorites(newFavList);
    saveStorage(newFavList); //change local storage when remove fav

}


 return( 
  
  <div className='container-fluid movie-app'> {/* bootstrap to create rows of movies after searching*/}
    <div className='row d-flex align-items-center mt-4 mb-1'>

      <Heading heading="Watch2Day"/>
      <Search search={search} setSearch={setSearch}/> {/* passing state data as prop for Search component */}
    </div>

    <div className='row'>
      <MovieList 
      movies = {movies} //passing in the movies state data as prop, to render actual movie posters from the MovieList component
      favClick={addFavMovie} 
      FavComp={AddFavs}/>
    </div>
    
    {/* Since we have heading and movielist components, we can just repeat it again for convenience*/}
    <div className='row d-flex align-items-center mt-4 mb-1'>
      <Heading heading="Watchlist"/> 
      
    </div>

    <div className='row'>
      <MovieList 
      movies = {favorites}
      favClick={removeFavMovie} 
      FavComp={RemoveFavs}/>  {/*a component can be passed as a prop to another component*/}
    </div>
    

  </div>
 );

}


export default App;
