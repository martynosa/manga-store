import { useEffect } from 'react';
import classes from './Cart.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  cartActions,
  loadingActions,
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
  const loading = useSelector((state: RootState) => state.loading);

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
      dispatch(
        loadingActions.setLoading({ ...loading, isAddToCartLoading: true })
      );

      try {
        const cartItemRef = getCartItemRef(auth.user.id, volume.id);
        // increments item's quantity
        const cartItemSnap = await getDoc(cartItemRef);
        if (cartItemSnap.exists()) {
          await updateDoc(cartItemRef, {
            quantity: increment(1),
          });
          dispatch(cartActions.add({ id: volume.id, quantity: 1 }));
          dispatch(
            loadingActions.setLoading({ ...loading, isAddToCartLoading: false })
          );
          return;
        }
        // adds the item to the cart
        await setDoc(cartItemRef, { quantity: 1 });
        dispatch(
          loadingActions.setLoading({ ...loading, isAddToCartLoading: false })
        );
        return;
      } catch (error) {
        // error handling
        console.log(error);
        dispatch(
          loadingActions.setLoading({ ...loading, isAddToCartLoading: false })
        );
      }
    }
    dispatch(modalActions.open('signin'));
  };

  const removeFromCartHandler = async (volume: IVolume) => {
    if (auth.user) {
      dispatch(
        loadingActions.setLoading({ ...loading, isRemoveFromCartLoading: true })
      );

      try {
        const cartItemRef = getCartItemRef(auth.user.id, volume.id);
        // deletes the item if quantity's lower than 1
        const cartItemSnap = await getDoc(cartItemRef);
        if (cartItemSnap.exists()) {
          const cartItemQuantity = cartItemSnap.data().quantity;
          if (cartItemQuantity <= 1) {
            await deleteDoc(cartItemRef);
            dispatch(cartActions.remove({ id: volume.id, quantity: 1 }));
            dispatch(
              loadingActions.setLoading({
                ...loading,
                isRemoveFromCartLoading: false,
              })
            );
            return;
          }
        }
        // decerements item's quantity
        await updateDoc(cartItemRef, {
          quantity: increment(-1),
        });
        dispatch(
          loadingActions.setLoading({
            ...loading,
            isRemoveFromCartLoading: false,
          })
        );
        dispatch(cartActions.remove({ id: volume.id, quantity: 1 }));
      } catch (error) {
        // error handling
        console.log(error);
        dispatch(
          loadingActions.setLoading({
            ...loading,
            isRemoveFromCartLoading: false,
          })
        );
      }
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
        dispatch(
          loadingActions.setLoading({ ...loading, isCheckoutLoading: true })
        );

        await addDoc(getPurchaseHistoryRef(auth.user.id), purchaseHistoryItem);
        // adds to redux and opens modal
        dispatch(authActions.addToPurchaseHistory(purchaseHistoryItem));
        dispatch(
          loadingActions.setLoading({ ...loading, isCheckoutLoading: false })
        );
        dispatch(modalActions.open('checkout'));
      }
    } catch (error) {
      // error handling
      console.log(error);
      dispatch(
        loadingActions.setLoading({ ...loading, isCheckoutLoading: false })
      );
    }
  };

  useEffect(() => {
    dispatch(loadingActions.setLoading({ ...loading, isPageLoading: true }));
    const tempVolumes: IVolume[] = [];
    getDocs(getMangaStoreRef('naruto'))
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data() as IVolume;
          tempVolumes.push(volume);
        });
        dispatch(volumesActions.initialize(tempVolumes));
        dispatch(
          loadingActions.setLoading({ ...loading, isPageLoading: false })
        );
      })
      .catch((error) => {
        // error handling
        console.log(error);
        dispatch(
          loadingActions.setLoading({ ...loading, isPageLoading: false })
        );
      });
  }, []);

  useEffect(() => {
    // initializes the shipping address
    if (auth.user) {
      dispatch(loadingActions.setLoading({ ...loading, isPageLoading: true }));

      getDoc(getShippingAddressRef(auth.user.id))
        .then((shippingAddressSnap) => {
          if (shippingAddressSnap.exists()) {
            const shippingAddress =
              shippingAddressSnap.data() as IShippingAddress;
            dispatch(authActions.setShippingAddress(shippingAddress));
            dispatch(
              loadingActions.setLoading({ ...loading, isPageLoading: false })
            );
          }
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(
            loadingActions.setLoading({ ...loading, isPageLoading: false })
          );
        });
    }
  }, [auth.user]);

  if (loading.isPageLoading) {
    return (
      <section className="loading-error-section">
        <h2 className="general loading">Loading...</h2>
      </section>
    );
  }

  return (
    <section className={classes['cart-section']}>
      <h1 className="page-title">Cart</h1>
      <div className={classes['content-grid']}>
        <List>
          {modifiedCart.map((c) => (
            <CartItem
              cartItem={c}
              key={c.id}
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
              isAddToCartLoading={loading.isAddToCartLoading}
              isRemoveFromCartLoading={loading.isRemoveFromCartLoading}
            />
          ))}
        </List>
        <Checkout
          totalPrice={totalPrice}
          cartItemCount={cartItemCount}
          checkoutHandler={checkoutHandler}
          isCheckoutLoading={loading.isCheckoutLoading}
          addressError={addressError}
        />
      </div>
    </section>
  );
};
export default Cart;
