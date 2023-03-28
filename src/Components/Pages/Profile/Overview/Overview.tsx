import classes from './Overview.module.css';
// firebase
import { deleteUser } from 'firebase/auth';
import { firebaseAuth } from '../../../../firebase/firebase';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  authActions,
  loadingActions,
  RootState,
} from '../../../../redux/reduxStore';
// helpers
import { totalMoneySpentReducer } from '../../../../helpers/cartReducers';
import { useNavigate } from 'react-router-dom';

const Overview: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector((state: RootState) => state.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalMoneySpent = totalMoneySpentReducer(auth.purchaseHistory);

  const onDeleteUserHandler = async () => {
    dispatch(loadingActions.setAuthLoading(true));
    // will need to reauthenticate here, if the user logged in too long ago it will throw an error into the catch block
    try {
      const user = firebaseAuth.currentUser;
      if (user) {
        await deleteUser(user);
        dispatch(authActions.unsetUser());
        dispatch(loadingActions.setAuthLoading(false));
        navigate('/');
      }
    } catch (error) {
      // error handling here
      console.log(error);
      dispatch(loadingActions.setAuthLoading(false));
    }
  };

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
          {loading.isAuthLoading ? (
            <button className="disabled" disabled={loading.isAuthLoading}>
              Loading...
            </button>
          ) : (
            <button className="delete" onClick={onDeleteUserHandler}>
              delete account
            </button>
          )}
        </div>
      )}
    </>
  );
};
export default Overview;
