import React from 'react';

//App component passes state data to this component, taking in prop as input

const MovieList = (props) => {// props/properties variable name for the movies
    return(
        <>
            {props.movies.map((movie, index)=> //mapping over array of movies
            <div className="image-container d-flex justify-content-start m-3">
                <img src={movie.Poster} alt="poster"></img>
                <div className="overlay d-flex align-items-center justify-content-center"></div>
            </div>)}
        </>
    );

} 

export default MovieList;