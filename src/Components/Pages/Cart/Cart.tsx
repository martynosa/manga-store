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
  deleteDoc,
  addDoc,
  getDoc,
  getDocs,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  getCartItemRef,
  getMangaStoreRef,
  getPurchaseHistoryRef,
  getShippingAddressRef,
} from '../../../firebase/firestoreReferences';
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
      const cartItemRef = getCartItemRef(auth.user.id, volume.id);
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
      const cartItemRef = getCartItemRef(auth.user.id, volume.id);
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
        await addDoc(getPurchaseHistoryRef(auth.user.id), purchaseHistoryItem);
        // adds to redux and opens modal
        dispatch(authActions.addToPurchaseHistory(purchaseHistoryItem));
        dispatch(modalActions.open('checkout'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const tempVolumes: IVolume[] = [];
    getDocs(getMangaStoreRef('naruto'))
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data() as IVolume;
          tempVolumes.push(volume);
        });
        dispatch(volumesActions.initialize(tempVolumes));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // initializes the shipping address
    if (auth.user) {
      getDoc(getShippingAddressRef(auth.user.id))
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
      <h1 className={classes['page-title']}>Cart</h1>
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
