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
      <button onClick={openSignInModal}>signInModal</button>
      <button onClick={openSignUpModal}>signUpModal</button>
    </>
  );

  const authenticatedNav = (
    <>
      <Link to="/store">store</Link>
      <Link to="/cart">cart</Link>
      <p>{user?.displayName}</p>
      {user?.email !== null && (
        <button onClick={signOutHandler}>signout</button>
      )}
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
