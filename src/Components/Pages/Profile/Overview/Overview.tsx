import { useEffect } from 'react';
import classes from './Overview.module.css';
// firebase
import { db } from '../../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
// helpers
import { totalMoneySpentReducer } from '../../../../helpers/cartReducers';

const Overview: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const totalMoneySpent = totalMoneySpentReducer(auth.purchaseHistory);

  return (
    <>
      {auth.user && (
        <div className={classes['overview-content']}>
          <div className={classes['user-info']}>
            <div>
              <p>Display name:</p>
              <p>{auth.user.displayName}</p>
            </div>
            <div>
              <p>Email:</p>
              <p>{auth.user.email}</p>
            </div>
            <div>
              <p>Orders:</p>
              <p>{auth.purchaseHistory.length}</p>
            </div>
            <div>
              <p>Money spent:</p>
              <p>${totalMoneySpent.toFixed(2)}</p>
            </div>
          </div>
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
        </div>
      )}
    </>
  );
};
export default Overview;
