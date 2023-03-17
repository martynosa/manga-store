import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import classes from './Profile.module.css';
// redux
import { authActions, RootState } from '../../../redux/reduxStore';
import { useEffect } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import {
  IPurchaseHistoryItem,
  IShippingAddress,
} from '../../../typescript/interfaces';
import { db } from '../../../firebase/firebase';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // initializes the shipping address
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

  useEffect(() => {
    // initializes the purchase history
    const purchaseHistory: IPurchaseHistoryItem[] = [];
    if (auth.user) {
      const cartRef = collection(db, 'users', auth.user.id, 'purchaseHistory');
      const q = query(cartRef, orderBy('orderedOn'));
      getDocs(q)
        .then((purchaseHistorySnap) => {
          purchaseHistorySnap.forEach((purchaseHistoryItemSnap) => {
            const purchaseHistoryItem = purchaseHistoryItemSnap.data();
            purchaseHistory.push(purchaseHistoryItem as IPurchaseHistoryItem);
          });
          dispatch(authActions.setPurchaseHistory(purchaseHistory));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth.user]);

  return (
    <section className={classes['profile-section']}>
      {auth.user && (
        <h1
          className={classes['page-title']}
        >{`${auth.user.displayName}'s profile`}</h1>
      )}
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
