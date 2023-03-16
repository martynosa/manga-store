import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './PurchaseHistory.module.css';
// firebase
import { db } from '../../../../firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// redux
import { authActions, RootState } from '../../../../redux/reduxStore';
// typescript
import { IPurchaseHistoryItem } from '../../../../typescript/interfaces';
// components
import List from '../../../Common/List/List';
import PurchaseHistoryItem from './PurchaseHistoryItem/PurchaseHistoryItem';

const PurchaseHistory: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // initializes the purchase history
    const purchaseHistory: IPurchaseHistoryItem[] = [];
    if (auth.user) {
      const cartRef = collection(db, 'users', auth.user.id, 'purchaseHistory');
      const q = query(cartRef, orderBy('orderedOn'));
      getDocs(q)
        .then((purchaseHistorySnap) => {
          purchaseHistorySnap.forEach((purchaseHistoryItemSnap) => {
            const purchaseHistoryItem = purchaseHistoryItemSnap.data();
            purchaseHistory.push(purchaseHistoryItem as IPurchaseHistoryItem);
          });
          dispatch(authActions.setPurchaseHistory(purchaseHistory));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth.user]);

  return (
    <div className={classes['purchase-history-content']}>
      <List>
        {auth.purchaseHistory.map((order) => (
          <PurchaseHistoryItem purchaseHistoryItem={order} />
        ))}
      </List>
    </div>
  );
};
export default PurchaseHistory;
