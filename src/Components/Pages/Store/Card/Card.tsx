import { Link } from 'react-router-dom';
import classes from './Card.module.css';
// typescript
import { IVolume } from '../../../../typescript/interfaces';

const Card: React.FC<{ volume: IVolume }> = ({ volume }) => {
  return (
    <Link
      to={`/store/${volume.manga}/${volume.volume}`}
      className={classes.card}
    >
      <img src={volume.coverLink} alt="cover" />
      <p>
        <span>{volume.volume}</span> {volume.engVolumeName}
      </p>
    </Link>
  );
};

export default Card;
