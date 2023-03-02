import { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions, RootState } from '../../../redux/reduxStore';

import SignIn from '../../Auth/SignIn';
import SignUp from '../../Auth/SignUp';

import classes from './Modal.module.css';
const Modal: React.FC<PropsWithChildren> = () => {
  const modal = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const closeModal = () => dispatch(modalActions.close());

  return (
    <div className={classes.modal}>
      {modal.content === 'signin' && <SignIn closeModal={closeModal} />}
      {modal.content === 'signup' && <SignUp closeModal={closeModal} />}
    </div>
  );
};

export default Modal;
