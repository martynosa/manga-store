import classes from './Cart.module.css';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
// components
import CartItem from './CartItem/CartItem';
import List from '../../Common/List/List';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <section className={classes['cart-section']}>
      {auth.user && (
        <h1
          className={classes['page-title']}
        >{`${auth.user?.displayName}'s cart`}</h1>
      )}
      <div className={classes.content}>
        <List>
          {cart.map((c) => (
            <CartItem cartItem={c} key={c.id} />
          ))}
        </List>
        <div className={classes['shipping-address']}>shipping address</div>
      </div>
    </section>
  );
};
export default Cart;
