import classes from './PurchaseHistoryItem.module.css';
// helpers
import { totalPriceReducer } from '../../../../../helpers/cartReducers';
// typescript
import { IPurchaseHistoryItem } from '../../../../../typescript/interfaces';

const PurchaseHistoryItem: React.FC<{
  purchaseHistoryItem: IPurchaseHistoryItem;
}> = ({ purchaseHistoryItem }) => {
  return (
    <div className={classes.order}>
      <div className={classes['order-volumes']}>
        {purchaseHistoryItem.order.map((volume) => {
          if (volume.volume) {
            return (
              <p key={volume.id}>
                <span>{volume.quantity}</span> x {volume.volume.engVolumeName}
              </p>
            );
          }
        })}
      </div>
      <p>
        <span>Ordered on: </span> {purchaseHistoryItem.orderedOn}
      </p>
      <p>
        <span>Price: </span>${totalPriceReducer(purchaseHistoryItem.order)}
      </p>
    </div>
  );
};

export default PurchaseHistoryItem;
