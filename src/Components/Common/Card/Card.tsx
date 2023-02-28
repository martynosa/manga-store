import classes from './Card.module.css';
import { Link } from 'react-router-dom';
import { IVolume } from '../../../types/manga';

const Card: React.FC<{ volume: IVolume }> = ({ volume }) => {
  return (
    <Link
      to={`/store/${volume.manga}/${volume.volume}`}
      className={classes.card}
    >
      <div>
        <img src={volume.coverLink} alt="cover" />
      </div>
      <p>{volume.engRelease}</p>
      <h3>{`${volume.volume} ${volume.engVolumeName}`}</h3>
    </Link>
  );
};

export default Card;
