import "./MovieCard.scss";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const noPoster =
  "https://upload.wikimedia.org/wikipedia/commons/c/c2/No_image_poster.png";
interface MovieCardProps {
  movie: MovieType;
  nominated?: boolean;
  nominate: (movie: MovieType) => void;
  removeNomination: (movie: MovieType) => void;
}

const MovieCard = ({
  movie,
  nominated,
  nominate,
  removeNomination,
}: MovieCardProps) => {
  const { Title, Year, Poster } = movie;

  /**
   * Split the title by ":" for some movie titles have it
   */
  const splitName = Title.split(":");

  /**
   * Indicate if the current movie has poster or not
   */
  const hasPoster = () => {
    return Boolean(Poster) && Poster !== "N/A";
  };

  /**
   * Render properly the movie's year and title
   * @param color The color of the text. Default: #ffffff
   */
  const renderInformation = (color?: string) => {
    return (
      <>
        <div className="movie-year" style={{ color }}>{Year}</div>
        <div className="movie-title">
          <span className="title" style={{ color }}>
            {splitName[0] + (splitName.length > 1 ? ":" : "")}
          </span>
          {splitName.length <= 1 ? null : (
            <>
              <span className="extension" style={{ color }}>{splitName[1]}</span>
            </>
          )}
        </div>
      </>
    )
  }

  return (
    <div
      className="movie-card"
      style={{
        backgroundImage: `url(${hasPoster() ? Poster : noPoster})`,
      }}
    >
      <div className={!hasPoster() ? "show-title" : "hidden-title"}>
        {renderInformation("#000000")}
      </div>
      <div className="hover-overlay">
        {renderInformation()}
        <IconButton
          className={nominated ? "button-remove" : "button"}
          onClick={() =>
            nominated ? removeNomination(movie) : nominate(movie)
          }
        >
          <AddIcon className="icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default MovieCard;
