import classes from './Card.module.css';
import { Link } from 'react-router-dom';
import { Volume } from '../../types';

const Card: React.FC<{ volume: Volume }> = ({ volume }) => {
  return (
    <Link to="/details" className={classes.card}>
      <div>
        <img src={volume.coverLink} alt="cover" />
      </div>
      <p>{volume.engRelease}</p>
      <h3>{`${volume.volume} ${volume.engVolumeName}`}</h3>
    </Link>
  );
};

export default Card;
