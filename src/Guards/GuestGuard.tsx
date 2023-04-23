import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState, modalActions } from '../redux/reduxStore';

const GuestGuard = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch();

  if (user === null) {
    dispatch(modalActions.open('signin'));
    return <Navigate to={'/'} />;
  }

  return <Outlet />;
};

export default GuestGuard;
