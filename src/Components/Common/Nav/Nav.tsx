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

const Nav: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const signOutHandler = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signOut(auth);
      dispatch(authAction.unsetUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={classes.nav}>
      <Link to="/signin">signin</Link>
      <Link to="/signup">signup</Link>
      <Link to="/store">store</Link>
      <Link to="/cart">cart</Link>
      <p>{user?.displayName}</p>
      {(user && user?.email) !== null && (
        <button onClick={signOutHandler}>signout</button>
      )}
    </nav>
  );
};
export default Nav;
