import { useNavigate } from 'react-router-dom';
import classes from './Card.module.css';
// typescript
import { IVolume } from '../../../../typescript/interfaces';

const Card: React.FC<{ volume: IVolume }> = ({ volume }) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/store/${volume.manga}/${volume.volume}`);
  };

  return (
    <div onClick={onClickHandler} className={classes.card}>
      <img src={volume.coverLink} alt="cover" />
      <p>
        <span>{volume.volume}</span> {volume.engVolumeName}
      </p>
    </div>
  );
};

export default Card;
