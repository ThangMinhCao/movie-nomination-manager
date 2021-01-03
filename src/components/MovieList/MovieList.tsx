import { useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import "./MovieList.scss";
import MovieCard from "../MovieCard/MovieCard";
import {
  ArrowLeft as ArrowLeftButton,
  ArrowRight as ArrowRightButton,
} from '@material-ui/icons';

interface MovieListProps {
  title: string;
  movies: Array<MovieType>;

  /**
   * If true, the number of movies will be displayed 
   */
  showElementsNumber?: boolean;
  nominate: (movie: MovieType) => void;
  removeNomination: (movie: MovieType) => void;
  isNominated: (movie: MovieType) => boolean;
}

const MovieList = ({
  title,
  showElementsNumber = false,
  movies,
  nominate,
  removeNomination,
  isNominated,
}: MovieListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  /**
   * Set the property "--colNum" by the number of movies to use in SASS file
   */
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--colNum",
      movies.length.toString()
    );
  });

  /**
   * Scroll the movie list toward the given direction by 70% of whe window width
   * @param dir "left" | "right"
   */
  const scroll = (dir: string) => {
    if (dir === "left" && scrollRef.current) {
      scrollRef.current.scrollLeft -= window.innerWidth * 0.7;
    } else if (dir === "right" && scrollRef.current) {
      scrollRef.current.scrollLeft += window.innerWidth * 0.7;
    }
  };

  return (
    <div className="movie-list">
      <div className="polygon-shadow">
        <div className="polygon">
          <div className="text">{title}</div>
          {showElementsNumber ? (
            <>
              <div className="divider" />
              <div className={movies.length < 5 ? "text" : "text-green"}>{movies.length}</div>
            </>
          ) : null}
        </div>
      </div>
      <div className="button-container">
        <div className="items-container" ref={scrollRef}>
          {movies.map((item, index) => (
            <MovieCard
              nominated={isNominated(item)}
              key={index}
              movie={item}
              nominate={nominate}
              removeNomination={removeNomination}
            />
          ))}
          <div style={{ flexShrink: 0, width: "0.1px" }} />
        </div>
        <Button className="left-button" onClick={() => scroll("left")}>
          <ArrowLeftButton className="arrow-left-icon" />
        </Button>
        <Button className="right-button" onClick={() => scroll("right")}>
          <ArrowRightButton className="arrow-right-icon" />
        </Button>
      </div>
    </div>
  );
};

export default MovieList;
