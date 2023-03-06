import { PropsWithChildren } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// redux
import { modalActions, RootState } from '../../../redux/reduxStore';
// components
import SignInModal from '../AuthModal/SignInModal';
import SignUpModal from '../AuthModal/SignUpModal';
import OrderModal from '../OrderModal/OrderModal';

import classes from './Modal.module.css';
const Modal: React.FC<PropsWithChildren> = () => {
  const modal = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const closeModal = () => dispatch(modalActions.close());

  return (
    <div className={classes.modal}>
      {modal.content === 'signin' && <SignInModal closeModal={closeModal} />}
      {modal.content === 'signup' && <SignUpModal closeModal={closeModal} />}
      {modal.content === 'order' && <OrderModal closeModal={closeModal} />}
    </div>
  );
};

export default Modal;
