import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies || movies.length === 0) return null;
  return (
    <ul className={css.grid}>
      {movies.map((movie) => {
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        return (
          <li key={movie.id} onClick={() => onSelect(movie)}>
            <div className={css.card}>
              <img
                className={css.image}
                src={imageUrl}
                alt={movie.title}
                loading="lazy"
              />
              <h2 className={css.title}>{movie.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default MovieGrid;
