import { useEffect } from 'react';
import classes from './Cart.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  RootState,
  volumesActions,
} from '../../../redux/reduxStore';
// firebase
import { getDoc, getDocs } from 'firebase/firestore';
import {
  getMangaStoreRef,
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

  useEffect(() => {
    dispatch(loadingActions.setPageLoading(true));
    const tempVolumes: IVolume[] = [];
    getDocs(getMangaStoreRef('naruto'))
      .then((storeSnap) => {
        storeSnap.forEach((volumeSnap) => {
          const volume = volumeSnap.data() as IVolume;
          tempVolumes.push(volume);
        });
        dispatch(volumesActions.initialize(tempVolumes));
        dispatch(loadingActions.setPageLoading(false));
      })
      .catch((error) => {
        // error handling
        console.log(error);
        dispatch(loadingActions.setPageLoading(false));
      });
  }, []);

  useEffect(() => {
    // initializes the shipping address
    if (auth.user) {
      dispatch(loadingActions.setPageLoading(true));
      getDoc(getShippingAddressRef(auth.user.id))
        .then((shippingAddressSnap) => {
          if (shippingAddressSnap.exists()) {
            const shippingAddress =
              shippingAddressSnap.data() as IShippingAddress;
            dispatch(authActions.setShippingAddress(shippingAddress));
            dispatch(loadingActions.setPageLoading(false));
          }
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(loadingActions.setPageLoading(false));
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
    <section className="page-section">
      <h1 className="page-title">Cart</h1>
      <div className={classes['content-grid']}>
        <List>
          {cartItemCount !== 0 &&
            modifiedCart.map((c) => <CartItem cartItem={c} key={c.id} />)}
          {cartItemCount === 0 && (
            <section className="loading-error-section">
              <h2 className="general warning">your cart is empty</h2>
            </section>
          )}
        </List>
        <Checkout
          totalPrice={totalPrice}
          cartItemCount={cartItemCount}
          addressError={addressError}
          modifiedCart={modifiedCart}
        />
      </div>
    </section>
  );
};
export default Cart;
