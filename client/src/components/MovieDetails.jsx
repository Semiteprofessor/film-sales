import React, { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";
import StarRating from "./StartRating";
import Button from "./Button";
import { usePop } from "../contextApi/PopContext";
import PayToWatch from "./PayToWatch";

const KEY = "59ada9b8";

const paymentReference = localStorage.getItem("payment_reference");

const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watchedMovies,
}) => {
  const { openPay } = usePop();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watchedMovies.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title,
      Year,
      Poster,
      imdbRating: Number(imdbRating),
      Runtime: Number(Runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const callback = (event) => {
      if (event.code === "Escape") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );

      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!Title) return;
    document.title = `Movie - ${Title}`;

    return () => {
      document.title = "usePopCorn";
    };
  }, [Title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of ${movie} movie`} height={300} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>
                <span>⭐</span>
                <span>{imdbRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{Runtime}</span>
              </p>
              <p>
                <span>🎥</span>
                <span>{Genre}</span>
              </p>
            </div>
          </header>
        </>
      )}
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />
              {userRating > 0 && (
                <button className="add-btn" onClick={handleAdd}>
                  + Add to List
                </button>
              )}
            </>
          ) : (
            <p>
              You rated this movie {watchedUserRating}
              <span>⭐</span>
            </p>
          )}
        </div>
        <p>
          <em>{Plot}</em>
        </p>
        <p>Starring: {Actors}</p>
        <p>Directed by {Director}</p>

        {!paymentReference ? (
          <Button>Pay To Watch</Button>
        ) : (
          <Button>Watch Now</Button>
        )}
        {openPay && <PayToWatch />}
      </section>
    </div>
  );
};

export default MovieDetails;
