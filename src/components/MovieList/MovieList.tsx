import { useEffect, useRef } from 'react';
import './MovieList.scss';
import MovieCard from '../MovieCard/MovieCard';

interface MovieListProps{
  showElementsNumber?: boolean,
  itemList: Array<MovieType>
}

const MovieList = ({ showElementsNumber = false, itemList }: MovieListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--colNum", itemList.length.toString());
  })

  const scroll = (dir: string) => {
    if (dir === 'left' && scrollRef.current) {
      scrollRef.current.scrollLeft -= window.innerWidth * 0.8;
    } else if (dir === 'right' && scrollRef.current) {
      scrollRef.current.scrollLeft += window.innerWidth * 0.8;
    }
  }

  return (
    <div className="movie-list">
      <div className="polygon-shadow">
        <div className="polygon">
          <div className="text">
            Results
          </div>
          {showElementsNumber 
            ? <> 
                <div className="text">
                  |
                </div>
                <div className="text">
                  {itemList.length}
                </div>
              </>
            : null 
          }
        </div>
      </div>
      {/* TODO Change styles of these buttons */}
      <button onClick={() => scroll('left')}>
        Left
      </button>
        <div className="items-container" ref={scrollRef}>
          {
            itemList.map((item, index) => (
              // TODO Add MovieItem component here
              <MovieCard key={index} title={item.title} year={item.year} posterURL={item.posterURL} />
            ))
          }
        </div>
      <button onClick={() => scroll('right')}>
        Right 
      </button>
    </div>
  )
}

export default MovieList;