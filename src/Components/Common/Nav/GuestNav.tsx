import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css';
// redux
import { useDispatch } from 'react-redux';
import { IModalPayload } from '../../../redux/modalSlice';
import { modalActions } from '../../../redux/reduxStore';

const GuestNav: React.FC = () => {
  const dispatch = useDispatch();

  const openModal = (form: IModalPayload) => dispatch(modalActions.open(form));

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
    </nav>
  );
};

export default GuestNav;
