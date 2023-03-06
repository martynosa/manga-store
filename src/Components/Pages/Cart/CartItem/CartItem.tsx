import classes from './CartItem.module.css';
// typescript
import { ICartItem } from '../../../../typescript/interfaces';

const CartItem: React.FC<{ cartItem: ICartItem }> = ({ cartItem }) => {
  if (cartItem.volume) {
    return (
      <div className={classes['cart-item']}>
        <img src={cartItem.volume.coverLink} alt="cover" />
        <div className={classes.content}>
          <div className={classes.details}>
            <p>Vol. {cartItem.volume?.volume}</p>
            <p>{cartItem.volume?.engVolumeName}</p>
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
          <div className={classes.buttons}>
            <button className="minus-one">- 1</button>
            <button className="plus-one">+ 1</button>
          </div>
        </div>
      </div>
    );
  }
  return <p>No data.</p>;
};
export default CartItem;
