// redux
import { useDispatch } from 'react-redux';
import { IModalPayload } from '../../../redux/modalSlice';
import { modalActions } from '../../../redux/reduxStore';

const GuestNav: React.FC = () => {
  const dispatch = useDispatch();

  const openModal = (form: IModalPayload) => dispatch(modalActions.open(form));

  return (
    <div>
      <button onClick={() => openModal('signin')} className="nav-sign-in">
        sign in
      </button>
      <button onClick={() => openModal('signup')} className="nav-sign-up">
        sign up
      </button>
    </div>
  );
};

export default GuestNav;
