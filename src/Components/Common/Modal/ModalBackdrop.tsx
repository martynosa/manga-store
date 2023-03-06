import { PropsWithChildren } from 'react';
import classes from './ModalBackdrop.module.css';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { modalActions, RootState } from '../../../redux/reduxStore';
// components
import SignInModal from '../AuthModal/SignInModal';
import SignUpModal from '../AuthModal/SignUpModal';
import OrderModal from '../OrderModal/OrderModal';

const ModalBackdrop: React.FC<PropsWithChildren> = () => {
  const modal = useSelector((state: RootState) => state.modal);

  const dispatch = useDispatch();
  const closeModal = () => dispatch(modalActions.close());

  return (
    <div className={classes['modal-backdrop']}>
      {modal.content === 'signin' && <SignInModal closeModal={closeModal} />}
      {modal.content === 'signup' && <SignUpModal closeModal={closeModal} />}
      {modal.content === 'order' && <OrderModal closeModal={closeModal} />}
    </div>
  );
};

export default ModalBackdrop;
