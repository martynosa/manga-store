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
    <>
      {user && <UserNav />}
      {!user && <GuestNav />}
    </>
  );
};
export default Nav;
