import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { cartActions, RootState, authActions } from '../../../redux/reduxStore';
// firebase
import { firebaseAuth } from '../../../firebase/firebase';
import {
  browserLocalPersistence,
  setPersistence,
  signOut,
} from 'firebase/auth';
import { getCartRef } from '../../../firebase/firestoreReferences';
import { getDocs } from 'firebase/firestore';
// typescript
import { ICartItem } from '../../../typescript/interfaces';
// helpers
import { cartItemCountReducer } from '../../../helpers/cartReducers';

const UserNav: React.FC = () => {
  const [isCartLinkLoading, setIsCartLinkLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const totalCartItemCount = cartItemCountReducer(cart);

  const signOutHandler = async () => {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);
      await signOut(firebaseAuth);
      dispatch(authActions.unsetUser());
    } catch (error) {
      // error handling
      console.log(error);
    }
  };

  useEffect(() => {
    // initializes the cart
    const tempCartItems: ICartItem[] = [];
    if (user) {
      setIsCartLinkLoading(true);
      getDocs(getCartRef(user.id))
        .then((cartSnap) => {
          cartSnap.forEach((cartItemSnap) => {
            const cartItem = { id: cartItemSnap.id, ...cartItemSnap.data() };
            tempCartItems.push(cartItem as ICartItem);
          });
          dispatch(cartActions.initialize(tempCartItems));
          setIsCartLinkLoading(true);
        })
        .catch((error) => {
          // error handling
          console.log(error);
          setIsCartLinkLoading(false);
        });
    }
  }, [user]);

  const cartLink = isCartLinkLoading ? (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        isActive ? 'nav-cart active-link' : 'disabled'
      }
    >
      Loading...
    </NavLink>
  ) : (
    <NavLink
      to="/cart"
      className={({ isActive }) =>
        isActive ? 'nav-cart active-link' : 'nav-cart'
      }
    >
      <span>{totalCartItemCount}</span>
      🛒
    </NavLink>
  );

  return (
    <div>
      <p className={classes.displayname}></p>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? 'nav-displayname active-link' : 'nav-displayname'
        }
      >
        {user?.displayName}
      </NavLink>
      {cartLink}
      {user?.email !== null && (
        <button onClick={signOutHandler} className="nav-sign-out">
          ❌ <span>sign out</span>
        </button>
      )}
    </div>
  );
};

export default UserNav;
