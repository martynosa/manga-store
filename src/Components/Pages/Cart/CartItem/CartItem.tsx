import classes from './CartItem.module.css';
// typescript
import { ICartItem, IVolume } from '../../../../typescript/interfaces';

interface IProps {
  cartItem: ICartItem;
  addToCartHandler: (volume: IVolume) => void;
  removeFromCartHandler: (volume: IVolume) => void;
  isAddToCartLoading: boolean;
  isRemoveFromCartLoading: boolean;
}

const CartItem: React.FC<IProps> = ({
  cartItem,
  addToCartHandler,
  removeFromCartHandler,
  isAddToCartLoading,
  isRemoveFromCartLoading,
}) => {
  const removeFromCartButton = isRemoveFromCartLoading ? (
    <button className="disabled" disabled={isRemoveFromCartLoading}>
      - 1
    </button>
  ) : (
    <button
      className="minus-one"
      onClick={() => removeFromCartHandler(cartItem.volume!)}
    >
      - 1
    </button>
  );

  const addToCartButton = isAddToCartLoading ? (
    <button className="disabled" disabled={isAddToCartLoading}>
      + 1
    </button>
  ) : (
    <button
      className="plus-one"
      onClick={() => addToCartHandler(cartItem.volume!)}
    >
      + 1
    </button>
  );

  if (cartItem.volume) {
    return (
      <div className={classes['cart-item']}>
        <img src={cartItem.volume.coverLink} alt="cover" />
        <div className={classes.content}>
          <div className={classes.details}>
            <p>Vol. {cartItem.volume.volume}</p>
            <p>{cartItem.volume.engVolumeName}</p>
            <p>
              <span>Price: </span>${cartItem.volume.price}
            </p>
          </div>
          <div className={classes.price}>
            <p>Total:</p>
            <p>
              {cartItem.quantity} x {cartItem.volume.price}
            </p>
            <p>=</p>
            <p>${(cartItem.quantity * cartItem.volume.price).toFixed(2)}</p>
          </div>
          <div className={classes['button-group']}>
            {removeFromCartButton}
            {addToCartButton}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes['cart-item']}>
      <p className={classes['error']}>Volume not found.</p>
    </div>
  );
};
export default CartItem;
