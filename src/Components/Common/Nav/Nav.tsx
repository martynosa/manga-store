import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';
// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';
// components
import GuestNav from './GuestNav';
import UserNav from './UserNav';

const Nav = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.loading);
  return loading.isAuthStateChanging ? null : (
    <nav className={classes.nav}>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-logo active-link' : 'nav-logo'
          }
        >
          <img src="/brand.svg" alt="logo" />
          naruto
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/store"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          store
        </NavLink>
      </div>
      {user && <UserNav />}
      {!user && <GuestNav />}
    </nav>
  );
};

export default Nav;
