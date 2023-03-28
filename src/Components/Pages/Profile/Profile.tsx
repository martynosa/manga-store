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
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector((state: RootState) => state.loading);

  const dispatch = useDispatch();

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
          }
          dispatch(loadingActions.setPageLoading(false));
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(loadingActions.setPageLoading(false));
        });
    }
  }, [auth.user]);

  useEffect(() => {
    // initializes the purchase history
    const tempPurchaseHistory: IPurchaseHistoryItem[] = [];

    if (auth.user) {
      dispatch(loadingActions.setPageLoading(true));
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
          dispatch(loadingActions.setPageLoading(false));
        })
        .catch((error) => {
          // error handling
          console.log(error);
          dispatch(loadingActions.setPageLoading(false));
        });
    }
  }, [auth.user]);

  if (loading.isPageLoading) {
    // might need to add  || loading.isAuthStateChanging -> no indication for loading when page is refreshing
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
