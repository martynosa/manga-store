import classes from './Info.module.css';
// typescript
import { IVolume } from '../../../../typescript/interfaces';

interface IProps {
  addToCartHandler: (volume: IVolume) => void;
  volume: IVolume;
}

const Info: React.FC<IProps> = ({ volume, addToCartHandler }) => {
  return (
    <div className={classes.info}>
      <h2>
        Vol. <span>{volume.volume}</span>
      </h2>
      <p>
        Price: <span>US$ {volume.price}</span>
      </p>
      <img src={volume.coverLink}></img>

      <p>
        <span>Western release: </span>
        {volume.engRelease}
      </p>
      <p>
        <span>Japanese release: </span> {volume.japRelease}
      </p>

      <button onClick={() => addToCartHandler(volume)}>add to cart</button>
    </div>
  );
};
export default Info;
