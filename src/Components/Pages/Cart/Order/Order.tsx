import classes from './Order.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { IModalPayload } from '../../../../redux/modalSlice';
import { modalActions, RootState } from '../../../../redux/reduxStore';

interface IProps {
  cartItemCount: number;
  totalPrice: number;
}

const Order: React.FC<IProps> = ({ cartItemCount, totalPrice }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const openModal = (form: IModalPayload) => {
    if (!user) {
      dispatch(modalActions.open('signin'));
      return;
    }

    if (!totalPrice) {
      console.log('no items in the cart');
      return;
    }

    dispatch(modalActions.open(form));
  };

  return (
    <div className={classes.order}>
      <h2>Order</h2>
      <div className={classes.content}>
        <div className={classes.address}>
          <h3>Shipping info</h3>
          <p>
            <span>City:</span> Varna
          </p>
          <p>
            <span>Postal:</span> 9000
          </p>
          <p>
            <span>Address:</span> Ivaylo 7
          </p>
          <p>
            <span>Phone number:</span> 0877066008
          </p>
        </div>
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
