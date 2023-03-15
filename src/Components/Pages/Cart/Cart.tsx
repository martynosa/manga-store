import { useEffect } from 'react';
import classes from './Cart.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  cartActions,
  modalActions,
  RootState,
  volumesActions,
} from '../../../redux/reduxStore';
// firebase
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
// typescript
import { IShippingAddress, IVolume } from '../../../typescript/interfaces';
// components
import CartItem from './CartItem/CartItem';
import List from '../../Common/List/List';
import Order from './Order/Order';
// helpers
import {
  cartItemCountReducer,
  cartItemModifier,
  totalPriceReducer,
} from '../../../helpers/cartReducers';

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const volumes = useSelector((state: RootState) => state.volumes);

  const dispatch = useDispatch();

  const fullCart = cartItemModifier(volumes, cart);
  const totalPrice = totalPriceReducer(fullCart);
  const cartItemCount = cartItemCountReducer(cart);

  const addToCartHandler = async (volume: IVolume) => {
    if (auth.user) {
      const cartItemRef = doc(db, 'users', auth.user.id, 'cart', volume.id);
      // increments item's quantity
      const cartItemSnap = await getDoc(cartItemRef);
      if (cartItemSnap.exists()) {
        await updateDoc(cartItemRef, {
          quantity: increment(1),
        });
        dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
        return;
      }

      // adds the item to the cart
      await setDoc(cartItemRef, { quantity: 1 });
      dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
      return;
    }
    dispatch(modalActions.open('signin'));
  };

  const removeFromCartHandler = async (volume: IVolume) => {
    if (auth.user) {
      const cartItemRef = doc(db, 'users', auth.user.id, 'cart', volume.id);
      // deletes the item if quantity's lower than 1
      const cartItemSnap = await getDoc(cartItemRef);
      if (cartItemSnap.exists()) {
        const cartItemQuantity = cartItemSnap.data().quantity;
        if (cartItemQuantity <= 1) {
          await deleteDoc(cartItemRef);
          dispatch(cartActions.remove({ id: volume.id, quantity: 1 }));

          return;
        }
      }

      // decerements item's quantity
      await updateDoc(cartItemRef, {
        quantity: increment(-1),
      });
      dispatch(cartActions.remove({ id: volume.id, quantity: 1 }));
    }
  };

  useEffect(() => {
    // volumes
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

    // shipping address
    if (auth.user) {
      const userShippingAddressRef = doc(db, 'users', auth.user.id);

      getDoc(userShippingAddressRef)
        .then((shippingAddressSnap) => {
          if (shippingAddressSnap.exists()) {
            const shippingAddress =
              shippingAddressSnap.data() as IShippingAddress;
            dispatch(authActions.setShippingAddress(shippingAddress));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <section className={classes['cart-section']}>
      {auth.user && (
        <h1
          className={classes['page-title']}
        >{`${auth.user.displayName}'s cart`}</h1>
      )}
      <div className={classes['content-grid']}>
        <List>
          {fullCart.map((c) => (
            <CartItem
              cartItem={c}
              key={c.id}
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
        </List>
        <Order totalPrice={totalPrice} cartItemCount={cartItemCount} />
      </div>
    </section>
  );
};
export default Cart;
