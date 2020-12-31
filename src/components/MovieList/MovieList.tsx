import * as React from 'react';
import './MovieList.scss';

interface MovieListProps{
  showElementsNumber?: boolean,
  itemList: Array<MovieType>
}

const MovieList = ({ showElementsNumber = false, itemList }: MovieListProps) => {
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
                  4
                </div>
              </>
            : null 
          }
        </div>
      </div>
      <div className="items-container">
        {
          itemList.map((item) => (
            // TODO Add MovieItem component here
            <div>
              Item
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MovieList;