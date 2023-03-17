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
  addDoc,
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
import Checkout from './Checkout/Checkout';
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

  const modifiedCart = cartItemModifier(volumes, cart);
  const totalPrice = totalPriceReducer(modifiedCart);
  const cartItemCount = cartItemCountReducer(cart);

  const addressError =
    auth.shippingAddress.city === '' ||
    auth.shippingAddress.address === '' ||
    auth.shippingAddress.postCode === '' ||
    auth.shippingAddress.phoneNumber === '';

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

  const checkoutHandler = async () => {
    // checkout validation
    if (!auth.user) {
      dispatch(modalActions.open('signin'));
      return;
    }

    if (!totalPrice) {
      console.log('no items in the cart');
      return;
    }

    if (addressError) {
      console.log('invalid address');
      return;
    }

    // adds to firebase purchase history
    const purchaseHistoryItem = {
      orderedOn: new Date().toLocaleString(),
      order: modifiedCart,
    };
    try {
      if (auth.user) {
        const purchaseHistoryCollection = collection(
          db,
          'users',
          auth.user.id,
          'purchaseHistory'
        );
        await addDoc(purchaseHistoryCollection, purchaseHistoryItem);
        // adds to redux and opens modal
        dispatch(authActions.addToPurchaseHistory(purchaseHistoryItem));
        dispatch(modalActions.open('checkout'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // volumes
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

  useEffect(() => {
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
  }, [auth.user]);

  return (
    <section className={classes['cart-section']}>
      {auth.user && (
        <h1
          className={classes['page-title']}
        >{`${auth.user.displayName}'s cart`}</h1>
      )}
      <div className={classes['content-grid']}>
        <List>
          {modifiedCart.map((c) => (
            <CartItem
              cartItem={c}
              key={c.id}
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
          ))}
        </List>
        <Checkout
          totalPrice={totalPrice}
          cartItemCount={cartItemCount}
          checkoutHandler={checkoutHandler}
        />
      </div>
    </section>
  );
};
export default Cart;
