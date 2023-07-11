import React from 'react';

//App component passes state data to this component, taking in prop as input

const MovieList = (props) => {// props/properties variable name for the movies
    const FavComp = props.FavComp;
    return(
        <>
            {props.movies.map((movie, index)=> //mapping over array of movies
            <div className="image-container d-flex justify-content-start m-3">
                <img className="poster" src={movie.Poster} alt="poster"></img>
                <div onClick={() => props.favClick(movie)}className="overlay d-flex align-items-center justify-content-center">
                    <FavComp/>
                </div>

            </div>)}
        </>
    );

} 

export default MovieList;