import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import classes from './Profile.module.css';
// redux
import { RootState } from '../../../redux/reduxStore';

const Profile: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <section className={classes['profile-section']}>
      {auth.user && (
        <h1
          className={classes['page-title']}
        >{`${auth.user.displayName}'s profile`}</h1>
      )}
      <nav className={classes['profile-nav']}>
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
