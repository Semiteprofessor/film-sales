import React from "react";
import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watchedMovies, onDeleteWatched }) => {
  return (
    <ul className="list">
      {watchedMovies?.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
