import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classes from './Profile.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  RootState,
} from '../../../redux/reduxStore';
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
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    // initializes the shipping address
    if (auth.user) {
      dispatch(
        loadingActions.setLoading({ ...loading, isProfileLoading: true })
      );

      getDoc(getShippingAddressRef(auth.user.id))
        .then((shippingAddressSnap) => {
          if (shippingAddressSnap.exists()) {
            const shippingAddress =
              shippingAddressSnap.data() as IShippingAddress;
            dispatch(authActions.setShippingAddress(shippingAddress));
          }
          dispatch(
            loadingActions.setLoading({ ...loading, isProfileLoading: false })
          );
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(
            loadingActions.setLoading({ ...loading, isProfileLoading: false })
          );
        });
    }
  }, [auth.user]);

  useEffect(() => {
    // initializes the purchase history
    const tempPurchaseHistory: IPurchaseHistoryItem[] = [];

    if (auth.user) {
      dispatch(
        loadingActions.setLoading({ ...loading, isProfileLoading: true })
      );

      const purchaseHistoryQ = query(
        getPurchaseHistoryRef(auth.user.id),
        orderBy('orderedOn', 'desc')
      );

      getDocs(purchaseHistoryQ)
        .then((purchaseHistorySnap) => {
          purchaseHistorySnap.forEach((purchaseHistoryItemSnap) => {
            const purchaseHistoryItem = {
              ...(purchaseHistoryItemSnap.data() as IPurchaseHistoryItem),
              id: purchaseHistoryItemSnap.id,
            };
            tempPurchaseHistory.push(purchaseHistoryItem);
          });
          dispatch(authActions.setPurchaseHistory(tempPurchaseHistory));
          dispatch(
            loadingActions.setLoading({ ...loading, isProfileLoading: false })
          );
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(
            loadingActions.setLoading({ ...loading, isProfileLoading: false })
          );
        });
    }
  }, [auth.user]);

  if (loading.isProfileLoading || loading.isAuthStateChanging) {
    return (
      <section className="loading-error-section">
        <h2 className="general loading">Loading...</h2>
      </section>
    );
  }

  return (
    <section className={classes['profile-section']}>
      <h1 className="page-title">Profile</h1>
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
