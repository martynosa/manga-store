import { useEffect } from 'react';
import classes from './Cart.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, volumesActions } from '../../../redux/reduxStore';
// firebase
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
// typescript
import { IVolume } from '../../../typescript/interfaces';
// components
import CartItem from './CartItem/CartItem';
import List from '../../Common/List/List';
// helpers
import { cartItemModifier } from '../../../helpers/cartItemModifier';
import { totalPriceReducer } from '../../../helpers/totalPriceReducer';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const volumes = useSelector((state: RootState) => state.volumes);

  const dispatch = useDispatch();

  const fullCart = cartItemModifier(volumes, cart);
  const totalPrice = totalPriceReducer(fullCart);

  useEffect(() => {
    // naruto arg hardcoded for now
    const storeRef = collection(db, 'store', 'naruto', 'volumes');
    const volumesArray: IVolume[] = [];

    getDocs(storeRef)
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = { ...volumeSnap.data() };
          volumesArray.push(volume as IVolume);
        });
        dispatch(volumesActions.initialize(volumesArray));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className={classes['cart-section']}>
      {auth.user && (
        <h1
          className={classes['page-title']}
        >{`${auth.user?.displayName}'s cart`}</h1>
      )}
      <div className={classes.content}>
        <List>
          {fullCart.map((c) => (
            <CartItem cartItem={c} key={c.id} />
          ))}
        </List>
        <div className={classes['shipping-address']}>shipping address</div>
        <p>US$ {totalPrice.toFixed(2)}</p>
      </div>
    </section>
  );
};
export default Cart;
