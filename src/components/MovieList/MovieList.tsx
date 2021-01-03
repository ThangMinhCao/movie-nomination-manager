import { useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import "./MovieList.scss";
import MovieCard from "../MovieCard/MovieCard";
import {
  ArrowLeft as ArrowLeftButton,
  ArrowRight as ArrowRightButton,
} from '@material-ui/icons';

interface MovieListProps {
  listName: string;
  showElementsNumber?: boolean;
  itemList: Array<MovieType>;
  nominate: (movie: MovieType) => void;
  removeNomination: (movie: MovieType) => void;
  isNominated: (movie: MovieType) => boolean;
}

const MovieList = ({
  listName,
  showElementsNumber = false,
  itemList,
  nominate,
  removeNomination,
  isNominated,
}: MovieListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--colNum",
      itemList.length.toString()
    );
  });

  const scroll = (dir: string) => {
    if (dir === "left" && scrollRef.current) {
      scrollRef.current.scrollLeft -= window.innerWidth * 0.8;
    } else if (dir === "right" && scrollRef.current) {
      scrollRef.current.scrollLeft += window.innerWidth * 0.8;
    }
  };

  return (
    <div className="movie-list">
      <div className="polygon-shadow">
        <div className="polygon">
          <div className="text">{listName}</div>
          {showElementsNumber ? (
            <>
              <div className="divider" />
              <div className="text">{itemList.length}</div>
            </>
          ) : null}
        </div>
      </div>
      {/* TODO Change styles of these buttons */}
      <div className="button-container">
        <div className="items-container" ref={scrollRef}>
          {itemList.map((item, index) => (
            <MovieCard
              added={isNominated(item)}
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
