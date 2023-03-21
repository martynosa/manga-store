import { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Checkout.module.css';
// firebase
import { addDoc } from 'firebase/firestore';
import { getPurchaseHistoryRef } from '../../../../firebase/firestoreReferences';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  modalActions,
  RootState,
} from '../../../../redux/reduxStore';
// typescript
import { ICartItem } from '../../../../typescript/interfaces';

const Checkout: React.FC<{
  cartItemCount: number;
  totalPrice: number;
  addressError: boolean;
  modifiedCart: ICartItem[];
}> = ({ cartItemCount, totalPrice, addressError, modifiedCart }) => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

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
        setIsCheckoutLoading(true);

        await addDoc(getPurchaseHistoryRef(auth.user.id), purchaseHistoryItem);
        // adds to redux and opens modal
        dispatch(authActions.addToPurchaseHistory(purchaseHistoryItem));
        setIsCheckoutLoading(false);
        dispatch(modalActions.open('checkout'));
      }
    } catch (error) {
      // error handling
      console.log(error);
      setIsCheckoutLoading(false);
    }
  };

  const shippingInfo = (
    <div className={classes['shipping-info']}>
      <h3>Shipping info</h3>
      <p>
        <span>City:</span> {auth.shippingAddress.city}
      </p>
      <p>
        <span>Address:</span> {auth.shippingAddress.address}
      </p>
      <p>
        <span>Postal:</span> {auth.shippingAddress.postCode}
      </p>
      <p>
        <span>Phone number:</span> {auth.shippingAddress.phoneNumber}
      </p>
    </div>
  );

  const toShippingAddress = (
    <Link to="/profile/shippingAddress" className="to-shipping-address">
      add shipping address
    </Link>
  );

  return (
    <div className={classes.checkout}>
      <h2>Checkout</h2>
      <div className={classes.content}>
        {addressError ? toShippingAddress : shippingInfo}
        <p className={classes['item-count']}>
          Items: <span>{cartItemCount}</span>
        </p>
        <p className={classes['total-price']}>
          Total price: <span>${totalPrice.toFixed(2)}</span>
        </p>
        {isCheckoutLoading ? (
          <button className="disabled" disabled={isCheckoutLoading}>
            Loading...
          </button>
        ) : (
          <button
            className={!totalPrice || addressError ? 'disabled' : 'checkout'}
            onClick={checkoutHandler}
            disabled={!totalPrice || addressError}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};
export default Checkout;
