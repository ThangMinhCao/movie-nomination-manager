import { url } from 'inspector';
import './MovieCard.scss';

interface MovieCardProps {
  title: string,
  year: number,
  posterURL: string,
  added?: boolean
}

const MovieCard = ({ title, year, posterURL, added }: MovieCardProps) => {
  return (
    <div className="movie-card" style={{ backgroundImage: `url(${posterURL})` }} >
      <div className="hover-overlay">
        
      </div>
    </div>
  )
}

export default MovieCard;