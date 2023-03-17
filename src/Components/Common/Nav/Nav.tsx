import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  cartActions,
  modalActions,
  RootState,
  authActions,
} from '../../../redux/reduxStore';
import { IModalPayload } from '../../../redux/modalSlice';
// firebase
import {
  browserLocalPersistence,
  setPersistence,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
// typescript
import { ICartItem } from '../../../typescript/interfaces';
// helpers
import { cartItemCountReducer } from '../../../helpers/cartReducers';

const Nav: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);
  const [totalCartItemCount, setTotalCartItemCount] = useState(0);
  const dispatch = useDispatch();

  const openModal = (form: IModalPayload) => dispatch(modalActions.open(form));

  const signOutHandler = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signOut(auth);
      dispatch(authActions.unsetUser());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const count = cartItemCountReducer(cart);
    setTotalCartItemCount(count);
  }, [cart]);

  useEffect(() => {
    // initializes the cart
    const cartItemArray: ICartItem[] = [];
    if (user) {
      const cartRef = collection(db, 'users', user.id, 'cart');
      getDocs(cartRef)
        .then((cartSnap) => {
          cartSnap.forEach((cartItemSnap) => {
            const cartItem = { id: cartItemSnap.id, ...cartItemSnap.data() };
            cartItemArray.push(cartItem as ICartItem);
          });
          dispatch(cartActions.initialize(cartItemArray));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const unauthenticatedNav = (
    <>
      <div>
        <NavLink
          to="/store"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          store
        </NavLink>
      </div>
      <div>
        <button onClick={() => openModal('signin')} className="nav-sign-in">
          sign in
        </button>
        <button onClick={() => openModal('signup')} className="nav-sign-up">
          sign up
        </button>
      </div>
    </>
  );

  const authenticatedNav = (
    <>
      <div>
        <NavLink
          to="/store"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          end
        >
          store
        </NavLink>
      </div>
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
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'nav-cart active-link' : 'nav-cart'
          }
        >
          <span>{totalCartItemCount} </span>
          cart
        </NavLink>
        {user?.email !== null && (
          <button onClick={signOutHandler} className="nav-sign-out">
            sign out
          </button>
        )}
      </div>
    </>
  );

  return (
    <nav className={classes.nav}>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-logo active-link' : 'nav-logo'
          }
        >
          naruto
        </NavLink>
      </div>
      {user && authenticatedNav}
      {!user && unauthenticatedNav}
    </nav>
  );
};
export default Nav;
