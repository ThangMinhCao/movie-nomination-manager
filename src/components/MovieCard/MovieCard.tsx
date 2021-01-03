import { forwardRef } from "react";
import './MovieCard.scss';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

interface MovieCardProps {
  movie: MovieType,
  added?: boolean,
  nominate: (movie: MovieType) => void,
  removeNomination: (movie: MovieType) => void,
}

const MovieCard = ({ movie, added, nominate, removeNomination }: MovieCardProps) => {
  const { title, year, posterURL } = movie;
  const splitName = title.split(':');
  return (
    <div className="movie-card" style={{ backgroundImage: `url(${posterURL})` }} >
      <div className={Boolean(posterURL) ? "hover-overlay" : "missing-poster-overlay"}>
        <div className="movie-year">
          {year}
        </div>
        <div className="movie-title">
          <span className="title">
            {splitName[0] + (splitName.length > 1 ? ':' : '')}
          </span>
          {splitName.length <= 1
            ? null
            : <>
                <span className="extension">
                  {splitName[1]}
                </span>
              </>
          }
        </div>
        <IconButton
          className={added ? "button-remove" : "button"}
          onClick={() => added ? removeNomination(movie) : nominate(movie)}
        >
          <AddIcon className="icon" />
        </IconButton>
      </div>
    </div>
  )
}

export default MovieCard;