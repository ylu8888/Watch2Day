import React, {useEffect, useState} from 'react';
import MovieList from './components/MovieList';
import Heading from './components/Heading';
import Search from './components/Search';
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
 
 

 return(
  <div className='container-fluid movie-app'>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <Heading heading="watch2day"/>
      <Search search={search} setSearch={setSearch}/>
    </div>
    <div className='row'>
      <MovieList movies = {movies}/>
    </div>
    

  </div>
 );

}


export default App;
