import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';

import classes from './Nav.module.css';
import { authAction } from '../../../redux/authSlice';
import {
  browserLocalPersistence,
  setPersistence,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { useState } from 'react';
import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';

const Nav: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openSignInModal = () => {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  };

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  };

  const closeModal = () => {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  };

  const signOutHandler = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signOut(auth);
      dispatch(authAction.unsetUser());
    } catch (error) {
      console.log(error);
    }
  };

  const unauthenticatedNav = (
    <>
      <Link to="/">home</Link>
      <Link to="/store">store</Link>
      <div className={classes.group}>
        <button onClick={openSignInModal} className={classes['sign-in']}>
          sign in
        </button>
        <button onClick={openSignUpModal} className={classes['sign-up']}>
          sign up
        </button>
      </div>
    </>
  );

  const authenticatedNav = (
    <>
      <Link to="/store">store</Link>
      <div className={classes.group}>
        <p className={classes.displayname}>{user?.displayName}</p>
        <Link to="/cart" className={classes.cart}>
          cart
        </Link>
        {user?.email !== null && (
          <button onClick={signOutHandler} className={classes['sign-out']}>
            sign out
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      <nav className={classes.nav}>
        {user && authenticatedNav}
        {!user && unauthenticatedNav}
      </nav>
      {isSignInOpen && <SignIn closeModal={closeModal} />}
      {isSignUpOpen && <SignUp closeModal={closeModal} />}
    </>
  );
};
export default Nav;
