import React from "react";

const Movie = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <div className="title">
        <h3>{movie.Title}</h3>
        <div>
          <p>📅 </p>
          <span>{movie.Year}</span>
        </div>
      </div>
    </li>
  );
};

export default Movie;
