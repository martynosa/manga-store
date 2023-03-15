import classes from './Order.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { IModalPayload } from '../../../../redux/modalSlice';
import { modalActions, RootState } from '../../../../redux/reduxStore';
import { Link } from 'react-router-dom';

interface IProps {
  cartItemCount: number;
  totalPrice: number;
}

const Order: React.FC<IProps> = ({ cartItemCount, totalPrice }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const addressError =
    auth.shippingAddress.city === '' ||
    auth.shippingAddress.address === '' ||
    auth.shippingAddress.postCode === '' ||
    auth.shippingAddress.phoneNumber === '';

  const openModal = (form: IModalPayload) => {
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

    dispatch(modalActions.open(form));
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
    <div className={classes.order}>
      <h2>Order</h2>
      <div className={classes.content}>
        {addressError ? toShippingAddress : shippingInfo}
        <p className={classes['item-count']}>
          Items: <span>{cartItemCount}</span>
        </p>
        <p className={classes['total-price']}>
          Total price: <span>$US {totalPrice.toFixed(2)}</span>
        </p>
        <button
          className={totalPrice ? 'order' : 'disabled'}
          onClick={() => openModal('order')}
          disabled={!totalPrice}
        >
          Order
        </button>
      </div>
    </div>
  );
};
export default Order;
