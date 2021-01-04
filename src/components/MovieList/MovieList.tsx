import { useEffect, useRef } from "react";
import { Button, Tooltip } from "@material-ui/core";
import "./MovieList.scss";
import MovieCard from "../MovieCard/MovieCard";
import {
  ArrowLeft as ArrowLeftButton,
  ArrowRight as ArrowRightButton,
  Delete as DeleteIcon 
} from '@material-ui/icons';
import { IconButton } from "@material-ui/core";

interface MovieListProps {
  title: string;
  movies: Array<MovieType>;
  hidden?: boolean;

  /**
   * If true, the number of movies will be displayed 
   */
  showElementsNumber?: boolean;
  nominate: (movie: MovieType) => void;
  removeNomination: (movie: MovieType) => void;
  isNominated: (movie: MovieType) => boolean;
  clearNominations: () => void;
}

const MovieList = ({
  title,
  showElementsNumber = false,
  movies,
  hidden,
  nominate,
  removeNomination,
  isNominated,
  clearNominations
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
    <div className={hidden ? "hidden-list" : "movie-list"}>
      <div className="polygon-shadow">
        <div className="polygon">
          {showElementsNumber 
            ? (
                <>
                  <div className={movies.length < 5 ? "text" : "text-green"}>{movies.length}</div>
                  <div className="divider" />
                  <div className="text">{title}</div>
                  <div className="divider" />
                  <Tooltip placement="right-start" title="Clear all nominations">
                    <IconButton onClick={() => clearNominations()}>
                      <DeleteIcon style={{ color: "#ffffff" }} />
                    </IconButton>
                  </Tooltip>
                </>
              ) 
            : <div className="text">{title}</div>
          }
        </div>
      </div>
      <div className="button-container">
        <div className={title === "Nominations" && movies.length === 5 ? "big-container" : "items-container"} ref={scrollRef}>
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
