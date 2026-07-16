import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMoviesByQuery } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      if (!searchQuery) return;

      try {
        setIsLoading(true);
        setIsError(false);

        const data = await fetchMoviesByQuery(searchQuery);

        if (!data || data.length === 0) {
          toast.error("No movies found for your request.");
          setMovies([]);
          return;
        }

        setMovies(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadMovies();
  }, [searchQuery]);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setMovies([]);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar onSubmit={handleSearchSubmit} />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {movies.length > 0 && !isLoading && !isError && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
