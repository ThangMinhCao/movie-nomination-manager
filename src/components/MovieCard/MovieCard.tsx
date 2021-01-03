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
  const { Title, Year, Poster } = movie;
  const splitName = Title.split(":");
  return (
    <div className="movie-card" style={{ backgroundImage: `url(${Poster})` }} >
      <div className={Boolean(Poster) && Poster !== "N/A" ? "hover-overlay" : "missing-poster-overlay"}>
        <div className="movie-year">
          {Year}
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