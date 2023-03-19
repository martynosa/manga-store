import classes from './Info.module.css';
// typescript
import { IVolume } from '../../../../typescript/interfaces';

interface IProps {
  addToCartHandler: (volume: IVolume) => void;
  volume: IVolume;
  isAddToCartLoading: boolean;
}

const Info: React.FC<IProps> = ({
  volume,
  addToCartHandler,
  isAddToCartLoading,
}) => {
  return (
    <div className={classes.info}>
      <h2>
        Vol. <span>{volume.volume}</span>
      </h2>
      <p>
        Price: <span>${volume.price}</span>
      </p>
      <img src={volume.coverLink}></img>

      <p>
        <span>Western release: </span>
        {volume.engRelease}
      </p>
      <p>
        <span>Japanese release: </span> {volume.japRelease}
      </p>
      {isAddToCartLoading ? (
        <button className="disabled" disabled={isAddToCartLoading}>
          Loading...
        </button>
      ) : (
        <button onClick={() => addToCartHandler(volume)}>add to cart</button>
      )}
    </div>
  );
};
export default Info;
