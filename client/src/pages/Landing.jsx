import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import Search from "../components/Search";
import Result from "../components/Result";
import Main from "../components/Main";
import Box from "../components/Box";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";
import ErrorMessage from "../components/ErrorMessage";
import MovieDetails from "../components/MovieDetails";
import WatchedSummary from "../components/WatchedSummary";
import WatchedMoviesList from "../components/WatchedMoviesList";
import Notification from "../components/Notification";

export const average = (arr) => {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
};

export const logo =
  "https://static.vecteezy.com/system/resources/thumbnails/030/347/569/small_2x/ai-generated-image-of-delicious-popcorn-on-a-transparent-background-free-png.png";

const KEY = "59ada9b8";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWateched = (movie) => {
    const watched = setWatchedMovies((watchedMovies) => [
      ...watchedMovies,
      movie,
    ]);

    // localStorage.setItem("watched", JSON.stringify([...watchedMovies, movie]));
    if (watched) {
      toast.error("Add movie failed!");
    } else {
      toast.success("Movie added successfully!");
    }
  };

  const handleDeleteWatched = (id) => {
    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([...watchedMovies]));
  }, [watchedMovies]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (error) {
        console.log(error.message);

        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Result movies={movies} />
      </NavBar>
      <Main>
        {/* <Box> {isLoading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWateched}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <WatchedSummary watchedMovies={watchedMovies} />
              <WatchedMoviesList
                watchedMovies={watchedMovies}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
        <Notification />
      </Main>
    </>
  );
};

export default Landing;
