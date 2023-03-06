import classes from './OrderModal.module.css';

const OrderModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className={classes['order-modal']}>
      <p>Order shipped... jk, it's just a demo</p>
      <button type="button" onClick={closeModal} className="close">
        close
      </button>
    </div>
  );
};
export default OrderModal;
