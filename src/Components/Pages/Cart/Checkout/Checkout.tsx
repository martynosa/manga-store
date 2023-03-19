import { Link } from 'react-router-dom';
import classes from './Checkout.module.css';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';

interface IProps {
  cartItemCount: number;
  totalPrice: number;
  checkoutHandler: () => void;
  isCheckoutLoading: boolean;
  addressError: boolean;
}

const Checkout: React.FC<IProps> = ({
  cartItemCount,
  totalPrice,
  checkoutHandler,
  isCheckoutLoading,
  addressError,
}) => {
  const auth = useSelector((state: RootState) => state.auth);

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
