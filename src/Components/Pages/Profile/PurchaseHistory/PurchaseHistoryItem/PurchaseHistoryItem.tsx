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
      <div className={classes['order-mangas']}>
        {purchaseHistoryItem.order.map((manga) => {
          if (manga.volume) {
            return (
              <p>
                <span>{manga.quantity}</span> x {manga.volume.engVolumeName}
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
