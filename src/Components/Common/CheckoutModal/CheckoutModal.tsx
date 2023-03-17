import classes from './CheckoutModal.module.css';

const CheckoutModal: React.FC<{ closeModal: () => void }> = ({
  closeModal,
}) => {
  return (
    <div className={classes['checkout-modal']}>
      <p>Order shipped... jk, it's just a demo</p>
      <button type="button" onClick={closeModal} className="close">
        close
      </button>
    </div>
  );
};
export default CheckoutModal;
