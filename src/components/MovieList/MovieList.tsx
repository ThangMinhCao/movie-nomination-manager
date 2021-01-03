import { useEffect, useRef } from "react";
import "./MovieList.scss";
import MovieCard from "../MovieCard/MovieCard";

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
      <button onClick={() => scroll("left")}>Left</button>
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
      <button onClick={() => scroll("right")}>Right</button>
    </div>
  );
};

export default MovieList;
