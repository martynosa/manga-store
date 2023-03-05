import classes from './CartItem.module.css';
// typescript
import { ICartItem } from '../../../../typescript/interfaces';

const CartItem: React.FC<{ cartItem: ICartItem }> = ({ cartItem }) => {
  return (
    <div className={classes['cart-item']}>
      <p>{cartItem.quantity}</p>
      <p>{cartItem.id}</p>
    </div>
  );
};
export default CartItem;
