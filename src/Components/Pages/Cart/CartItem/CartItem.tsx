import classes from './CartItem.module.css';
// typescript
import { ICartItem, IVolume } from '../../../../typescript/interfaces';

interface IProps {
  cartItem: ICartItem;
  addToCartHandler: (volume: IVolume) => void;
  removeFromCartHandler: (volume: IVolume) => void;
}

const CartItem: React.FC<IProps> = ({
  cartItem,
  addToCartHandler,
  removeFromCartHandler,
}) => {
  if (cartItem.volume) {
    return (
      <div className={classes['cart-item']}>
        <img src={cartItem.volume.coverLink} alt="cover" />
        <div className={classes.content}>
          <div className={classes.details}>
            <p>Vol. {cartItem.volume.volume}</p>
            <p>{cartItem.volume.engVolumeName}</p>
            <p>
              <span>Price: </span>US$ {cartItem.volume?.price}
            </p>
          </div>
          <div className={classes.price}>
            <p>Total:</p>
            <p>
              {cartItem.quantity} x {cartItem.volume.price}
            </p>
            <p>=</p>
            <p>US$ {cartItem.quantity * cartItem.volume.price}</p>
          </div>
          <div className={classes['button-group']}>
            <button
              className="minus-one"
              onClick={() => removeFromCartHandler(cartItem.volume!)}
            >
              - 1
            </button>
            <button
              className="plus-one"
              onClick={() => addToCartHandler(cartItem.volume!)}
            >
              + 1
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <p>No data.</p>;
};
export default CartItem;
