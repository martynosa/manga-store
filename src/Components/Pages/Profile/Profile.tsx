import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classes from './Profile.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { authActions, RootState } from '../../../redux/reduxStore';
// firebase
import { getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import {
  getPurchaseHistoryRef,
  getShippingAddressRef,
} from '../../../firebase/firestoreReferences';
// typescript
import {
  IPurchaseHistoryItem,
  IShippingAddress,
} from '../../../typescript/interfaces';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    // initializes the purchase history
    const tempPurchaseHistory: IPurchaseHistoryItem[] = [];
    if (auth.user) {
      const purchaseHistoryQ = query(
        getPurchaseHistoryRef(auth.user.id),
        orderBy('orderedOn', 'desc')
      );

      getDocs(purchaseHistoryQ)
        .then((purchaseHistorySnap) => {
          purchaseHistorySnap.forEach((purchaseHistoryItemSnap) => {
            const purchaseHistoryItem =
              purchaseHistoryItemSnap.data() as IPurchaseHistoryItem;
            tempPurchaseHistory.push(purchaseHistoryItem);
          });
          dispatch(authActions.setPurchaseHistory(tempPurchaseHistory));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth.user]);

  return (
    <section className={classes['profile-section']}>
      <h1 className={classes['page-title']}>Profile</h1>
      <nav className={classes['profile-nav']}>
        <NavLink
          to="overview"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          overview
        </NavLink>

        <NavLink
          to="shippingAddress"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          shipping address
        </NavLink>

        <NavLink
          to="purchaseHistory"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          purchase history
        </NavLink>
      </nav>
      <Outlet />
    </section>
  );
};
export default Profile;
